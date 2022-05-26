const mongoose = require('mongoose')
const Joi = require('joi')

// Schema and Modal
const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50
    }
}))

// Validation
const validate = (genre) => {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required()
    })

    return schema.validate(genre)
}

module.exports.Genre = Genre
module.exports.validate = validate