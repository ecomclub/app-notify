'use strict'

// read configured E-Com Plus app data
const getConfig = require('./../lib/Api/GetConfig')
// get all admin users from Store API
const listAuthentications = require('./../lib/Api/ListAuthentications')
// create new notification for each admin user
const createNotification = require('./../lib/Api/CreateNotification')

const SKIP_TRIGGER_NAME = 'SkipTrigger'
const ECHO_SUCCESS = 'NOTIFY_SUCCESS'
const ECHO_SKIP = 'NOTIFY_SKIP'
const ECHO_API_ERROR = 'STORE_API_ERR'

const POST = (id, meta, trigger, respond, storeId, appSdk) => {
  let client, notification, skipAuthIds

  // get user notification options from E-Com Plus application data
  getConfig({ appSdk, storeId })

    .then(({ authentications }) => {
      // reset authentication IDs to be skiped
      skipAuthIds = []
      let skipAll

      // handle trigger body first
      // https://developers.e-com.plus/docs/api/#/store/triggers/triggers
      // setup notification object
      let { action, resource } = trigger
      if (!action || !resource) {
        // ignore current trigger
        skipAll = true
      } else {
        notification = {
          action,
          resource,
          resource_id: trigger.inserted_id || trigger.resource_id
        }
        if (!notification.resource_id) {
          // invalid procedure ?
          skipAll = true
        }
      }

      if (!skipAll && authentications && Array.isArray(authentications)) {
        // preset skip all
        skipAll = true
        for (let i = 0; i < authentications.length; i++) {
          let admin = authentications[i]
          // admin => { _id, ignore_all, ignore_by_event }
          // admin.ignore_by_event = [ action, resource, resource_id ]

          // check if notification must be skipped for current admin user
          let id = admin._id
          if (typeof admin === 'object' && admin !== null && skipAuthIds.indexOf(id) === -1) {
            if (admin.ignore_all === true) {
              skipAuthIds.push(admin._id)
            } else if (Array.isArray(admin.ignore_by_event)) {
              for (let i = 0; i < admin.ignore_by_event.length; i++) {
              }
            }
          } else if (skipAll === true) {
            // must create notification(s)
            // unset skip all
            skipAll = false
          }
        }
      }

      if (skipAll) {
        let err = new Error()
        err.name = SKIP_TRIGGER_NAME
        throw err
      }
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
        let id = authentication._id
        if (skipAuthIds.indexOf(id) === -1) {
          // create notification for current admin user
          promises.push(createNotification(client, id, notification))
        }
      })
      return Promise.all(promises)
    })

    .then(() => {
      // all done
      respond(ECHO_SUCCESS)
    })

    .catch(err => {
      if (err.name === SKIP_TRIGGER_NAME) {
        // trigger ignored by app configuration
        respond(ECHO_SKIP)
      } else {
        // request to Store API with error response
        // return error status code
        respond({}, null, 500, ECHO_API_ERROR, err.message)
      }
    })
}

module.exports = {
  POST
}
