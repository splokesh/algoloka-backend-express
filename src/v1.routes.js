const express = require('express')
const { kiteAuthPubilcRoutes } = require('./security/kiteauth/kiteauth.routes')
const { commonSecurityRoutes } = require('./security/common/common.routes')

const { auth } = require('./middlewares/auth')

const routerV1 = express.Router()

const publicRoutes = [
  {
    path: '/kite',
    route: kiteAuthPubilcRoutes,
  },
]

const privateRoutes = [
  {
    path: '/',
    route: commonSecurityRoutes,
  },
]

publicRoutes.forEach(({ path, route }) => {
  routerV1.use(path, route)
})

privateRoutes.forEach(({ path, route }) => {
  routerV1.use(path, auth, route)
})

module.exports = routerV1
