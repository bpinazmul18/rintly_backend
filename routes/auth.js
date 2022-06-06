const Joi = require('joi')
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const express = require('express')
const router = express.Router()

const { User } = require('../models/user')


router.post('/', async (req, res) => {
    const {error, value} = validate(req.body)
    if (error) return res.status(400).send(error['details'][0].message)

    try {
        let user = await User.findOne({ email: value['email']})
        if (!user) return res.status(400).send('Invalid email or password.')

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword) return res.status(400).send('Invalid email or password.')

        const token = jwt.sign({ id: user._id}, config.get('jwtPrivateKey'))
        return res.send(token)

    } catch (ex) {
        return res.status(500).send(`Server error ${ex.message}`)
    }
})

function validate (req) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    })

    return schema.validate(req)
}

module.exports = router
