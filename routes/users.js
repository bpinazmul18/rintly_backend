const express = require('express')
const router = express.Router()

const { User, validate } = require('../models/user')


router.post('/', async (req, res) => {
    const {error, value} = validate(req.body)
    if (error) return res.status(400).send(error['details'][0].message)

    try {
        let user = await User.findOne({ email: value['email']})
        if (user) return res.status(400).send('User already registered.')

        user = await new User(value)
        await user.save()

        return res.send(user)
    } catch (ex) {
        return res.status(500).send(`Server error ${ex.message}`)
    }

    
})

module.exports = router
