const mongoose = require('mongoose')
const Joi = require('joi')

// Schema
const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50
    }
})

// Model
const Genre = mongoose.model('Genre', genreSchema)

// Validation
const validateGenre = (genre) => {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required()
    })

    return schema.validate(genre)
}

module.exports.genreSchema = genreSchema
module.exports.Genre = Genre
module.exports.validate = validateGenre