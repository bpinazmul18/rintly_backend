const express = require('express')
const router = express.Router()
const {schema, validate, Rental} = require('../models/rental')


router.get('/', async(req, res) => {
    try {
        const rentals = await Rental.find()
        res.send(rentals)
    } catch(ex) {
        return res.status(500).send('Server error!', ex.message)
    }
})

router.post('/', async(req, res) => {
    // Validate client
    const {error, value} = validate(req.body)
    if(error) return res.status(400).send(error['details'][0].message)

    // New genre
    let rental = new Rental(value)

    // Save to database and return to client
    try {
        result = await rental.save()
        return res.send(result)
    } catch (ex) {
        return res.status(500).send('Server error!', ex.message)
    }
})

module.exports = router
