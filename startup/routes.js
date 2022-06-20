const express = require('express')
const helmet = require('helmet')
const compression = require('compression')

const genres = require('../routes/genres')
const movies = require('../routes/movies')
const home = require('../routes/home')
const customers = require('../routes/customers')
const rentals = require('../routes/rentals')
const users = require('../routes/users')
const auth = require('../routes/auth')
const returns = require('../routes/returns')
const error = require('../middleware/error')

module.exports = function (app) {
    //middleware
    app.set('view engine', 'pug')
    app.set('views', "./views")
    app.use(express.json())
    app.use(express.urlencoded({ extended: true}))
    app.use(helmet())
    app.use(compression())
    app.use(express.static('public'))


    //routes
    app.use('/', home)
    app.use('/api/genres', genres)
    app.use('/api/movies', movies)
    app.use('/api/customers', customers)
    app.use('/api/rentals', rentals)
    app.use('/api/users', users)
    app.use('/api/returns', returns)
    app.use('/api/auth', auth)

    //error
    app.use(error)
}

