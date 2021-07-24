module.exports = ({ bunyan, environment, level, name }) =>
  bunyan.createLogger({
    name,
    level,
    environment,
    serializers: bunyan.stdSerializers
  })
