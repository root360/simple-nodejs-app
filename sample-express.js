/*
 * based on:
 * https://www.tutorialkart.com/nodejs/nodejs-modules/
 * https://codeforgeek.com/render-html-file-expressjs/
 * https://www.npmjs.com/package/ejs
 * https://www.codementor.io/naeemshaikh27/node-with-express-and-ejs-du107lnk6
 * https://www.tutorialkart.com/nodejs/express-js-tutorial/
 * https://www.tutorialspoint.com/expressjs/expressjs_cookies.htm
 * https://nodejs.org/docs/v0.4.8/api/all.html#server.address
 * https://stackoverflow.com/questions/7440001/iterate-over-object-keys-in-node-js
 */


const express = require('express')
const app = express()
const path = require('path')
const router = express.Router()
const cookieParser = require('cookie-parser')
const ejs = require('ejs')
const os = require("os")
const net = require('net')

// define middleware function
function logger(req, res, next) {
   console.log(new Date(), req.url)
   next()
}

console.log(new Date(), 'starting sample app')

router.get('/',function(req, res){
  console.log(req.cookies)
  if (req.cookies.visit) {
    var visit = parseInt(req.cookies.visit) + 1
  } else {
    var visit = 0
  }
  res.cookie('visit', visit)
  var data = {
    'hostname': os.hostname(),
    'visit': visit,
    'version': process.version,
    'client_ip': req.header('x-forwarded-for') || req.connection.remoteAddress,
    'server_ip': net.createServer().address(),
    'cookies': req.cookies
  }
  //__dirname : It will resolve to your project folder.
  res.render(path.join(__dirname + '/public/index'), data)
})

// calls logger:middleware for each request-response cycle
app.use(logger) 
// Store all JS and CSS in Scripts folder.
app.use(express.static(__dirname + '/public/assets'))
// cookie handler
app.use(cookieParser())
app.set('view engine', 'ejs')

app.use('/', router)
var port = process.env.port || 9001
app.listen(port)

console.log('Running at Port ' + port)
