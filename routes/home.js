const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        res.render('index', {title: 'My express app.', message: 'Hello world'})
    } catch (ex) {
        return res.status(500).send(`Server error! ${ex.message}`)
    }
})

module.exports = router