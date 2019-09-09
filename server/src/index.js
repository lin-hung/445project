import Express from 'express'

const app = Express()
const port = 3001
 
//app.get('/', (req, res) => res.send('Hello World!'))
app.get('/api/test', (req, res) => {
    //res.send('Hello sdfrld from the server!')
    const data={
        abc:"def"
    }
    res.json(data)
    return console.log("test")
})

app.listen(port, () => console.log(`Example listening on port ${port}!`)) 
