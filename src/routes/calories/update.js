
const Joi = require('@hapi/joi')

const {
  Calories,
} = require('../../models')

const caloriesSchema = Joi.object()

module.exports = async (req, res) => {
  const {
    body,
    user,
    logger,
  } = req
  const { userId } = user

  try {
    logger.info('request to update calories has been made', body)

    Joi.assert(body, caloriesSchema)

    await Calories.findOneAndUpdate({ user: userId }, { ...body })
    const calories = await Calories.findOne({ user: userId })

    res.json({
      success: true,
      data: calories,
    })
  } catch (e) {
    logger.info('request to update calories has failed')
    res.status(400).json({
      success: false,
      error: e,
      message: 'update calories failed',
    })
  }
}
