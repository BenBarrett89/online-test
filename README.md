# Online Test

![Workflow](https://github.com/BenBarrett89/online-test/actions/workflows/node.js.yml/badge.svg)

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

- The [Haversine Formula](https://en.wikipedia.org/wiki/Haversine_formula) is used to find the distance between two points - city (or provided) coordinates (latitude and longitude) and user coordinates.∑

### Technology selection

The technologies uses are:

- [Node.js](https://nodejs.org/en/) - JavaScript runtime environment
- [Express](http://expressjs.com/) - web framework
- [Axios](https://github.com/axios/axios) - HTTP client
- [Bunyan](https://github.com/trentm/node-bunyan) - logging library
- [Swagger UI Express](https://github.com/scottie1984/swagger-ui-express) - API specification serving
- [Mocha](https://mochajs.org/) - test framework
- [Chai](https://www.chaijs.com/) - assertion library
- [Sinon](https://sinonjs.org/) - spying/stubbing/mocking framework
- [NYC](https://github.com/istanbuljs/nyc) - unit test coverage
- [Standard](https://standardjs.com/) - linter
- [Docker](https://www.docker.com/) - containerisation
- [Postman](https://www.postman.com/) / [Newman](https://github.com/postmanlabs/newman) - API testing
- [OpenAPI (Swagger)](https://swagger.io/specification/) - API specification

## Running the API

There are two ways to run the API - in Node.js or in Docker.

### Running the API in Node.js

#### Node.js Prerequisites

- `node` - Node.js CLI
- `npm` - Node Package Manager

#### Install dependencies

Install the dependencies listed in the `package.json` / `package-lock.json`:

```terminal
npm ci
```

#### Run the API (Node.js)

Run the application using the `start` script:

```terminal
npm start
```

or

```terminal
npm run start
```

#### Call the API (Node.js)

The API can now be called on [localhost:3000](http://localhost:3000)

The specification is available through the browser at [localhost:3000/api-docs/](http://localhost:3000/api-docs/)

### Running the API in Docker

#### Docker Prerequisites

- `docker` - Docker CLI

#### Run the API (Docker)

Run the build script from the `scripts` directory:

```terminal
sh scripts/build-docker.sh
```

Once the image has been built, it can be ran with the run script:

```terminal
sh scripts/run-docker.sh
```

or alternatively, if you have `npm` installed you can use the `docker:start` script that orchestrates both of these:

```terminal
npm run docker:start
```

#### Call the API (Docker)

The API can now be called on [localhost:3000](http://localhost:3000)

The specification is available through the browser at [localhost:3000/api-docs/](http://localhost:3000/api-docs/)

## Testing

### Testing Prerequisites

- `node` and `npm` - linting, unit testing
- `docker` or Postman - integration/functional testing

### Linting

Linting uses [Standard](https://standardjs.com/) and can be ran using:

```terminal
npm run test:lint
```

### Unit Testing

Unit tests can be ran using:

```terminal
npm run test:unit
```

This will print the NYC coverage report.

### Integration/Functional Testing

Run the API as described in the section above.

In a separate terminal window, run:

```terminal
npm run test:postman
```

This runs the Postman collection in Docker using Newman.

The Postman collection can also be imported into Postman for the suit to be ran manually.

### Continuous Integration

A GitHub Actions workflow has been set up for continuous integration.

It can be found here.

## Developer log

See [Developer log](./developer-log.md.md)

## Submission

To answer the task:

> Build an API which calls this API, and returns people who are listed as either living in London, or whose current coordinates are within 50 miles of London.

Run

```terminal
npm install && npm run start
```

And then call the API with the following request:

[http://localhost:3000/users?city=London&radius=50](http://localhost:3000/users?city=London&radius=50)

## Miscellaneous

### OpenAPI Specification

The specification for the API is available in [`specification.yml`](./specification.yml).

This can be viewed using a tool like [Swagger Editor](https://editor.swagger.io/).

### Retrospective / Further Work

I would have liked to have been able to provide additional flexibility on the `city` query string parameter of the `/users` route, however the upstream API does not allow for that so additional logic would need to be added to convert the input. For example, `city=London`, `city=london`, `city=LONDON`, `city=lonDON` could all be treated equally.

I would also have liked to have done some response mapping as I have noticed that some of the data from the upstream API is not in consistent formats - for example the user with `id` `520` has `latitude` and `longitude` values that are of type `string` rather than `number`.

### Tools

The [`tools`](./tools) section contains a rough scraping script I used to find all of the cities.

The JSON file it produced has also been committed. Interestingly there are nearly as many cities as there are users!
