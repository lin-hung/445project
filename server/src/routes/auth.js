import Express from 'express'
import Passport from 'passport'
import JWT from "jsonwebtoken"
import socketioConfig, { addSocketIdToSession,io } from '../config/socketioConfig'
import User from "../models/User"
const Router = Express.Router()

//req, res, next
Router.get("/google",
    addSocketIdToSession,
    Passport.authenticate('google', { scope: ["profile", "email"] })
)
Router.get("/googlecb", Passport.authenticate("google", { scope: ["profile", "email"]}),
    (req,res)=>{
        const user=req.user
        const payload={
            user:user
        }
        const token=JWT.sign(payload,process.env.secret)//DUMMY SECRET
        io.in(req.session.socketId).emit('google', `token ${token}`);
        return res.end(`<script>window.close()</script>`)
    }
)


module.exports = Router