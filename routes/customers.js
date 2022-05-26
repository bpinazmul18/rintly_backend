const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const Customer = mongoose.model('Customer',new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 55
    },
    phone: {
        type: String,
        required: true,
        minLength: 11,
        maxLength: 13
    },
    isGold: {
        type: Boolean,
        default: false,
    }
}))

router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find().sort('name')
        return res.send(customers)
    } catch (ex) {
        return res.status(500).send('Server error!', ex.message)
    }
})

router.post('/', async (req, res) => {
    // Validate input field

    // New customer
    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    })

    // Save to database and return to client
    try {
        customer = await customer.save()
        return res.send(customer)
    } catch (ex) {
        return res.status(500).send('Server error!', ex.message)
    }
})

module.exports = router
