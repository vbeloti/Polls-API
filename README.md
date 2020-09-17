[![Build Status](https://travis-ci.org/vbeloti/surveys-api.svg?branch=master)](https://travis-ci.org/vbeloti/surveys-api)
[![Coverage Status](https://coveralls.io/repos/github/vbeloti/surveys-api/badge.svg?branch=master)](https://coveralls.io/github/vbeloti/surveys-api?branch=master)

## Surveys Api (Node.js && Typescript && Express.js && Postgres)

# Surveys API

## Open Endpoints

Open endpoints require no Authentication.

* [Signup]: `POST /api/signup` -- Create Account

## Closed Endpoints

Closed endpoints required Authentication.

* [Signin]: `POST /api/signin` -- Login Account
* [Pools]: `POST /api/surveys` -- Create survey
* [Pools]: `GET /api/surveys` -- List All surveys
