import Express from 'express'
import auth from "./users/auth"

const app = Express()

//dotenv is preloaded
app.listen(port, () => console.log(`Example listening on port ${process.env.PORT}!`)) 

app.get('/api/test', (req, res) => {
    const data={
        abc:"def"
    }
    res.json(data)
    return console.log("/api/test")
})

app.use('/api/users/auth',auth)
