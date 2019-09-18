import Express from 'express'
import Passport from 'passport'
import socketioConfig, { addSocketIdToSession } from '../config/socketioConfig'
import User from "../models/User"
const Router = Express.Router()
//req, res, next
Router.get("/google",
    addSocketIdToSession,
    Passport.authenticate('google', { scope: ["profile", "email"] })
)
Router.get("/googlecb", Passport.authenticate("google", { scope: ["profile", "email"] },
    (res, req) => {
        console.log(req.user)
    })
)

module.exports = Router