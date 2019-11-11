import Express from 'express'
import Session from "express-session"
import Mongoose from "mongoose"
import Passport from "passport"

import auth from "./routes/auth"
import profile from './routes/profile'

const app = Express()

//dotenv is preloaded
app.use(Session({
    secret: process.env.secret,
    resave: true,
    saveUninitialized: true
}))


app.use(
    Express.urlencoded({
        extended: false
    })
)
app.use(Express.json())     
app.use(Express.urlencoded()) 

//DB Config
const dbURI = process.env.dbURI
Mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err))

//Passport 
app.use(Passport.initialize())
app.use(Passport.session())
require("./config/passportConfig")(Passport)


///////////////////
app.use('/api/auth', auth)
app.use('/api/profile', profile)

///////////////////
const port = process.env.serverport
app.listen(port, () => console.log(`Now listening on port ${port}!`))

app.get('/api/test', (req, res) => {
    const data = {
        abc: "def"
    }
    res.json(data)
    return console.log("/api/test")
})