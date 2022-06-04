const bcrypt = require('bcrypt')
const _ = require('lodash')
const express = require('express')
const router = express.Router()

const { User, validate } = require('../models/user')


router.post('/', async (req, res) => {
    const {error, value} = validate(req.body)
    if (error) return res.status(400).send(error['details'][0].message)

    try {
        let user = await User.findOne({ email: value['email']})
        if (user) return res.status(400).send('User already registered.')

        user = await new User(_.pick(value, ['name', 'email', 'password']))
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)

        await user.save()

        const result = _.pick(user, ['_id', 'name', 'email'])

        return res.send(result)
    } catch (ex) {
        return res.status(500).send(`Server error ${ex.message}`)
    }

    
})

module.exports = router
