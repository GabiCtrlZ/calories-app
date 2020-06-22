const mongo = require('mongoose')

const { Schema } = mongo

const calorieSchema = new Schema({
  protein: Number,
  carbs: Number,
  fat: Number,
  goalProtein: Number,
  goalCarbs: Number,
  goalFat: Number,
  user: {
    type: String,
    ref: 'user',
  },
})


module.exports = mongo.model('calories', calorieSchema)
