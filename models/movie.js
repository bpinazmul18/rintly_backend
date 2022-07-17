const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose')
const { genreSchema } = require('./genre')


const Movie = new mongoose.model('Movie', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trime: true,
        minlength: 5,
        maxlength: 255,
    },
    genre: {
        type: genreSchema,
        required: true,
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    liked: {
        type: Boolean,
        default: false
    }
}))

function validateMovie (movie) {
    const schema = Joi.object({
        title: Joi.string().min(5).max(55).required(),
        // genreId: Joi.string().regex(/^[0-9a-fA-F]{24}$}/),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required(),
        liked: Joi.boolean()
    })

    return schema.validate(movie)
}

module.exports.Movie = Movie
module.exports.validate = validateMovie
