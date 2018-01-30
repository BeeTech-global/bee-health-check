const httpStatus = require('http-status-codes');

module.exports = function healthCheck({
  healthFn = () => Promise.resolve({ ok: true }),
  successStatusCode = httpStatus.OK,
  failureStatusCode = httpStatus.SERVICE_UNAVAILABLE
} = {}) {
  return (req, res) => healthFn(req, res)
    .then((response) => {
      res.status(successStatusCode);
      res.json(response);
    })
    .catch((error) => {
      res.status(failureStatusCode);
      res.json(error);
    });
};
