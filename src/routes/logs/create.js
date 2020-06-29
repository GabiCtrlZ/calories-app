const {
  Logs,
} = require('../../models')

module.exports = async (req, res) => {
  const {
    body,
    user,
    logger,
  } = req

  const { userId } = user

  try {
    logger.info('request to create a log has been made', body)

    const newLog = await new Logs({
      date: new Date(),
      user: userId,
    }).save()

    res.json({
      success: true,
      data: newLog,
    })
  } catch (e) {
    logger.info('request to create a favorite has failed')
    res.status(400).json({
      success: false,
      error: e,
      message: 'create favorite failed',
    })
  }
}
