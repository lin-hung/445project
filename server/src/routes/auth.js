import Express from 'express'
import Passport from 'passport'
import JWT from "jsonwebtoken"
import socketioConfig, { addSocketIdToSession, io } from '../config/socketioConfig'
import User from "../models/User"
import UserProfile from "../models/UserProfile"
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
                const providerProfile = msg.profile
                User.createUser(providerProfile,'google').save()
                .then((user) => {
                    createUserProfile(user,req.session.registerType).then((profile) => {
                        console.log(`new user created: user ${JSON.stringify(user)}, profile ${JSON.stringify(profile)}`)
                        sendTokenToUser(req, res, user)
                        return res.end(closePopupScript)
                    })
                })
            }
        }
        if (user) {
            console.log('sendtoken')
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
                const providerProfile = msg.profile
                User.createUser(providerProfile,"linkedin").save()
                .then((user) => {
                    createUserProfile(user,req.session.registerType).then((profile) => {
                        console.log(`new user created: user ${JSON.stringify(user)}, profile ${JSON.stringify(profile)}`)
                        sendTokenToUser(req, res, user)
                        return res.end(closePopupScript)
                    })

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

const createUserProfile = (user,registerType) => {
    return new UserProfile({
        user: user._id,
        profileType: registerType,
        testContents: `test content user: ${user}`
    }).save()
}
function addRegisterTypeToSession(req, res, next) {
    const regType = req.query.registerType
    if (regType == 'recruiter' || regType == 'candidate') {
        req.session.registerType = regType
    }
    else if (regType) {
        req.session.registerType=null
        throw Error("Not a valid register type.")
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
    user.getUserProfile().then((profile)=>{
        io.in(req.session.socketId).emit('isRegistered', {user:user,profile:profile})
    })
}

module.exports = Router