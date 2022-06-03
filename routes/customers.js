const express = require('express')
const { Customer, validate } = require('../models/customer')
const router = express.Router()


router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find().sort('name')
        return res.send(customers)
    } catch (ex) {
        return res.status(500).send(`Server error! ${ex.message}`)
    }
})

router.post('/', async (req, res) => {
    // Validate input field
    const { error, value } = validate(req.body)
    if(error) return res.status(400).send(error['details'][0].message)

    // New customer
    let customer = new Customer(value)

    // Save to database and return to client
    try {
        customer = await customer.save()
        return res.send(customer)
    } catch (ex) {
        return res.status(500).send(`Server error! ${ex.message}`)
    }
})

module.exports = router
