const express = require('express')
const UserController = require('../controller/userController')
const passport = require('../middleware/authenticationMiddleware')
const app = express.Router()
const routeErrorHandler = require('../middleware/errorMiddleware')

app.get('/profile', passport.authenticate('bearer', { session: false }), UserController.getUser)
app.patch('/profile', passport.authenticate('bearer', { session: false }), UserController.editProfile)

app.use(routeErrorHandler)

module.exports = app