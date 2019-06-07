'use strict'

// log on files
const logger = require('console-files')

module.exports = ({ appSdk, storeId, auth }) => {
  // list all authentications
  // https://developers.e-com.plus/docs/api/#/store/authentications/authentications
  // get IDs only
  const url = '/authentications.json?fields=_id'
  const method = 'GET'
  const data = {}

  // send authenticated API request
  return appSdk.apiRequest(storeId, url, method, data, auth)

    .catch(err => {
      // could not add notification to user
      // debug error
      logger.error(err)
    })
}
