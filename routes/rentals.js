const express = require('express')
const { Customer } = require('../models/customer')
const { Movie } = require('../models/movie')
const router = express.Router()
const { validate, Rental } = require('../models/rental')


router.get('/', async(req, res) => {
    try {
        const rentals = await Rental.find()
            .select('-__v')
            .sort('-dateOut')

        return res.send(rentals)
    } catch(ex) {
        return res.status(500).send('Server error!', ex.message)
    }
})

router.post('/', async(req, res) => {
    // Validate client
    const {error, value} = validate(req.body)
    if(error) return res.status(400).send(error['details'][0].message)

    const customer = await Customer().findById(value['customerId'])
    if (!customer) return res.status(400).send('Invalid customer!')

    const movie = await Movie().findById(value['movieId'])
    if (!movie) return res.status(400).send('Invalide movie!')

    if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock!')

    // New rental
    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    })

    // Save to database and return to client
    try {
        result = await rental.save()

        movie.numberInStock--
        movie.save()

        return res.send(result)
    } catch (ex) {
        return res.status(500).send('Server error!', ex.message)
    }
})

module.exports = router
