# app-notify

E-Com Plus app to handle admin notifications

## Environment variables sample

Variable              | Value
---                   | ---
`LOGGER_OUTPUT`       | `~/app/log/logger.out`
`LOGGER_ERRORS`       | `~/app/log/logger.err`
`LOGGER_FATAL_ERRORS` | `~/app/log/_stderr`
`PROXY_PORT`          | `3000`
`PROXY_AUTH`          | `auth_token`
`ECOM_AUTH_DB`        | `~/app/db.sqlite`
`APP_BASE_URI`        | `https://app.ecomplus.biz/api/v1`

## Production server

Published at https://notify.ecomplus.biz

### Continuous deployment

When app version is **production ready**,
[create a new release](https://github.com/ecomclub/app-notify/releases)
to run automatic deploy from `master` branch.
