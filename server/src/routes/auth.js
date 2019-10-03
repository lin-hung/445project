import Express from 'express'
import Passport from 'passport'
import JWT from "jsonwebtoken"
import socketioConfig, { addSocketIdToSession, io } from '../config/socketioConfig'
import User from "../models/User"
const Router = Express.Router()

//req, res, next
Router.get("/google",
    addSocketIdToSession,
    Passport.authenticate('google', { scope: ["profile", "email"] })
)
Router.get("/linkedin",
    addSocketIdToSession,
    Passport.authenticate('linkedin', { state: process.env.linkedinState })
)
Router.get("/googlecb", Passport.authenticate("google", { scope: ["profile", "email"] }),
    (req, res) => {
        const user = req.user
        const payload = {
            user: user
        }
        const token = JWT.sign(payload, process.env.secret)//DUMMY SECRET
        io.in(req.session.socketId).emit('authtoken', `Bearer ${token}`)
        return res.end(`<script>window.close()</script>`)
    }
)

Router.get("/linkedincb", Passport.authenticate("linkedin", { state: process.env.linkedinState }),
    (req, res) => {
        console.log(`linkedincb`)
        const user = req.user
        const payload = {
            user: user
        }
        const token = JWT.sign(payload, process.env.secret)//DUMMY SECRET
        io.in(req.session.socketId).emit('authtoken', `Bearer ${token}`)
        return res.end(`<script>window.close()</script>`)
    },
)

Router.get("/testAuthed", Passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.json({ success: true })
    }
)

module.exports = Router