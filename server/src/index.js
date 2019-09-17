import Express from 'express'
require('dotenv').config()
import auth from "./users/auth"

const app = Express()

const port = process.env.PORT
console.log(process.env.test)
app.listen(port, () => console.log(`Example listening on port ${port}!`)) 

app.get('/api/test', (req, res) => {
    const data={
        abc:"def"
    }
    res.json(data)
    return console.log("/api/test")
})

app.use('/api/users/auth',auth)
