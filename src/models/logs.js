const mongo = require('mongoose')

const { Schema } = mongo

const logsSchema = new Schema({
  date: String,
  user: {
    type: String,
    ref: 'user',
  },
})


module.exports = mongo.model('logs', logsSchema)
