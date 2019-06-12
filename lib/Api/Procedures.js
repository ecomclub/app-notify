'use strict'

// APP hostname and base URL path
const appBaseUri = process.env.APP_BASE_URI
// APP name to procedures titles
const appName = 'Admin Notifications'

module.exports = [
  {
    'title': appName,
    'triggers': [
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
        'resource': 'authentications',
        'method': 'POST'
      },
      {
        'resource': 'authentications',
        'method': 'DELETE'
      },
      {
        'resource': 'applications',
        'method': 'POST'
      },
      {
        'resource': 'applications',
        'method': 'DELETE'
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
