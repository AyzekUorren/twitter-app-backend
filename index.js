// Dependies
const timeConfig = require('./api/config/runningTime')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const swaggerUi = require('swagger-ui-express')
const morgan = require('morgan')
const errorHandler = require('./api/errorHandlers/errorHandler')
const swaggerJSDoc = require('swagger-jsdoc')
const logger = require('./logger/logger')

// Configure process.env
const config = require('./api/config/env')

const swaggerSpec = swaggerJSDoc({
  definition: {
    info: {
      title: 'Twitter web-app API',
      version: '1.0.0'
    },
    host: `${config.defaultUrl}:${config.port}`,
    basePath: '/api/v1',
    securityDefinitions: {
      signIn: {
        description: 'JWT token',
        type: 'apiKey',
        name: 'authorization',
        in: 'header'
      }
    }
  },
  apis: ['./api/**/*.js']
})
// Connect / configure DB
mongoose.connect(config.mongourl, {
  useMongoClient: true
}, (err) => {if (err) throw err;})
mongoose.Promise = global.Promise

express()
  // Middlewares
  .use(morgan('dev'))
  .use(express.static(path.join(__dirname, 'api/v1')))
  .use(bodyParser.urlencoded({extended: false}))
  .use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();})
  .use(bodyParser.json())
  // api docs for API
  .use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }))
  // Startup Time and running time of server
  .get('', timeConfig.getTimeRun)
  // Routes
  .use(logger)
  .use('/api/v1', require('./api/routes/api'))
  .use(errorHandler)
  .use('*', (req, res) => {console.log(req.baseUrl); res.send('API path not supported');})
  // Starting server
  .listen(config.port, () => {
  	console.log(`-> Listening on	\x1b[34m http://${ config.defaultUrl }:${ config.port }\x1b[0m`)
    console.log(`-> Api docs on	\x1b[32m http://${ config.defaultUrl }:${ config.port }/api/v1/docs\x1b[0m`)
  	console.log(`Mongourl : ${config.mongourl}`)
  })