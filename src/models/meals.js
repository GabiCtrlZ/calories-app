const mongo = require('mongoose')

const { Schema } = mongo

const mealsSchema = new Schema({
  name: String,
  protein: Number,
  carbs: Number,
  fat: Number,
  log: {
    type: String,
    ref: 'logs',
  },
})


module.exports = mongo.model('meals', mealsSchema)
