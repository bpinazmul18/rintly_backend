const express = require('express')
const mongoose = require('mongoose')
const Joi = require('joi')
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
    const { error, value } = validation(req.body)
    if(error) return res.status(400).send(error['details'][0].message)

    // New customer
    let customer = new Customer(value)

    // Save to database and return to client
    try {
        customer = await customer.save()
        return res.send(customer)
    } catch (ex) {
        return res.status(500).send('Server error!', ex.message)
    }
})

// Validation
const validation = (customer) => {
    const schema = Joi.object({
        name: Joi.string().min(5).max(55).required(),
        phone: Joi.string().min(11).max(13).required(),
        isGold: Joi.boolean()
    })

    return schema.validate(customer)
}

module.exports = router
