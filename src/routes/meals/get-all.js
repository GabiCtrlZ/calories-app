
const Joi = require('@hapi/joi')

const {
  Meals,
} = require('../../models')

const favoriteSchema = Joi.object({
  logId: Joi.string().required(),
})

module.exports = async (req, res) => {
  const {
    body,
    logger,
  } = req

  const { logId } = body

  try {
    logger.info('request to get meals has been made', body)

    Joi.assert(body, favoriteSchema)

    const meals = await Meals.find({
      log: logId,
    }, { __v: 0, log: 0 })

    res.json({
      success: true,
      data: meals,
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
