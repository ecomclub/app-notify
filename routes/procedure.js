'use strict'

const logger = require('console-files')
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
  logger.log(trigger)
  let client, apiEvent, skipAuthIds

  // get user notification options from E-Com Plus application data
  getConfig({ appSdk, storeId })

    .then(({ authentications }) => {
      // reset authentication IDs to be skiped
      skipAuthIds = []

      // handle trigger body first
      // https://developers.e-com.plus/docs/api/#/store/triggers/triggers
      // setup apiEvent object
      let { action, resource } = trigger
      apiEvent = {
        action,
        resource,
        resource_id: trigger.inserted_id || trigger.resource_id
      }
      if (!action || !resource || !apiEvent.resource_id) {
        // ignore current trigger
        // invalid procedure ?
        let err = new Error()
        err.name = SKIP_TRIGGER_NAME
        throw err
      }
      logger.log(apiEvent)

      if (authentications && Array.isArray(authentications)) {
        for (let i = 0; i < authentications.length; i++) {
          let admin = authentications[i]
          // admin => { _id, ignore_all, ignore_by_event }
          // admin.ignore_by_event = [ action, resource, resource_id ]
          let id = admin._id

          // check if notification must be skipped for current admin user
          if (id === trigger.authentication_id) {
            // event triggered by current admin user
            // convenien to ignore
            skipAuthIds.push(id)
          } else if (typeof admin === 'object' && admin !== null && skipAuthIds.indexOf(id) === -1) {
            if (admin.ignore_all === true) {
              // ignore all notifications for current admin user
              skipAuthIds.push(id)
            } else if (Array.isArray(admin.ignore_by_event)) {
              // check list of events to be ignored
              for (let i = 0; i < admin.ignore_by_event.length; i++) {
                let ignore = admin.ignore_by_event[i]
                if (typeof ignore === 'object' && ignore !== null &&
                ignore.action === action && ignore.resource === resource &&
                (!ignore.resource_id || ignore.resource_id === apiEvent.resource_id)) {
                  // configured to be ignored
                  skipAuthIds.push(id)
                  break
                }
              }
            }
          }
        }
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
          logger.log(id)
          promises.push(createNotification(client, id, {
            // event date and time ISO string
            datetime: trigger.datetime || new Date().toISOString(),
            content: {
              api_event: apiEvent
            }
          }))
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
        logger.error(err)
        // request to Store API with error response
        // return error status code
        respond({}, null, 500, ECHO_API_ERROR, err.message)
      }
    })
}

module.exports = {
  POST
}
