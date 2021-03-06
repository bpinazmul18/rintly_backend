const express = require('express')
const router = express.Router()
const { Movie, validate } = require('../models/movie')
const { Genre } = require('../models/genre')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const validateObjectId = require('../middleware/validateObjectId')

router.get('/', async(req, res) => {
    const movies = await Movie.find()
    .select('-__v')
    .sort('name')

    return res.send(movies)
})

router.post('/', [auth], async (req, res) => {
    // Validate input field
    const { error, value } = validate(req.body)
    if(error) return res.status(400).send(error['details'][0].message)

    // Find by genreId
    const genre = await Genre.findById(value['genreId'])
    if(!genre) return res.status(400).send('Invalid genre.')

    // New movie
        const movie = new Movie({
        title: value['title'],
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: value['numberInStock'],
        dailyRentalRate: value['dailyRentalRate'],
        liked: value['liked']
    })

    // Save to database and return to client
    await movie.save()
    return res.send(movie)
})

router.get('/:id', [validateObjectId], async (req, res) => {
    // Find user by ID
    const movie = await Movie.findById(req.params.id)
    if(!movie) return res.status(404).send('movie was not found by given ID!')

    // Response to the client
    return res.send(movie)
})

router.put("/:id", [auth, validateObjectId], async (req, res) => {
    // Get data by ID and validate input field
    const {error, value} = validate(req.body)
    if(error) return res.status(400).send(error['details'][0].message)

    // Find movies= by ID and update
    const movie = await Movie.findByIdAndUpdate(req.params.id, value, { new: true})
    if(!movie) return res.status(404).send('movie was not found by given ID!')

    // Response to the client
    return res.send(movie)
})

router.delete('/:id', [auth, admin], async (req, res) => {
    // Find user by ID
    const movie = await Movie.findByIdAndRemove(req.params.id)
    if(!movie) return res.status(404).send('movie was not found by given ID!')

    // Response to the client
    return res.send(movie)
})

module.exports = router
