'use strict'

// handle Store API errors
const errorHandling = require('./ErrorHandling')

module.exports = ({ appSdk, storeId, auth }) => {
  // list all authentications
  // https://developers.e-com.plus/docs/api/#/store/authentications/authentications
  // get IDs only
  const url = '/authentications.json?fields=_id'
  const method = 'GET'
  const data = null

  // send authenticated API request
  return appSdk.apiRequest(storeId, url, method, data, auth)
    .catch(errorHandling)
}
