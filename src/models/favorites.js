const mongo = require('mongoose')

const { Schema } = mongo

const favoriteSchema = new Schema({
  name: String,
  protein: Number,
  carbs: Number,
  fat: Number,
  user: {
    type: String,
    ref: 'user',
  },
})


module.exports = mongo.model('favorites', favoriteSchema)
