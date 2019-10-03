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

Router.get('/googlecb', (req,res,next)=>{
    Passport.authenticate("google", { scope: ["profile", "email"] }, (err,user,msg)=>{ //if the user isn't registered, msg contains the provider profile info
        if(user){
            const payload = {
                user: user
            }
            const token = JWT.sign(payload, process.env.secret)
            io.in(req.session.socketId).emit('authtoken', `Bearer ${token}`)
            return res.end(`<script>window.close()</script>`)
        }
        io.in(req.session.socketId).emit('authfailure', true)
        return res.end(`<script>window.close()</script>`)
    }) (req,res,next)
})

Router.get('/linkedincb', (req,res,next)=>{
    Passport.authenticate("linkedin", { state: process.env.linkedinState }, (err,user,msg)=>{ 
        if(user){
            const payload = {
                user: user
            }
            const token = JWT.sign(payload, process.env.secret)
            io.in(req.session.socketId).emit('authtoken', `Bearer ${token}`)
            return res.end(`<script>window.close()</script>`)
        }
        io.in(req.session.socketId).emit('authfailure', true)
        return res.end(`<script>window.close()</script>`)
    }) (req,res,next)
})

Router.get("/testAuthed", Passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.json({ success: true })
    }
)

module.exports = Router