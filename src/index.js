const axios = require('axios')
const bunyan = require('bunyan')
const express = require('express')
const swaggerUi = require('swagger-ui-express')

const app = express()

const constants = require('./constants')
const init = require('./init')

const data = {
  cities: require('./data/cities')
}

const exit = process.exit

const handlers = {
  initCitiesHandler: require('./handlers/citiesHandler'),
  initNotFoundHandler: require('./handlers/notFoundHandler'),
  initUsersHandler: require('./handlers/usersHandler')
}

const helpers = {
  initFindUsersWithinRadius: require('./helpers/findUsersWithinRadius'),
  initGetAllUsers: require('./helpers/getAllUsers'),
  initGetDistance: require('./helpers/getDistance'),
  initGetUsersFromCity: require('./helpers/getUsersFromCity'),
  initLogger: require('./helpers/logger'),
  initStartServer: require('./helpers/startServer'),
  sortById: require('./helpers/sortById')
}

const router = express.Router()

const routing = require('./routing')

const swaggerDocument = require('../specification.json')

const validation = {
  common: {
    initSendValidationErrorResponse: require('./validation/common/sendValidationErrorResponse'),
    initValidateQueryWithinBounds: require('./validation/common/validateQueryWithinBounds'),
    initValidateRequestParameters: require('./validation/common/validateRequestParameters')
  },
  users: {
    initValidateCity: require('./validation/users/validateCity'),
    initValidateQueryCombination: require('./validation/users/validateQueryCombination')
  }
}

const startServer = init({
  app,
  axios,
  bunyan,
  constants,
  data,
  exit,
  handlers,
  helpers,
  routing,
  router,
  swaggerDocument,
  swaggerUi,
  validation
})

startServer()
