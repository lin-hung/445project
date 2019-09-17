import Express from 'express'
import auth from "./users/auth"

const app = Express()

//dotenv is preloaded
const port=process.env.serverport
app.listen(port, () => console.log(`Now listening on port ${port}!`)) 

app.get('/api/test', (req, res) => {
    const data={
        abc:"def"
    }
    res.json(data)
    return console.log("/api/test")
})

app.use('/api/users/auth',auth)
