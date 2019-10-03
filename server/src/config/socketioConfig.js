import {Router} from 'express'
import http from 'http'
import socketio from "socket.io"

const io=socketio(http)

const addSocketIdToSession = (req, res, next) => {
    if(req.query.socketId=="undefined"){
      return res.status(400).send('No socket ID')
    }
    req.session.socketId = req.query.socketId
    next()
}

io.on('connection', (socket)=> {
    console.log("client connected", socket.id)
    socket.on('disconnect', ()=> {
      console.log("client disconnected", socket.id)
    })
    socket.on('test_message', (msg)=> {
      console.log('test message: ' + msg + "\t id: " + socket.id)
      socket.emit('test_response','test response msg')
    })
  })
io.listen(process.env.socketioport)

module.exports = {Router, addSocketIdToSession,io}