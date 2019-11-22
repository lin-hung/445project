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
    Passport.authenticate("google", { scope: ["profile", "email"] }, (err, user, msg) => {
        loginOrRegister(err, user, msg, req, res, next, "google")
        next()
    })(req, res, next)
})

Router.get('/linkedincb', (req, res, next) => {
    Passport.authenticate("linkedin", { state: process.env.linkedinState }, (err, user, msg) => {
        loginOrRegister(err, user, msg, req, res, next, "linkedin")
        next()
    })(req, res, next)
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

const sendProfileToUser = (req, res, profile) => {
    // console.log('send profile', profile)
    io.in(req.session.socketId).emit('profile', profile)
}

const loginOrRegister = (err, user, msg, req, res, next, provider) => {
    { //if the user isn't registered, msg contains the provider profile info
        if (req.session.registerType) {
            console.log(`user: ${user} regtype: ${req.session.registerType}`)
            if (user) {
                userAlreadyRegistered(req, res, user)
                return res.end(closePopupScript)
            }
            else {//create user
                const providerProfile = msg.profile
                User.createUser(providerProfile, provider).save()
                    .then((user) => {
                        return createUserProfile(user, req.session.registerType).then((profile) => [user, profile])
                    }).then(([user, profile]) => {
                        // console.log(`user created: 
                        // ${user}
                        // ${profile}`)
                        sendTokenToUser(req, res, user)
                        sendProfileToUser(req, res, profile)
                        return res.end(closePopupScript)
                    }).catch((err) => {
                        console.log(err)
                        res.status(400)
                        res.send(err)
                    })
            }
        }
        else if (user) {
            sendTokenToUser(req, res, user)
            UserProfile.findOne({ user: user._id }).then((prof) => {
                sendProfileToUser(req, res, prof)
            })
            return res.end(closePopupScript)
        }
        io.in(req.session.socketId).emit('authfailure', "user is not registered")
        return res.end(closePopupScript)
    }
}

const createUserProfile = (user, registerType) => {
    return new UserProfile({
        user: user._id,
        profileType: registerType
    }).save()
}
function addRegisterTypeToSession(req, res, next) {
    const regType = req.query.registerType
    if (!regType) {
        req.session.registerType = null
        return next()
    }
    else if (regType == 'recruiter' || regType == 'candidate') {
        req.session.registerType = regType
        return next()
    } else {
        req.session.registerType = null
        throw Error(`${regType} is not a valid register type.`)
    }
}

const userAlreadyRegistered = (req, res, user) => {
    user.getUserProfile().then((profile) => {
        io.in(req.session.socketId).emit('isRegistered', { user: user, profile: profile })
    })
}

module.exports = Router