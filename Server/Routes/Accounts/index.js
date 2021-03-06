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
const UIMG = require('./uploadProfileImage')
const SIMG = require('./confirmImage')
const INITSUB = require('./initiateSub')
const GETSD = require('./getSubDoctors')
const ICD = require('./finishInitialConsultation')
const RAPTD = require('./removeAPTDietitician')
const UNAPHC = require('./updateNextAppHC')
const UNAPD = require('./updateNextAppD')
const FPASS = require('./forgotPassword')
const RPASS = require('./passwordReset')
const CHARGE = require('./charge')
const CANCELA = require('./cancelAppointment')
const CANCELSA = require('./cancelSubAppointment')
const WHT = require('./webHookTest')
const NL = require('./JoinNewsletter')
const GNL = require('./getNL')

routes.post('/createUser', CU)
routes.get('/getUserInfo', GUI)
routes.get('/getUser', GU)
routes.get('/getProviders', GP)
routes.post('/removeAPT', RAPT)
routes.post('/addProvider', ADDP)
routes.post('/addFunds', ADDF)
routes.post('/confirmAccount', CFA)
routes.get('/getAppointments', GAP)
routes.post('/uploadImage', UIMG)
routes.post('/saveImage', SIMG)
routes.post('/initiateSub', INITSUB)
routes.post('/getSubProviders', GETSD)
routes.get('/initialConsultationDone', ICD)
routes.get('/removeAPTDiet', RAPTD)
routes.post('/updateNextAPPHC', UNAPHC)
routes.post('/updateNextAPPD', UNAPD)
routes.post('/forgotPassword', FPASS)
routes.post('/resetPassword', RPASS)
routes.post('/charge', CHARGE)
routes.post('/cancelAppointment', CANCELA)
routes.post('/cancelSubAppointment', CANCELSA)
routes.post('/webhooktest', WHT)
routes.post('/newsLetter', NL)
routes.get('/getNL', GNL)


module.exports = routes;