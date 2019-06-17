'use strict'

// handle Store API errors
const errorHandling = require('./ErrorHandling')

module.exports = ({ appSdk, storeId, auth }, authenticationId, notification) => {
  // create new admin notification
  // https://developers.e-com.plus/docs/api/#/store/authentications/authentications
  const url = '/authentications/' + authenticationId + '/notifications.json'
  const method = 'POST'

  // send authenticated API request
  return appSdk.apiRequest(storeId, url, method, notification, auth)
    .catch(err => {
      errorHandling(err)
      throw err
    })
}
