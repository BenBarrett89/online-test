const axios = require('axios')
const bunyan = require('bunyan')
const express = require('express')

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

const routing = require('./routing')

const startServer = init({
  axios,
  bunyan,
  constants,
  data,
  exit,
  express,
  handlers,
  helpers,
  routing
})

startServer()
