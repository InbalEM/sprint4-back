const express = require('express')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')

const app = express()
const http = require('http').createServer(app)

app.use(express.json())
app.use(express.static('public'))

if (process.env.NODE_ENV === 'production') {
    // Express serve static files on production environment
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    // Configuring CORS
    const corsOptions = {
        // Make sure origin contains the url your frontend is running on
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

const userRoutes = require('./api/user/user.routes')
app.use('/api/user', userRoutes)

const stayRoutes = require('./api/stay/stay.routes')
app.use('/api/stay', stayRoutes)

const orderRoutes = require('./api/order/order.routes')
app.use('/api/order', orderRoutes)

const authRoutes = require('./api/auth/auth.routes')
app.use('/api/auth', authRoutes)




app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})


const logger = require('./service/logger.service')
const port = process.env.PORT || 3030

http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
})

app.get('/', (req, res) => res.send('Hello!'))
// app.listen(3030, () => console.log('Server ready at port 3030!'))
