const cros = require('cros')
const helmet = require('helmet')
const compression = require('compression')

const prod = (app) => {
    app.use(cros())
    app.use(helmet())
    app.use(compression())
}

module.exports = prod