# Notifications

A server that manages push notifications for the UCL Assistant API.

## Database

Maps a list of UCL Unique Person Identifiers (UPIs) to Exponent notification
push tokens.

These can then be called on to push notifications to a user, if they have
notifications enabled. This data is stored in a PostgreSQL database, the login
details for which are provided by environment variables.

## API Endpoints

* `POST /register` - registers a user for notifications. Requires a `upi` and a
  `pushToken`, provided as JSON keys. Can be used to overwrite old entries too.

* `POST /upi/xxx/` - send a push notification to the specified UPI. Requires a
  JSON object as body, with `title`, `content`, and `type` parameters. Returns
  200 if notifcation sent, returns 404 if that user is not registered for
  notifications.

* `DELETE /upi/xxx/` - removes a user from the notifications system. Deletes the
  notification entry from the database entirely.
