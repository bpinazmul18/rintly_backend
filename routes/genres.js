const express = require('express')
const { Genre, validate } = require('../models/genre')
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const genres = await Genre.find().sort('name')
        return res.send(genres)
    } catch (ex) {
        return res.status(500).send(`Server error! ${ex.message}`)
    }
})

router.post('/', async (req, res) => {
    // Validate input field
    const { error, value } = validate(req.body)
    if(error) return res.status(400).send(error['details'][0].message)

    // New genre
    const genre = new Genre(value)

    // Save to database and return to client
    try {
        await genre.save()
        return res.send(genre)
    } catch (ex) {
        return res.status(500).send(`Server error! ${ex.message}`)
    }
})

router.put("/:id", async (req, res) => {
    // Get data by ID and validate input field
    const {error, value} = validate(req.body)
    if(error) return res.status(400).send(error['details'][0].message)

    try {
        // Find genre by ID and update
        const genre = await Genre.findByIdAndUpdate(req.params.id, value, { new: true})
        if(!genre) return res.status(404).send('genre was not found by given ID!')

        // Response to the client
        return res.send(genre)
    } catch (ex) {
        return res.status(500).send(`Server error! ${ex.message}`)
    }
})

router.get('/:id', async (req, res) => {
    try {
        // Find user by ID
        const genre = await Genre.findById(req.params.id)
        if(!genre) return res.status(404).send('genre was not found by given ID!')

        // Response to the client
        return res.send(genre)
    } catch (ex) {
        return res.status(500).send(`Server error! ${ex.message}`)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        // Find user by ID
        const genre = await Genre.findByIdAndRemove(req.params.id)
        if(!genre) return res.status(404).send('genre was not found by given ID!')

        // Response to the client
        return res.send(genre)
    } catch (ex) {
        return res.status(500).send(`Server error! ${ex.message}`)
    }
})

module.exports = router