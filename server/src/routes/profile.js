import Express from 'express'
import Passport from 'passport'
import JWT from "jsonwebtoken"
import socketioConfig, { addSocketIdToSession, io } from '../config/socketioConfig'
import User from "../models/User"
import UserProfile from "../models/UserProfile"
import YeetList from '../models/YeetList'
import Mongoose from 'mongoose'

const Router = Express.Router()

// const auth = (req, res, next) => {
//     return Passport.authenticate('jwt', { session: false }, (err, user) => {
//         console.log('auth', err, user)
//         if(!err && !user) err='unauthorized'
//         next(err)
//     })(req, res, next)
// }

const auth = Passport.authenticate('jwt', { session: false }) //the problem was in the passport config jwt strategy where it would return done(null:err, true: user) outside of the promise

Router.get('/authTest', auth, (req, res) => {
    console.log('authtest')
    res.sendStatus(200)
})

Router.post('/submit', auth, (req, res) => {
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

Router.get('/get', auth, (req, res) => {
    const tokenUser = JWT.decode(req.header("Authorization").split(' ')[1]).user
    UserProfile.findOne({ user: tokenUser._id })
        .then((prof) => {
            return res.json(prof)
        })
})

Router.get('/getAllCandidates', auth,
    (req, res, ) => {
        UserProfile.find({ profileType: 'candidate' })
            .then((profiles) => {
                console.log('get all candidates')
                res.json(profiles.map(p => ({
                    _id: p._id,
                    contents: p.contents,
                    tags: p.tags

                })))
            })
    })

Router.get('/getYeetList/:profileId', auth,
    (req, res) => {
        const profileId = req.params.profileId
        console.log('get yeet listt', profileId)
        YeetList.findOne({ owner: profileId })
            .then((list) => {
                res.json(list)
            })
    })
Router.get('/getPopulatedYeetList/:profileId', auth, (req, res) => {
    const profileId = req.params.profileId
    console.log('get yeet listt', profileId)
    YeetList.findOne({ owner: profileId }).populate('yeeted')
        .then((list) => {
            res.json(list)
        })
})
Router.post('/yeet/:profileId/:yId', auth, (req, res) => {
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

Router.get('/getYeetees', auth,
    (req, res) => {
        const tokenUser = JWT.decode(req.header("Authorization").split(' ')[1]).user
        UserProfile.findOne({ user: tokenUser._id })
            .then((prof) => {
                console.log(prof)
                if (prof.profileType !== 'candidate') throw Error('Wrong profile type!')
                return YeetList.find({
                    'yeeted': {
                        $in: [
                            prof._id
                        ]
                    }
                }).populate('owner')
            }).then(yeetLists => {
                res.json(yeetLists.map(list => list.owner))
            }).catch(err => {
                console.log(err)
                res.status(403)
                res.send(err)
            })
    })

export default Router