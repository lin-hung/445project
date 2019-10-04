import Express from 'express'
import Passport from 'passport'
import JWT from "jsonwebtoken"
import socketioConfig, { addSocketIdToSession, io } from '../config/socketioConfig'
import User from "../models/User"
import Candidate from '../models/Candidate'
import Recruiter from '../models/Recruiter'
const Router = Express.Router()

const closePopupScript = `<script>window.close()</script>`

Router.get('/google',
    addSocketIdToSession,
    addRegisterTypeToSession,
    Passport.authenticate('google', { scope: ["profile", "email"] })
)

Router.get("/linkedin",
    addSocketIdToSession,
    addRegisterTypeToSession,
    Passport.authenticate('linkedin', { state: process.env.linkedinState })
)

Router.get('/googlecb', (req, res, next) => {//sorry this is super ugly
    Passport.authenticate("google", { scope: ["profile", "email"] }, (err, user, msg) => { //if the user isn't registered, msg contains the provider profile info
        if (req.session.registerType) {
            if (user) {
                userAlreadyRegistered(req, res, user)
                return res.end(closePopupScript)
            }
            else {//create user
                const profile = msg.profile
                const u = new User({
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    email: profile.emails[0].value,
                    googleID: profile.id,
                    userType: req.session.registerType
                }).save().then((user) => {
                    createUserTypeProfile(user)
                    console.log(`new user created: googleID ${user.googleID} name ${user.fullName} userType ${user.userType}`)
                    sendTokenToUser(req, res, user)
                    return res.end(closePopupScript)
                })
            }
        }
        if (user) {
            sendTokenToUser(req, res, user)
            return res.end(closePopupScript)
        }
        io.in(req.session.socketId).emit('authfailure', true)
        return res.end(closePopupScript)
    })(req, res, next),
        removeRegisterTypeFromSession
})

Router.get('/linkedincb', (req, res, next) => {
    Passport.authenticate("linkedin", { state: process.env.linkedinState }, (err, user, msg) => {
        if (req.session.registerType) {
            if (user) {
                userAlreadyRegistered(req, res, user)
                return res.end(closePopupScript)
            }
            else {
                const profile = msg.profile
                new User({
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    email: profile.emails[0].value,
                    linkedinID: profile.id,
                    userType: req.session.registerType
                }).save().then((user) => {
                    createUserTypeProfile(user)
                    console.log(`new user created: linkedinID ${user.linkedinID} name ${user.fullName} userType ${user.userType}`)
                    sendTokenToUser(req, res, user)
                    return res.end(closePopupScript)
                })
            }
        }
        if (user) {
            sendTokenToUser(req, res, user)
            return res.end(closePopupScript)
        }
        io.in(req.session.socketId).emit('authfailure', true)
        return res.end(closePopupScript)
    })(req, res, next),
        removeRegisterTypeFromSession
})

Router.get("/testAuthed", Passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.json({ success: true })
    }
)

const sendTokenToUser = (req, res, user) => {
    const payload = {
        user: user
    }
    const token = JWT.sign(payload, process.env.secret)
    io.in(req.session.socketId).emit('authtoken', `Bearer ${token}`)
}

const createUserTypeProfile = (user) => {
    if (user.isCandidate) {
        new Candidate({
            user: user._id,
            testContents: "candidatecontents"
        }).save().then((candidate) => {
            user.candidateProfile = candidate._id
            user.save()
        })
    }
    if (user.isRecruiter) {
        new Recruiter({
            user: user._id,
            testContents: "recruitercontents"
        }).save().then((recruiter) => {
            user.recruiterProfile = recruiter._id
            user.save()
        })
    }
}
function addRegisterTypeToSession(req, res, next) {
    const regType = req.query.registerType
    try {
        if (regType == 'recruiter' || regType == 'candidate') {
            req.session.registerType = regType
        }
        else if (regType) {
            throw "Not a valid user type."
        }
    }
    catch (e) {
        console.log(`error: ${e} user type: ${req.query.registerType}`)
        req.session.registerType = null
        res.sendStatus(400)
    }
    next()
}
function removeRegisterTypeFromSession(req, res, next) {
    console.log('remove register type')
    if (req.query.registerType) {
        req.session.registerType = null
    }
    next()
}
const userAlreadyRegistered = (req, res, user) => {
    if (user.isCandidate) {
        Candidate.populate(user, { path: 'candidateProfile' }, (err) => {
            io.in(req.session.socketId).emit('isRegistered', { type: 'candidate', candidate: user.candidateProfile })
        })
    }
    else if (user.isRecruiter) {
        Recruiter.populate(user, { path: 'recruiterProfile' }, (err) => {
            io.in(req.session.socketId).emit('isRegistered', { type: 'recruiter', recruiter: user.recruiterProfile })
        })
    }
    else {
        io.in(req.session.socketId).emit('authfailure', "Account exists, but has an invalid user type.")
    }
}

module.exports = Router