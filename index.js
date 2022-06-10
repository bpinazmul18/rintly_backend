require('express-async-errors')
const winston = require("winston")
require('winston-mongodb')
const debug = require('debug')('app:startup')
const config = require('config')
const morgan = require('morgan')
const express = require('express')
const app = express()
require('./startup/routes')(app)
require('./startup/db')()

process.on('unhandledRejection', (ex) => {
    throw ex
})

winston.add(new winston.transports.File({
    name: 'error-file',
    filename: './logs/exceptions.log',
    level: 'error',
    json: false
}))

winston.handleExceptions(new winston.transports.File({
    name: 'handle-exceptions',
    filename: './logs/uncoughtExceptions.log',
    level: 'error',
    json: false
}))

winston.add(new winston.transports.MongoDB({
    db: 'mongodb://localhost:27017/rintly'
}))

const port = process.env.PORT || 3001

// If jwtPrivateKey is undefined
if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.')
    process.exit(1)
}

// Logger
if(app.get('env') === 'development') {
    app.use(morgan('tiny'))
    debug('Morgan enable...')
}

app.listen(port, ()=> console.log(`App listening on port http://localhost:${port}`))
