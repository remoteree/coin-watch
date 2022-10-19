//Solves the issue of repetitive try catch blocks

function asyncMiddleware(handler) {
  return async (req, res, next) => {
    try {
      await handler;
    } catch (ex) {
      next(ex);
    }
  };
}

module.exports = asyncMiddleware;
