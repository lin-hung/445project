import Express from 'express'
import Passport from 'passport'
import JWT from "jsonwebtoken"
import socketioConfig, { addSocketIdToSession, io } from '../config/socketioConfig'
import User from "../models/User"
import UserProfile from "../models/UserProfile"

const Router = Express.Router()

const auth = Passport.authenticate('jwt', { session: false })

//TODO: fix submit code (auth breaks it for some reason? also tags)
Router.post('/submit', (req, res) => {
    const tokenUser = JWT.decode(req.header("Authorization").split(' ')[1]).user
    UserProfile.findOne({ user: tokenUser._id })
        .then(prof => {
            const map = new Map(Object.entries(req.body.form))
            prof.contents = map
            prof.tags=req.body.tags
            return prof.save()
        }).then(prof => {
            console.log(prof)
            return res.json(prof)
        })
})

Router.get('/get',(req,res)=> {
    if(!req.header("Authorization")) return res.sendStatus(403)
    const tokenUser = JWT.decode(req.header("Authorization").split(' ')[1]).user
    UserProfile.findOne({user:tokenUser._id})
        .then((prof)=>{ console.log(prof)
            return res.json(prof)
        })
}) 


export default Router