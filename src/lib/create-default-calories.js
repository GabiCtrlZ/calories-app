const {
  Calories,
} = require('../models')

module.exports = async (userId) => {
  const newCalories = new Calories({
    protein: 0,
    carbs: 0,
    fat: 0,
    goalProtein: 115,
    goalCarbs: 280,
    goalFat: 60,
    user: userId,
  })

  await newCalories.save()

  return newCalories
}
