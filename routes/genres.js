const express = require('express')
const { Genre, validate } = require('../models/genre')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const asyncMiddleware = require('../middleware/async')
const router = express.Router()

router.get('/', asyncMiddleware(async (req, res) => {
    const genres = await Genre.find().sort('name')
    return res.send(genres)
}))

router.post('/', auth, asyncMiddleware(async (req, res) => {
    // Validate input field
    const { error, value } = validate(req.body)
    if(error) return res.status(400).send(error['details'][0].message)

    // New genre
    const genre = new Genre(value)

    // Save to database and return to client
    await genre.save()
    return res.send(genre)
}))

router.put("/:id", asyncMiddleware(async (req, res) => {
    // Get data by ID and validate input field
    const {error, value} = validate(req.body)
    if(error) return res.status(400).send(error['details'][0].message)

    // Find genre by ID and update
    const genre = await Genre.findByIdAndUpdate(req.params.id, value, { new: true})
    if(!genre) return res.status(404).send('genre was not found by given ID!')

    // Response to the client
    return res.send(genre)
}))

router.get('/:id', asyncMiddleware(async (req, res) => {
    // Find user by ID
    const genre = await Genre.findById(req.params.id)
    if(!genre) return res.status(404).send('genre was not found by given ID!')

    // Response to the client
    return res.send(genre)
}))

router.delete('/:id', [auth, admin], asyncMiddleware(async (req, res) => {
    // Find user by ID
    const genre = await Genre.findByIdAndRemove(req.params.id)
    if(!genre) return res.status(404).send('genre was not found by given ID!')

    // Response to the client
    return res.send(genre)
}))

module.exports = router