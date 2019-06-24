'use strict'

// handle Store API errors
const errorHandling = require('./ErrorHandling')

module.exports = ({ appSdk, storeId, auth }) => {
  // read configured options from app data
  // https://developers.e-com.plus/docs/api/#/store/applications/applications
  return appSdk.appPublicBody(storeId, auth)

    .then(({ response }) => {
      // returns app data object
      return response.data.data || {}
    })

    .catch(err => {
      // cannot GET current application
      // debug error
      errorHandling(err)
      throw err
    })
}
