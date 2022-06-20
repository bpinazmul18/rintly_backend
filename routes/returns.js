const express = require('express')
const router = express.Router()

router.post('/', async (req, res) => {
    return res.status(401).send('Unauthorized')
})

module.exports = router
