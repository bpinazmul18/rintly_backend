const debug = require('debug')('app:startup')
const config = require('config')
const morgan = require('morgan')
const helmet = require('helmet')
const express = require('express')
const mongoose = require('mongoose')
const app = express()

/**
 * Routers
 */
const genres = require('./routes/genres')
const home = require('./routes/home')

const port = process.env.PORT || 3001

// Middleware
app.set('view engine', 'pug')
app.set('views', "./views")

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(helmet())
app.use(express.static('public'))

console.log(config.get('mail.password'))

// Logger
if(app.get('env') === 'development') {
    app.use(morgan('tiny'))
    debug('Morgan enable...')
}

// mongoose practice
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Successfully connected the MongoDB...'))
    .catch((err) => console.log('Failed to connected the MongoDB...'))


// schema
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now()},
    isPublished: Boolean
})

const Course = mongoose.model('Course', courseSchema)

async function createCourse () {
    const course = new Course({
        name: 'Nodejs course',
        author: 'Nazmul',
        tags: ['node', 'backend'],
        isPublished: true
    })
    
    const result = await course.save()
    console.log(`Successfully save new course: ${result}`)
}

createCourse()



// Routes
app.use('/', home)
app.use('/api/genres', genres)

app.listen(port, ()=> console.log(`App listening on port http://localhost:${port}`))
