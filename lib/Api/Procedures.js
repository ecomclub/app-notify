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
        'action': 'create'
      },
      {
        'resource': 'authentications',
        'action': 'delete'
      },
      {
        'resource': 'applications',
        'action': 'create'
      },
      {
        'resource': 'applications',
        'action': 'delete'
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
