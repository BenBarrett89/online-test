const cityKey = '<<CITY>>'

module.exports = {
  calculation: {
    degreesToRadiansFactor: Math.PI / 180,
    earthRadius: 6371, // in kilometers
    milesInKilometer: 0.621371
  },
  errors: {
    internalServerError: {
      title: 'Internal server error',
      description: 'Something went wrong whilst handling the request'
    },
    notFound: {
      title: 'Route not found',
      description: 'The route you have called was not found'
    }
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
  },
  upstream: {
    base: 'https://bpdts-test-app.herokuapp.com',
    keys: {
      city: cityKey
    },
    routes: {
      cities: `/city/${cityKey}/users`,
      users: '/users'
    }
  }
}
