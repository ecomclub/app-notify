'use strict'

// read configured E-Com Plus app data
const getConfig = require('./../lib/Api/AppConfig')

const POST = (id, meta, trigger, respond, storeId, appSdk) => {
  // get user notification options from E-Com Plus application data
  getConfig({ appSdk, storeId })

    .then(({ authentications }) => {
      if (authentications) {
      }
    })

    .catch(err => {
      // cannot read app data
      // return error status code
      respond({}, null, 500, 'APP_ERR', err.message)
    })
}

module.exports = {
  POST
}
