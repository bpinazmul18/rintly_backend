const Joi = require('joi')
const moment = require('moment')
const express = require('express')
const auth = require('../middleware/auth')
const { Rental } = require('../models/rental')
const { Movie } = require('../models/movie')
const validate = require('../middleware/validate')
const router = express.Router()

router.post('/', [auth, validate(validateReturn)], async (req, res) => {

    const rental = await Rental.lookup(req.body.customerId, req.body.movieId)

    if (!rental) return res.status(404).send('Rental not found.')

    if (rental.dateReturned) return res.status(400).send('return is already processed.')

    rental.dateReturned = new Date()

    const rentalDays = moment().diff(rental.dateOut, 'days')
    rental.rentalFee =  rentalDays * rental.movie.dailyRentalRate
    await rental.save()

    await Movie.update({_id: rental.movie._id}, {
        $inc: { numberInStock: 1}
    })

    return res.status(200).send(rental)
})

// Validation
function validateReturn (req) {
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    })

    return schema.validate(req)
}


module.exports = router
