
const Joi = require('@hapi/joi')

const {
  Meals,
  Logs,
} = require('../../models')

const favoriteSchema = Joi.object({
  name: Joi.string().required(),
  protein: Joi.number(),
  carbs: Joi.number(),
  fat: Joi.number(),
})

module.exports = async (req, res) => {
  const {
    body,
    user,
    logger,
  } = req

  const { userId } = user

  try {
    logger.info('request to create a meal has been made', body)

    Joi.assert(body, favoriteSchema)

    const log = await Logs.findOne({ user: userId }).sort('-created_at')
    if (!log) {
      return res.json({
        success: true,
      })
    }

    await new Meals({
      ...body,
      log: log._id,
    }).save()

    res.json({
      success: true,
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
