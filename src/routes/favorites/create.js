
const Joi = require('@hapi/joi')

const {
  Favorites,
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
    logger.info('request to create a favorite has been made', body)

    Joi.assert(body, favoriteSchema)

    const newFavorite = new Favorites({
      ...body,
      user: userId,
    })

    await newFavorite.save()

    res.json({
      success: true,
      data: newFavorite,
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
