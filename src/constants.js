module.exports = {
  calculation: {
    degreesToRadiansFactor: Math.PI / 180,
    earthRadius: 6371, // in kilometers
    milesInKilometer: 0.621371
  },
  log: {
    environment: 'development',
    level: 'info',
    levels: {
      default: 'info',
      400: 'warn',
      405: 'warn',
      500: 'error'
    },
    messages: {
      serverStart: 'Server started at'
    },
    name: 'online-test'
  },
  routing: {
    cities: {
      route: '/cities'
    },
    unknown: {
      route: '*'
    },
    users: {
      route: '/users'
    }
  },
  server: {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 3000,
    responseCodes: {
      clientError: 400,
      error: 500,
      notFound: 404,
      success: 200
    }
  }
}
