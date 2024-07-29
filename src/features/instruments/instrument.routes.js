const express = require('express');
const { catchAsync } = require('../../config/catchAsync');
const {
	syncInstruments,
	getInstrumentsList,
} = require('./instrument.controller');

const instrumentRoutes = express.Router();

instrumentRoutes.post('/sync', catchAsync(syncInstruments));
instrumentRoutes.get('/', catchAsync(getInstrumentsList));

module.exports.instrumentRoutes = instrumentRoutes;
