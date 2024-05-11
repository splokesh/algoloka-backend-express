const express = require('express');
const { catchAsync } = require('../../config/catchAsync');
const { logout, test, userInfo } = require('./common.controller');

const commonSecurityRoutes = express.Router();

commonSecurityRoutes.post('/', catchAsync(test));
commonSecurityRoutes.get('/user-info', catchAsync(userInfo));
commonSecurityRoutes.post('/logout', catchAsync(logout));

module.exports.commonSecurityRoutes = commonSecurityRoutes;
