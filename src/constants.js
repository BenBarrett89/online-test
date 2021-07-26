const cityKey = '<<CITY>>'

module.exports = {
  calculation: {
    degreesToRadiansFactor: Math.PI / 180,
    earthRadius: 6371, // in kilometers
    milesInKilometer: 0.621371
  },
  errors: {
    cityNotRecognised: {
      title: 'City not recognised',
      description: 'The provided city was not recognised, please use the /cities route to discover recognised cities or provide latitude and longitude'
    },
    internalServerError: {
      title: 'Internal server error',
      description: 'Something went wrong whilst handling the request'
    },
    invalidQueryCombination: {
      title: 'Invalid query combination',
      description: 'Please ensure you provide a valid combination of query parameters; provide either city or latitude and longitude together (in addition to radius, which is mandatory).'
    },
    missingMandatoryQuery: {
      title: 'Missing mandatory query string parameters',
      description: 'The following parameters are mandatory on this route but are missing: '
    },
    notFound: {
      title: 'Route not found',
      description: 'The route you have called was not found'
    },
    queryParameterOutOfBounds: {
      title: 'Query parameter out of bounds',
      description: 'A query string parameter was not within the expected bounds'
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
    apiDocs: {
      name: 'api-docs',
      route: '/api-docs'
    },
    cities: {
      name: 'cities',
      route: '/cities'
    },
    unknown: {
      route: '*'
    },
    users: {
      name: 'users',
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
  },
  validation: {
    users: {
      bounds: {
        latitude: {
          upper: 90,
          lower: -90
        },
        longitude: {
          upper: 180,
          lower: -180
        },
        radius: {
          upper: 24901 / 2, // half the circumference of the Earth
          lower: 0
        }
      },
      mandatoryQuery: ['radius']
    }
  }
}
