const Joi = require('@hapi/joi')

const {
  User,
} = require('../../models')

const userSchame = Joi.object({
  isLight: Joi.boolean().required(),
})

module.exports = async (req, res) => {
  const { logger, user } = req
  try {
    const { userId } = user
    logger.info('request to update user has been made', req.body)

    Joi.assert(req.body, userSchame)

    const { isLight } = req.body

    await User.updateOne({ _id: userId }, { isLight })

    res.json({
      success: true,
    })
  } catch (e) {
    logger.info('request to create a user has failed')
    res.status(400).json({
      success: false,
      error: e,
      message: 'create user failed',
    })
  }
}
