import Express from 'express'
import Passport from 'passport'
import JWT from "jsonwebtoken"
import User from "../models/User"
import UserProfile from "../models/UserProfile"
import YeetList from '../models/YeetList'
import Mongoose from 'mongoose'
import { io } from '../config/socketioConfig'

import { MessageRooms, Messages } from "../models/Message"

const Router = Express.Router()

const auth = Passport.authenticate('jwt', { session: false }) //the problem was in the passport config jwt strategy where it would return done(null:err, true: user) outside of the promise

Router.get('/authTest', auth, (req, res) => {
    console.log('authtest')
    res.sendStatus(200)
})


io.of('/messaging').on('connection', (socket) => {
    console.log('connected', socket.id)
    socket.on('join', (msg) => {
        socket.join(msg.room)
        console.log(`profile ${msg.prof} joined room ${msg.room} wtih socketid ${socket.id} `)
    })
    socket.on('chatmsg', (message) => {
        console.log('chat')
        console.log(message.room)
        io.of('/messaging').in(message.room).clients((err, clients) => {
            console.log(clients) // an array of socket ids
        })
        socket.to(message.room).emit('chatmsg', message)
        MessageRooms.findById(message.room)
            .then(room => {
                room.messages = [...room.messages, { text: message.text, poster: message.poster }]
                return room.save()
            }).then(room => {
                // console.log(room)
            })
    })
})

Router.get('/getRoom/:partnerId/:uPId', auth,
    (req, res) => {
        const { partnerId, uPId } = req.params
        console.log(partnerId, uPId)
        MessageRooms.findOne({
            'members': {
                $all: [partnerId, uPId]
            }
        }).populate('members').then(room => {
            if (!room) {
                return new MessageRooms({ members: [partnerId, uPId] }).save()
            }
            return room
        }).then(room => {
            res.json(room)
        })
    })
Router.get('/getChats/:uPId', auth,
    (req, res) => {
        const { uPId } = req.params
        MessageRooms.find({ members: { $in: [uPId] } }).populate('members')
            .then(rooms => {
                console.log(rooms)
                res.json(rooms)
            })
    })
export default Router