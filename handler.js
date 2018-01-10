var balance = require('crypto-balances')


module.exports.balance = (event, context, callback) => {
  balance(event.pathParameters.id, function(error, result) {

    if (result.length === 0) {
      return callback(null, {
        statusCode: 404
      })
    }

    if (error) {
      return callback(null, {
        statusCode: 500,
        error: error
      })
    }

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(result)
    });
  });
};
