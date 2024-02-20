require('dotenv').config()

const express = require('express')
const cors = require('cors')

const userRoute = require('./routes/userRoutes')
const blogRoute = require('./routes/blogRoute')
const feedbackRoute = require('./routes/feedbackRoute')

require('./config/db')

const app = express()

const PORT = process.env.PORT || 5000

app.use(cors());
app.use(express.json());

app.use('/user', userRoute)
app.use('/blog', blogRoute)
app.use('/user',feedbackRoute)


app.listen(PORT, () => {
    console.log('app is listening in port' +PORT);
})

app.get('/', (req, res) => {
    res.send('welcome to backend')
})
