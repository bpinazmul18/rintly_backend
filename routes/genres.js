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
        res.send(genres)
    } catch (ex) {
        res.status(500).send('Server error!')
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
        res.send(genre)
    } catch (ex) {
        res.status(500).send('Server error!')
    }
})

router.put("/:id", (req, res) => {
    // Find genre by ID
    const genre = genres.find(c => c.id === parseInt(req.params.id))
    if(!genre) res.status(404).send('genre was not found by given ID!')

    // Get data by ID and validate input field
    const {error, value} = validation(req.body.name)
    if(error) return res.status(400).send(error['details'][0].message)

    // Update courese
    genre.name = value['name']

    // Response to the client
    res.send(JSON.stringify(genre))
})

router.get('/:id', (req, res) => {
    // Find user by ID
    const genre = genres.find(c => c.id === parseInt(req.params.id))
    if(!genre) res.status(404).send('genre was not found by given ID!')

    // Response to the client
    res.send(JSON.stringify(genre))
})

router.delete('/:id', (req, res) => {
    // Find user by ID
    const genre = genres.find(c => c.id === parseInt(req.params.id))
    if(!genre) res.status(404).send('genre was not found by given ID!')

    // Delete genre
    const index = genres.indexOf(genre)
    genres.splice(index, 1)

    // Response to the client
    res.send(JSON.stringify(genre))
})


// Validateion
const validation = (genre) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })

    return schema.validate({name: genre})
}


module.exports = router