module.exports = ({ app, exit, port, host, log, startMessage }) => () => {
  try {
    app.listen(port, host)
    log.info(startMessage, `${host}:${port}`)
  } catch (error) {
    log.error(error)
    exit()
  }
}
