
const Joi = require('@hapi/joi')

const {
  Meals,
} = require('../../models')

const schema = Joi.object({
  _id: Joi.string().required(),
})

module.exports = async (req, res) => {
  const {
    body,
    logger,
  } = req

  try {
    logger.info('request to remove a meal has been made', body)

    Joi.assert(body, schema)
    const { _id } = body

    await Meals.findByIdAndRemove(_id)

    res.json({
      success: true,
      data: { _id },
    })
  } catch (e) {
    logger.info('request to remove a meal has failed')
    res.status(400).json({
      success: false,
      error: e,
      message: 'remove meal failed',
    })
  }
}
