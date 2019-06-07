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
        'resource': 'authentications',
        'subresource': null
      },
      {
        'resource': 'products',
        'subresource': null
      },
      {
        'resource': 'customers',
        'subresource': null
      },
      {
        'resource': 'carts',
        'subresource': null
      },
      {
        'resource': 'orders',
        'subresource': null
      },
      {
        'resource': 'applications',
        'subresource': null
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
