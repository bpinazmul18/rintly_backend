const mongoose = require('mongoose')
const Joi = require('joi')

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

// Validation
const validate = (customer) => {
    const schema = Joi.object({
        name: Joi.string().min(5).max(55).required(),
        phone: Joi.string().min(11).max(13).required(),
        isGold: Joi.boolean()
    })

    return schema.validate(customer)
}

module.exports.Customer = Customer
module.exports.validate = validate
