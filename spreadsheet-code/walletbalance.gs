function WALLETBALANCE(address) {
  var serverlessEndpoint = 'https://abc123.execute-api.us-east-1.amazonaws.com/dev/api/v1/balance/';
  var username = 'test';
  var password = 'test';

  var headers = {
    "Authorization" : "Basic " + Utilities.base64Encode(username + ':' + password)
  };

  var response = UrlFetchApp.fetch(serverlessEndpoint + address, { headers: headers });
  var result = JSON.parse(response.getContentText());
  return result[0].quantity + " " + result[0].asset;
}