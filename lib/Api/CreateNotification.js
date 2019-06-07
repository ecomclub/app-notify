'use strict'

// log on files
const logger = require('console-files')

module.exports = ({ appSdk, storeId, auth }, authenticationId, notification) => {
  // create new admin notification
  // https://developers.e-com.plus/docs/api/#/store/authentications/authentications
  const url = '/authentications/' + authenticationId + '/notifications.json'
  const method = 'POST'
  const data = {}

  // send authenticated API request
  return appSdk.apiRequest(storeId, url, method, data, auth)

    .catch(err => {
      // could not add notification to user
      // debug error
      logger.error(err)
    })
}
