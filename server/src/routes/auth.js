import Express from 'express'
import Passport from 'passport'
import JWT from "jsonwebtoken"
import socketioConfig, { addSocketIdToSession, io } from '../config/socketioConfig'
import User from "../models/User"
const Router = Express.Router()

Router.get('/google',
    addSocketIdToSession,
    addRegisterTypeToSession,
    Passport.authenticate('google', { scope: ["profile", "email"] })
)

Router.get("/linkedin",
    addSocketIdToSession,
    Passport.authenticate('linkedin', { state: process.env.linkedinState })
)

Router.get('/googlecb', (req, res, next) => {
    Passport.authenticate("google", { scope: ["profile", "email"] }, (err, user, msg) => { //if the user isn't registered, msg contains the provider profile info
        if (req.session.registerType) {
            if(user){
                io.in(req.session.socketId).emit('authfailure', "Account exists already!")
                return res.end(`<script>window.close()</script>`)
            }
            const profile=msg.profile
            new User({
                name: profile.name.givenName + " " + profile.name.familyName,
                email: profile.emails[0].value,
                googleID: profile.id,
                userType: req.session.registerType
            }).save().then((user) => {
                console.log(`new user created: googleID ${user.googleID} name ${user.name} userType ${user.userType}`)
                sendTokenToUser(req, res, user)
                return res.end(`<script>window.close()</script>`)
            })
        }
        if (user) {
            sendTokenToUser(req, res, user)
            return res.end(`<script>window.close()</script>`)
        }
        io.in(req.session.socketId).emit('authfailure', true)
        return res.end(`<script>window.close()</script>`)
    })(req, res, next)
})


Router.get('/linkedincb', (req, res, next) => {
    Passport.authenticate("linkedin", { state: process.env.linkedinState }, (err, user, msg) => {
        if (user) {
            sendTokenToUser(req, res, user)
        }
        io.in(req.session.socketId).emit('authfailure', true)
        return res.end(`<script>window.close()</script>`)
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
    return res.end(`<script>window.close()</script>`)
}

function addRegisterTypeToSession(req, res, next) {
    if (req.query.registerType) {
        req.session.registerType = req.query.registerType
    }
    next()
}

module.exports = Router