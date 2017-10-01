const express = require('express')
const path = require("path")
const app = express()

app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')) )

app.use('/assets', express.static(path.join(__dirname, './public')))

app.listen(3000, () => console.log('the webapp is running on http://localhost:3000'))

