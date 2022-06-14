const express = require('express')
const config = require('config')
const winston = require('winston')
const app = express()

require('./startup/logging')(app)
require('./startup/routes')(app)
require('./startup/db')()
require('./startup/config')()

const port = process.env.PORT || config.get('port')

const server = app.listen(port, ()=> winston.info(`App listening on port http://localhost:${config.get('port')}`))

module.exports = server
