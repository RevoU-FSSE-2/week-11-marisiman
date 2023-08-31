require ('dotenv').config()

const express = require ('express')
const databaseMiddleware = require('./middleware/database-middleware.js')
const authRouter = require('./routes/auth-route.js')
const spiceRouter = require('./routes/spice-route.js')
const authMiddleware = require('./middleware/authentication-middleware.js')


const app = express()




app.use(express.json())
app.use(databaseMiddleware)


app.get('/', (req, res) => {

    res.send('Assignment week 11 by Iman')
})

app.use('/auth', authRouter)
app.use('/spices',authMiddleware, spiceRouter)


app.listen(3333, () => {

    console.log('Server running on port 3333')
})