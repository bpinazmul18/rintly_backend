const Joi = require('joi')
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

// Schema and Modal
const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50
    }
}))

router.get('/', async (req, res) => {
    try {
        const genres = await Genre.find().sort('name')
        return res.send(genres)
    } catch (ex) {
        return res.status(500).send('Server error!', ex.message)
    }
})

router.post('/', async (req, res) => {
    // Validate input field
    const { error, value } = validation(req.body.name)
    if(error) return res.status(400).send(error['details'][0].message)

    // New genre
    let genre = new Genre({ name: value['name'] })

    // Save to database and return to client
    try {
        genre = await genre.save()
        return res.send(genre)
    } catch (ex) {
        return res.status(500).send('Server error!', ex.message)
    }
})

router.put("/:id", async (req, res) => {
    // Get data by ID and validate input field
    const {error, value} = validation(req.body.name)
    if(error) return res.status(400).send(error['details'][0].message)

    // Find genre by ID and update
    const genre = await Genre.findByIdAndUpdate(req.params.id, {name: value['name']}, { new: true})
    if(!genre) return res.status(404).send('genre was not found by given ID!')

    // Response to the client
    return res.send(genre)
})

router.get('/:id', async (req, res) => {
    // Find user by ID
    const genre = await Genre.findById(req.params.id)
    if(!genre) return res.status(404).send('genre was not found by given ID!')

    return res.send(genre)
})

router.delete('/:id', async (req, res) => {
    // Find user by ID
    const genre = await Genre.findByIdAndRemove(req.params.id)
    if(!genre) return res.status(404).send('genre was not found by given ID!')

    // Response to the client
    return res.send(genre)
})


// Validation
const validation = (genre) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })

    return schema.validate({name: genre})
}


module.exports = router