const error = (err, req, res, next) => {
    return res.status(500).send(`Server error! ${err.message}`)
}

module.exports = error