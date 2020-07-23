const Joi = require('@hapi/joi')

const {
  User,
} = require('../../models')

const userSchame = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
})

module.exports = async (req, res, next) => {
  const { logger } = req
  try {
    logger.info('request to create a new user has been made', req.body)

    Joi.assert(req.body, userSchame)

    const { email, password } = req.body

    logger.info('querying db to see if email exists')

    const isEmailTaken = await User.find({ email: email.toLowerCase() })

    if (isEmailTaken.length) {
      logger.info('email exists')
      return res.status(401).json({
        success: false,
        error: 'email is taken',
        message: 'email is taken',
      })
    }

    const newUser = new User({
      email,
    })

    await newUser.setPassword(password)
    await newUser.save()

    return next()
  } catch (e) {
    logger.info('request to create a user has failed')
    return res.status(400).json({
      success: false,
      error: e,
      message: 'create user failed',
    })
  }
}
