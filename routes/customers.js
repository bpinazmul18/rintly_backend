const express = require('express')
const { Customer, validate } = require('../models/customer')
const router = express.Router()


router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name')
    return res.send(customers)
})

router.post('/', async (req, res) => {
    // Validate input field
    const { error, value } = validate(req.body)
    if(error) return res.status(400).send(error['details'][0].message)

    // New customer
    const customer = new Customer(value)

    // Save to database and return to client
    await customer.save()
    return res.send(customer)
})

module.exports = router
