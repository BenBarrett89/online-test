const axios = require('axios')
const bunyan = require('bunyan')
const express = require('express')

const constants = require('./constants')
const init = require('./init')

const helpers = {
  initGetDistance: require('./helpers/getDistance'),
  initLogger: require('./helpers/logger'),
  initStartServer: require('./helpers/startServer')
}

const exit = process.exit

const routing = require('./routing')

const startServer = init({
  axios,
  bunyan,
  constants,
  exit,
  express,
  helpers,
  routing
})

startServer()
