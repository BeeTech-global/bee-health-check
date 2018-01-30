# Bee Health Check

[![Build Status](https://travis-ci.org/BeeTech-global/bee-health-check.svg?branch=master)](https://travis-ci.org/BeeTech-global/bee-health-check)

Health check to express and restify projects

## Install

```
npm install -S bee-health-check
```

## Usage

```js

const restify = require('restify');
const healthCheck = require('bee-health-check');

const app = restify.createServer();

const options = {
  healthFn = (req, res) => Promise.resolve({ ok: true }), // default
  successStatusCode = 200, // default
  failureStatusCode = 503 // default
}

app.get('/health-check', healthCheck(options));

```

### options

| Name  | Type | Description | default |
|-------|------|-------------|---------|
| healthFn | Promise.<Object, Error> | Promise based function to check api health, the response will be sent as `application/json` | `(req, res) => Promise.resolve({ ok: true })` |
| successStatusCode | number | Status code to be sent when `healthFn` fullfilled | `200`
| failureStatusCode | number | Status code to be sent when `healthFn` rejected | `503`
