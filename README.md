[![Build Status](https://travis-ci.org/vbeloti/Polls-API.svg?branch=master)](https://travis-ci.org/vbeloti/Polls-API)
[![Coverage Status](https://coveralls.io/repos/github/vbeloti/Polls-API/badge.svg?branch=master)](https://coveralls.io/github/vbeloti/Polls-API?branch=master)

## Surveys Api (Node.js && Typescript && Express.js && Postgres)

# Surveys Api

## Open Endpoints

Open endpoints require no Authentication.

* [Signup]: `POST /api/signup` -- Create Account

## Closed Endpoints

Closed endpoints required Authentication.

* [Signin]: `POST /api/signin` -- Login Account
* [Pools]: `POST /api/surveys` -- Create survey
* [Pools]: `GET /api/surveys` -- List All surveys
