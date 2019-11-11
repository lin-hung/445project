import Express from 'express'
import Passport from 'passport'
import JWT from "jsonwebtoken"
import socketioConfig, { addSocketIdToSession, io } from '../config/socketioConfig'
import User from "../models/User"
import UserProfile from "../models/UserProfile"

const Router = Express.Router()

const auth = Passport.authenticate('jwt', { session: false })

Router.post('/submit', auth, (req, res) => {
    const tokenUser = JWT.decode(req.header("Authorization").split(' ')[1]).user
    UserProfile.findOne({ user: tokenUser._id })
        .then(prof => {
            const map = new Map(Object.entries(req.body.form))
            prof.contents = map
            return prof.save()
        }).then(prof => {
            console.log(prof)
            return res.json(prof)
        })
})

export default Router