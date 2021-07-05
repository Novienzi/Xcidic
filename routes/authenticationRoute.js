const express = require('express');
const app = express.Router()
const AuthController = require('../controller/authenticationController');
const errorHandler = require('../middleware/errorMiddleware');


app.post('/auth/register', AuthController.register);
app.post('/auth/login', AuthController.login);
app.post('/auth/register/admin', AuthController.registerAdmin);
app.post('/auth/login/admin', AuthController.login);

app.use(errorHandler)
module.exports = app