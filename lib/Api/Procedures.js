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
        'resource': 'orders',
        'action': 'create'
      },
      {
        'resource': 'orders',
        'action': 'change',
        'field': 'financial_status'
      },
      {
        'resource': 'orders',
        'action': 'change',
        'field': 'fulfillment_status'
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
