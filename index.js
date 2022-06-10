const express = require('express')
const app = express()

require('./startup/logging')(app)
require('./startup/routes')(app)
require('./startup/db')()
require('./startup/config')()

const port = process.env.PORT || 3001

app.listen(port, ()=> console.log(`App listening on port http://localhost:${port}`))
