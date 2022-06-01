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
    }
}))

function validateMovie (movie) {
    const schema = Joi.object({
        title: Joi.string().min(5).max(55).required(),
        genreId: Joi.objectId(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    })

    return schema.validate(movie)
}

module.exports.Movie = Movie
module.exports.validate = validateMovie
