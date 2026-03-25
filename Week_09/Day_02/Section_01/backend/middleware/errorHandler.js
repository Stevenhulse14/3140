export function errorHandler(err, req, res, next) {
  // eslint-disable-next-line no-console
  console.error(err)
  const status = err.status || err.statusCode || 500
  const message =
    status === 500 ? 'Something went wrong' : err.message || 'Request failed'
  res.status(status).json({ error: message })
}
