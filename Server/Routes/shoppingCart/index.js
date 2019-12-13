var express = require('express')
var routes = express.Router()
const AP = require('./addProduct');
const GSI = require('./getSubsInfo')
const GISD = require('./generateInitialSubscriptionDocument')
const GC = require('./getCart')
const GII = require('./getItemsInfo')
const RI = require('./removeItem')
const FT = require('./finishTransaction')
const AI = require('./addItem')
const CH = require('./charge')
const UA = require('./updateAccount')
const ADDT = require('./addToken')
const INCT = require('./increaseToken')
const CHMTH = require('./chargeMonthly')
const multer = require('multer')
const upload=multer()
const cors = require('cors')
const TEST = require('./testerinos')
const CCUS = require('./createCustomer')


routes.post('/addProductToCart', AP)
routes.get('/getSubsInfo', GSI)
routes.get('/generateSub', GISD)
routes.get('/getUserCart', GC)
routes.post('/getItemsInfo', GII)
routes.post('/remove', RI)
routes.post('/finish', FT)
routes.post('/addItem', AI)
routes.post('/charge', CH.charge)
routes.post('/updateAccount', UA)
routes.post('/addToken', ADDT)
routes.post('/increaseToken', INCT)
routes.post('/chargeMonthly', upload.none(), cors(), CHMTH)
routes.get('/TEST', TEST)
routes.post('/createCustomer', CCUS)



module.exports = routes;