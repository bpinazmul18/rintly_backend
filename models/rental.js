const Joi = require('joi')
const mongoose = require('mongoose')

// Schema
const rentalSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 55
    }
})

// Models
const Rental = mongoose.model('Rental', rentalSchema)

// Validation
function validateRental (rental) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(55).required()
    })

    return schema.validate(rental)
}

module.exports.schema = rentalSchema
module.exports.Rental = Rental
module.exports.validate = validateRental