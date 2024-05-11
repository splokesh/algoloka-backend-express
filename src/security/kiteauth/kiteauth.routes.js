const express = require('express')
const { catchAsync } = require('../../config/catchAsync')
const { getKiteLoginUrl, kiteAuthorize } = require('./kiteauth.controller')

const kiteAuthPubilcRoutes = express.Router()

kiteAuthPubilcRoutes.get('/login-url', catchAsync(getKiteLoginUrl))
kiteAuthPubilcRoutes.get('/authorize', catchAsync(kiteAuthorize))

module.exports.kiteAuthPubilcRoutes = kiteAuthPubilcRoutes
