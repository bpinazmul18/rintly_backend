const express = require('express')
const router = express.Router()
const { Movie, validate } = require('../models/movie')
const { Genre } = require('../models/genre')

router.get('/', async(req, res) => {
    try {
        const movies = await Movie.find()
        .select('-__v')
        .sort('name')

        return res.send(movies)
    } catch(ex) {
        return res.status(500).send('Server error!', ex.message)
    }
    
})

router.post('/', async (req, res) => {
    // Validate input field
    const { error, value } = validate(req.body)
    if(error) return res.status(400).send(error['details'][0].message)

    // Find by genreId
    const genre = await Genre.findById(value['genreId'])
    if(!genre) return res.status(400).send('Invalid genre.')

    // New movie
    let movie = new Movie({
        title: value['title'],
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: value['numberInStock'],
        dailyRentalRate: value['dailyRentalRate']
    })

    // Save to database and return to client
    try {
        const result = await movie.save()
        return res.send(result)
    } catch (ex) {
        return res.status(500).send('Server error!', ex.message)
    }
})

module.exports = router