const express = require('express')
const asyncMiddleware = require('../middleware/async')
const router = express.Router()

router.get('/', asyncMiddleware(async (req, res) => {
    res.render('index', {title: 'My express app.', message: 'Hello world'})
}))

module.exports = router
