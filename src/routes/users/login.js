const {
  Favorites,
  Calories,
  User,
  Logs,
} = require('../../models')

const createDefaultCalories = require('../../lib/create-default-calories')

module.exports = async (req, res) => {
  const { logger, user } = req
  try {
    const { userId } = user
    logger.info('getting user data')

    let calories = await Calories.findOne({ user: userId }, { __v: 0, user: 0 })
    if (!calories) calories = await createDefaultCalories(userId)
    const favorites = await Favorites.find({ user: userId }, { __v: 0, user: 0 })
    const logs = await Logs.find({ user: userId }, { __v: 0, user: 0 }, { sort: '-createdAt' })
    const userData = await User.findOne({ _id: userId }, { isLight: 1 })

    return res.json({
      success: true,
      data: {
        calories,
        favorites,
        logs,
        isLight: userData.isLight,
      },
    })
  } catch (e) {
    logger.info('error with login route', { message: e.toString() })

    return res.status(500).json({
      success: false,
      message: e,
    })
  }
}
