const request = require('supertest');
const restify = require('restify');
const healthCheck = require('../../src');

describe('Bee Health Check', function () {
  beforeEach(function () {
    this.app = restify.createServer();
    this.app.get('/health-check', healthCheck());
  });

  afterEach(function () {
    this.app.close();
  });

  it('Should response with 200', function () {
    return request(this.app)
      .get('/health-check')
      .expect(200);
  });

  it('Should response success with a given status code', function () {
    this.app.get('/health-check/202', healthCheck({ successStatusCode: 202 }));

    return request(this.app)
      .get('/health-check/202')
      .expect(202);
  });

  it('Should response failure with a given status code', function () {
    const healthFn = () => Promise.reject();

    this.app.get('/health-check/501', healthCheck({ healthFn, failureStatusCode: 501 }));

    return request(this.app)
      .get('/health-check/501')
      .expect(501);
  });

  it('Should response success with a given health function', function () {
    const response = {
      foo: 'bar'
    };

    const healthFn = () => Promise.resolve(response);

    this.app.get('/health-check/fn', healthCheck({ healthFn }));

    return request(this.app)
      .get('/health-check/fn')
      .expect(200)
      .expect(response);
  });

  it('Should response failure with a given health function', function () {
    const response = {
      foo: 'bar'
    };

    const healthFn = () => Promise.reject(response);

    this.app.get('/health-check/fnf', healthCheck({ healthFn }));

    return request(this.app)
      .get('/health-check/fnf')
      .expect(503)
      .expect(response);
  });
});
