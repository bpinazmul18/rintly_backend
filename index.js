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
    .catch((err) => console.log('Failed to connected the MongoDB...', err))


// schema
const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 255,
        // match: /pattern/
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network']
    },
    author: String,
    tags: {
      type: Array,
      validate: {
          validator: function (v) {
              return v && v.length > 0
          },
          message: 'A course should have at list one tag.'
      }
    },
    date: {
        type: Date,
        default: Date.now()
    },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () { return this.isPublished},
        min: 20,
        max: 200
    }
})

const Course = mongoose.model('Course', courseSchema)

async function createCourse () {
    const course = new Course({
        name: 'Node course',
        category: 'web',
        author: 'Rabu',
        // tags: [],
        // tags: null,
        tags: ['node, backend'],
        isPublished: true,
        price: 50
    })

    try {
        const result = await course.save()
        console.log(`Successfully save new course: ${result}`)
    } catch (ex) {
        console.log(ex.message)
    }

    // const result = await course.save()
    // console.log(`Successfully save new course: ${result}`)
}

async function getCourses () {
    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in
    // nin (not in)

    // or
    // and

    const pageNumber = 2
    const pageSize = 10

    const courses = await Course
        // .find({ author: 'Rabu', isPublished: true})
        // .find({ price: 10 })
        // .find({ price: { $gte: 10, $lte: 20 }})
        // .find({ price: { $in: [ 10, 15, 20 ]}})
        // .find()
        // .find({ author: /pattern/})
        // Starts with Rabu
        // .find({ author: /^Rabu/})
        // End with Borsha
        // .find({ author: /Borsha$/})
        // Case insensitive
        // .find({ author: /Borsha$/i})
        // Contains Rabu
        // .find({ author: /.*Rabu*./i})
        // .or([{ author: 'Nazmul' }, { isPublished: false }])
        // .and([{}])
        .find({ author: 'Rabu'})
        .skip((pageNumber -1 ) * pageSize)
        .limit(pageSize)
        .sort({ name: 1})
        // .select({ name: 1, tags: 1, author: 1})
        // Count
        .count()
    console.log(courses)
}

async function updateCourse (id) {
    // const course = await Course.findById(id)
    // if (!course) return

    // course.isPublished = true
    // course.author = 'Nazu'

    // const result = await course.save()
    // console.log(result);

    // const course = await Course.update({ _id: id}, {
    //     $set: {
    //         isPublished: false,
    //         author: 'Rabu'
    //     }
    // })

    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            isPublished: false,
            author: 'Rabu'
        }
    }, { new: true })

    console.log(course);
}

async function removeCourse (id) {
    // Delete one
    // const result = await Course.deleteOne({ _id: id})
    // console.log(result);

    // Delete many
    // const result = await Course.deleteMany({ isPublished: true})
    // console.log(result);

    const course = await Course.findByIdAndRemove(id)
    console.log(course);
}

// removeCourse('628bbe236d60fb100d35469d')
// updateCourse('628bbe236d60fb100d35469d')
// getCourses()
createCourse()

// Routes
app.use('/', home)
app.use('/api/genres', genres)

app.listen(port, ()=> console.log(`App listening on port http://localhost:${port}`))
