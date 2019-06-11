'use strict'

// APP hostname and base URL path
const appBaseUri = process.env.APP_BASE_URI
// APP name to procedures titles
const appName = 'Admin Notifications'

module.exports = [
  {
    'title': appName,
    'triggers': [
      {
        'resource': 'authentications'
      },
      /*
      {
        'resource': 'products'
      },
      {
        'resource': 'customers'
      },
      {
        'resource': 'carts'
      },
      */
      {
        'resource': 'orders'
      },
      {
        'resource': 'applications'
      }
    ],
    'webhooks': [
      {
        'api': {
          'external_api': {
            'uri': appBaseUri + '/procedure.json'
          }
        },
        'method': 'POST'
      }
    ]
  }
]
