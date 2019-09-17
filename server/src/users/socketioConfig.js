import Express, {Router} from 'express'

const app=Express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.set('io', io);

console.log(app.get('config'))
const addSocketIdToSession = (req, res, next) => {
    req.session.socketId = req.query.socketId
    next()
}

io.on('connection', (socket)=> {
    console.log("socket.io connected", socket.id)
    socket.on('disconnect', ()=> {
      console.log("socket.io disconnected", socket.id)
    })
    socket.on('test_message', (msg)=> {
      console.log('test message: ' + msg + "\t id: " + socket.id)
      socket.emit('test_response','test response msg')
    })
  })
io.listen(process.env.socketioport)

module.exports = {Router, addSocketIdToSession}