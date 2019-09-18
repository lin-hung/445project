import Express from 'express'
import Passport from 'passport'
import JWT from "jsonwebtoken"
import socketioConfig, { addSocketIdToSession } from '../config/socketioConfig'
import User from "../models/User"
const Router = Express.Router()
//req, res, next
Router.get("/google",
    addSocketIdToSession,
    Passport.authenticate('google', { scope: ["profile", "email"] })
)
Router.get("/googlecb", Passport.authenticate("google", { scope: ["profile", "email"]}),
    (req,res)=>{
        console.log(`req.user ${req.user}`)
        return res.end(`<script>window.close()</script>`)
    }
)


module.exports = Router