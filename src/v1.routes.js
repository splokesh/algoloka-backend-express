const express = require('express')
const { kiteAuthRoutes } = require('./security/kiteauth/kiteauth.routes')

const routerV1 = express.Router()

const publicRoutes = []

routerV1.use('/kite', kiteAuthRoutes)

module.exports = routerV1
