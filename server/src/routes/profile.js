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
            console.log(req.body.tags)
            const map = new Map(Object.entries(req.body.form))
            prof.contents = map
            return prof.save()
        }).then(prof => {
            console.log(prof)
            return res.json(prof)
        })
})

Router.post('/authtest', auth, (req, res) => {
    res.sendStatus(200)
})
export default Router