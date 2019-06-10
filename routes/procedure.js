'use strict'

// read configured E-Com Plus app data
const getConfig = require('./../lib/Api/GetConfig')
// get all admin users from Store API
const listAuthentications = require('./../lib/Api/ListAuthentications')
// create new notification for each admin user
const createNotification = require('./../lib/Api/CreateNotification')

const POST = (id, meta, trigger, respond, storeId, appSdk) => {
  // get user notification options from E-Com Plus application data
  let client
  getConfig({ appSdk, storeId })

    .then(({ authentications }) => {
      // get authentication tokens
      return appSdk.getAuth(storeId)
    })

    .then(auth => {
      client = { appSdk, storeId, auth }
      return listAuthentications(client)
    })

    .then(({ response }) => {
      let { result } = response.data
      let promises = []
      result.forEach(authentication => {
        let notification = {}
        createNotification(client, authentication._id, notification)
      })
      return Promise.all(promises)
    })

    .then(() => {
      // all done
      respond('NOTIFY_SUCCESS')
    })

    .catch(err => {
      // cannot read app data
      // return error status code
      respond({}, null, 500, 'STORE_API_ERR', err.message)
    })
}

module.exports = {
  POST
}
