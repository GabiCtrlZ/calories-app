
const Joi = require('@hapi/joi')

const {
  Favorites,
} = require('../../models')

const favoriteSchema = Joi.object({
  _id: Joi.string().required(),
})

module.exports = async (req, res) => {
  const {
    body,
    logger,
  } = req

  try {
    logger.info('request to remove a favorite has been made', body)

    Joi.assert(body, favoriteSchema)
    const { _id } = body

    await Favorites.findByIdAndRemove(_id)

    res.json({
      success: true,
      data: { _id },
    })
  } catch (e) {
    logger.info('request to remove a favorite has failed')
    res.status(400).json({
      success: false,
      error: e,
      message: 'create remove failed',
    })
  }
}
