
/**
 * Implements basic auth
 */
module.exports.auth = (event, context, callback) => {
  try {

    // Grab the header
    const authorizationHeader = event.headers.Authorization || event.headers.authorization
    const authUser = process.env.USERNAME // Get creds from env
    const authPass = process.env.PASSWORD
    // Let's build the auth string
    const authString = 'Basic ' + new Buffer(authUser + ':' + authPass).toString('base64')

    if (authString === authorizationHeader) {
      return callback(null, {
        principalId: authUser,
        policyDocument: {
          Version: '2012-10-17',
          Statement: [
            {
              Action: 'execute-api:Invoke',
              Effect: 'Allow', // Allow!
              Resource: event.methodArn,
            },
          ],
        },
        context: {}
      })
    } else {
      return context.fail("Unauthorized") // Booh!
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      body: JSON.stringify({
        statusCode: 500,
        message: 'Something went wrong trying to authorize',
        requestId: context.awsRequestId
      })
    }
  }
};
