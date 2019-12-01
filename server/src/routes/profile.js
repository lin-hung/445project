import Express from 'express'
import Passport from 'passport'
import JWT from "jsonwebtoken"
import socketioConfig, { addSocketIdToSession, io } from '../config/socketioConfig'
import User from "../models/User"
import UserProfile from "../models/UserProfile"
import YeetList from '../models/YeetList'

const Router = Express.Router()

const auth = Passport.authenticate('jwt', { session: false })

//TODO: fix submit code (auth breaks it for some reason? also tags)
Router.post('/submit', (req, res) => {
    const tokenUser = JWT.decode(req.header("Authorization").split(' ')[1]).user
    UserProfile.findOne({ user: tokenUser._id })
        .then(prof => {
            const map = new Map(Object.entries(req.body.form))
            prof.contents = map
            prof.tags = req.body.tags
            return prof.save()
        }).then(prof => {
            console.log(prof)
            return res.json(prof)
        })
})

Router.get('/get', (req, res) => {
    if (!req.header("Authorization")) return res.sendStatus(403)
    const tokenUser = JWT.decode(req.header("Authorization").split(' ')[1]).user
    UserProfile.findOne({ user: tokenUser._id })
        .then((prof) => {
            console.log(prof)
            return res.json(prof)
        })
})

Router.get('/getAllCandidates', (req, res) => {
    if (!req.header("Authorization")) return res.sendStatus(403)
    UserProfile.find({ profileType: 'candidate' })
        .then((profiles) => {
            console.log('getall profiels:', profiles)
            res.json(profiles.map(p => ({
                _id: p._id,
                contents: p.contents,
                tags: p.tags

            })))
        })
})

Router.get('/getYeetList/:profileId', (req, res) => {
    if (!req.header("Authorization")) return res.sendStatus(403)
    const profileId = req.params.profileId
    console.log('get yeet listt', profileId)
    YeetList.findOne({ owner: profileId })
        .then((list) => {
            res.json(list)
        })
})

Router.post('/yeet/:profileId/:yId', (req, res) => {
    if (!req.header("Authorization")) return res.sendStatus(403)
    const { profileId, yId } = req.params
    console.log(`yeet pId ${profileId}, ${yId}`)
    YeetList.findOneAndUpdate({ owner: profileId },
        {
            $addToSet: { yeeted: yId }
        }
    )
        .then((list) => {
           console.log(list)
           res.json(list)
        })
})

/**Router.post('/submit', (req, res) => {
    const tokenUser = JWT.decode(req.header("Authorization").split(' ')[1]).user
    UserProfile.findOne({ user: tokenUser._id })
        .then(prof => {
            const map = new Map(Object.entries(req.body.form))
            prof.contents = map
            prof.tags = req.body.tags
            return prof.save()
        }).then(prof => {
            console.log(prof)
            return res.json(prof)
        })
}) */

export default Router