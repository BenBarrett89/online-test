# Online Test

> Code for an online test

## Overview

This repository contains my submission for an online test. Please consider this README as part of my submission.

## Analysis and design

### Task

The task (as can be found from the [`/instructions` route](https://bpdts-test-app.herokuapp.com/instructions)) is to

> Build an API which calls this API, and returns people who are listed as either living in London, or whose current coordinates are within 50 miles of London.

The existing API is available at [https://bpdts-test-app.herokuapp.com/](https://bpdts-test-app.herokuapp.com/)

### Analysis of the existing API

The provided API, despite having an OpenAPI specification, does not have a lot of documentation available for it.

It consists of 4 `GET` routes:

- `/city/{city}/users` where `{city}` is the name of the city, e.g. `London`. Returns the users associated to the given city.
- `/instructions` which only provides the task statement documented above.
- `/user/{user}` where `{user}` is the `id` of a user, which are integers ranging from 1 to 1000, e.g. `77`
- `/users` which returns what can only be assumed as all users (it doesn't seem to have any pagination functionality), of which there are 1000 users.

The `/instructions` endpoint will not be useful going forward, so I will exclude it from any further analysis.

Examples/formats of the responses to these endpoints are:

`/city/{city}/users`:

```json
[
  {
    "id": 135,
    "first_name": "Mechelle",
    "last_name": "Boam",
    "email": "mboam3q@thetimes.co.uk",
    "ip_address": "113.71.242.187",
    "latitude": -6.5115909,
    "longitude": 105.652983
  },
  ...
]
```

`/user/{user}`:

```json
{
  "id": 77,
  "first_name": "Sherilyn",
  "last_name": "Tourmell",
  "email": "stourmell24@thetimes.co.uk",
  "ip_address": "193.225.251.27",
  "latitude": -31.2657738,
  "longitude": -64.460387,
  "city": "Villa Bustos"
}
```

`/users`:

```json
[
  {
    "id": 1,
    "first_name": "Maurise",
    "last_name": "Shieldon",
    "email": "mshieldon0@squidoo.com",
    "ip_address": "192.57.232.111",
    "latitude": 34.003135,
    "longitude": -117.7228641
  },
  ...
]
```

There is a single data type which represents a user, which is either returned by itself or in an array either with or without the `city`, which is only returned on the `/user/{user}` route.

### Questions / assumptions / decisions

With knowledge of the problem statement and after investigating the existing API, some questions arise that will need decisions or assumptions made for them.

- How do we decide where 'London' is? There are multiple ways this could be done, for example this could be sourced from another location (geocoding etc), or the average centre of the users that are known to be in London could be used.
  - Does '50 miles from London' mean 50 miles from a specific point in central London, or 50 miles from the city limits of London (via [dilation](https://en.wikipedia.org/wiki/Dilation_(morphology)) etc)?
  - Are the 50 miles 'as the crow files' (unimpeded by any geographic features) or are they required to be drivable or walkable?
- How should the interface of the API to be developed be structured?
  - Should the scope be narrow so only values for London can be returned, or should other locations be considered too?
  - Should the scope be narrow so only 50 miles be returned, or should other distances be considered too?
- Should data be pre-processed into a local data store at start up time (and or periodically or triggered by a call to an endpoint) or should the downstream API be called at request time to the API? The distances between known/accepted cities and users could all be preprocessed into a matrix that would improve performance.

In order to continue with the design, I must make assumptions and decisions to answer these questions:

- I will use a single specific point in central London and calculate distances from this point.
- I will assume that miles are 'as the crow files'.
- I will structure the API to allow other locations other than London to be provided.
  - Caveat - I will not provide location coordinates for _all_ user cities, but a handful as examples.
  - Stretch goal - I will allow arbitrary latitude and longitude to be provided rather than city names/locations.
- I will structure the API to allow other distances other than 50 miles.

These decisions (particularly the stretch goal) impact the design and force an answer to the final question:

- I will not pre-process data and will call the API when requests are made to my API

### Technical notes

- The [Haversine Formula](https://en.wikipedia.org/wiki/Haversine_formula) appears to be suitable for calculating the distance between two points on a sphere - I will investigate using this for determining the distance between two points (the city and any given user).

### Technology selection

The technologies I intend to use will be:

- [Node.js](https://nodejs.org/en/) - JavaScript runtime environment
- [Express](http://expressjs.com/) - web framework
- [Axios](https://github.com/axios/axios) - HTTP client
- [Mocha](https://mochajs.org/) - test framework
- [Chai](https://www.chaijs.com/) - assertion library
- [Sinon](https://sinonjs.org/) - spying/stubbing/mocking framework
- [NYC](https://github.com/istanbuljs/nyc) - unit test coverage
- [Standard](https://standardjs.com/) - linter
- [Docker](https://www.docker.com/) - containerisation
- [Postman](https://www.postman.com/) / [Newman](https://github.com/postmanlabs/newman) - API testing
- [OpenAPI (Swagger)](https://swagger.io/specification/) - API specification

## Running the API

Information on running the API will be placed here.

## Developer log

See [Developer log](./developer-log.md.md)