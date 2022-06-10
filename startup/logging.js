const winston = require('winston')
require('winston-mongodb')
require('express-async-errors')
const config = require('config')

module.exports = function () {
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

    process.on('unhandledRejection', (ex) => {
        throw ex
    })
    
    winston.add(new winston.transports.MongoDB({
        db: config.get('dbURI')
    }))
}