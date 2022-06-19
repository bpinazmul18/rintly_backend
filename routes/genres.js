const express = require('express')
const { Genre, validate } = require('../models/genre')
const auth = require('../middleware/auth')
const validateObjectId = require('../middleware/validateObjectId')
const admin = require('../middleware/admin')
const router = express.Router()

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name')
    return res.send(genres)
})

router.post('/', auth, async (req, res) => {
    // Validate input field
    const { error, value } = validate(req.body)
    if(error) return res.status(400).send(error['details'][0].message)

    // New genre
    const genre = new Genre(value)

    // Save to database and return to client
    await genre.save()
    return res.send(genre)
})

router.put("/:id", [auth, validateObjectId], async (req, res) => {
    // Get data by ID and validate input field
    const {error, value} = validate(req.body)
    if(error) return res.status(400).send(error['details'][0].message)

    // Find genre by ID and update
    const genre = await Genre.findByIdAndUpdate(req.params.id, value, { new: true})
    if(!genre) return res.status(404).send('genre was not found by given ID!')

    // Response to the client
    return res.send(genre)
})

router.get('/:id', async (req, res) => {
    // Find user by ID
    const genre = await Genre.findById(req.params.id)
    if(!genre) return res.status(404).send('genre was not found by given ID!')

    // Response to the client
    return res.send(genre)
})

router.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
    // Find user by ID
    const genre = await Genre.findByIdAndRemove(req.params.id)
    if(!genre) return res.status(404).send('genre was not found by given ID!')

    // Response to the client
    return res.send(genre)
})

module.exports = router