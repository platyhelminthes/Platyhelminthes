var express = require('express')
var routes = express.Router()
var CU = require('./CreateAccount')
const GUI = require('./getUserInfo')
const GU = require('./getUser')
const GP = require('./getProviders')
const RAPT = require('./removeAPT')
const ADDP = require('./addProvider')
const ADDF = require('./addFunds')
const CFA = require('./confirmAccount')
const GAP = require('./getAppointments')

routes.post('/createUser', CU)
routes.get('/getUserInfo', GUI)
routes.get('/getUser', GU)
routes.get('/getProviders', GP)
routes.post('/removeAPT', RAPT)
routes.post('/addProvider', ADDP)
routes.post('/addFunds', ADDF)
routes.post('/confirmAccount', CFA)
routes.get('/getAppointments', GAP)





module.exports = routes;