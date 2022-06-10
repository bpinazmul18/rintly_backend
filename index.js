const debug = require('debug')('app:startup')
const config = require('config')
const morgan = require('morgan')
const express = require('express')
const app = express()

require('./startup/logging')()
require('./startup/routes')(app)
require('./startup/db')()

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
