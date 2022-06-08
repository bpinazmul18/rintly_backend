const winston = require("winston")

const error = (err, req, res, next) => {
    winston.error(err.message, err)
    return res.status(500).send(`Server error! ${err.message}`)
}

module.exports = error