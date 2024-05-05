const express = require('express')
const { catchAsync } = require('../../config/catchAsync')
const { getKiteLoginUrl } = require('./kiteauth.controller')

const kiteAuthRoutes = express.Router()

kiteAuthRoutes.get('/login-url', catchAsync(getKiteLoginUrl))

module.exports.kiteAuthRoutes = kiteAuthRoutes
