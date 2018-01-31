# Bee Health Check

[![Build Status](https://travis-ci.org/BeeTech-global/bee-health-check.svg?branch=master)](https://travis-ci.org/BeeTech-global/bee-health-check)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/311d0d0a9d1747f6b3b5c9a18a8e4c8e)](https://www.codacy.com/app/mrprompt/bee-health-check?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=BeeTech-global/bee-health-check&amp;utm_campaign=Badge_Grade)

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
