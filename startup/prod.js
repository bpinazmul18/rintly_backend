const helmet = require('helmet')
const compression = require('compression')

const prod = (app) => {
    app.use(helmet())
    app.use(compression())
}

module.exports = prod