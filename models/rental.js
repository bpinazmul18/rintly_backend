const Joi = require('joi')
const mongoose = require('mongoose')
const moment = require('moment')

// Schema
const rentalSchema = new mongoose.Schema ({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            },
            isGold: {
                type: Boolean,
                default: false,
            },
            phone: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            },
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlength: 5,
                maxlength: 255
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 5,
                max: 255
            },
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date,
    },
    rentalFee: {
        type: Number,
        min: 0
    }
})

// Models
const Rental = mongoose.model('Rental', rentalSchema)

// Validation
function validateRental (rental) {
    const schema = Joi.object({
        customerId: Joi.string().regex(/^[0-9a-fA-F]{24}$}/),
        movieId: Joi.string().regex(/^[0-9a-fA-F]{24}$}/)
        // customerId: Joi.objectId().required(),
        // movieId: Joi.objectId().required()
    })

    return schema.validate(rental)
}

module.exports.Rental = Rental
module.exports.validate = validateRental