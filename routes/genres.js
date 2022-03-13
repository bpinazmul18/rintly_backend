const Joi = require('joi')
const express = require('express')
const router = express.Router()

// Data
const genres = [
    {id: 1, name: 'action'},
    {id: 2, name: 'comedy'},
    {id: 3, name: 'thiler'},
    {id: 4, name: 'prank'}
]

router.get('/', (req, res) => {
    res.send(JSON.stringify(genres))
})

router.post('/', (req, res) => {
    // Validate input field
    const {error, value} = validation(req.body.name)
    if(error) return res.status(400).send(error['details'][0].message)

    // New genre
    const genre = {
        id: genres.length + 1,
        name: value['name']
    }

    // Add to database
    genres.push(genre)

    // Response to the client
    res.send(JSON.stringify(genre))
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