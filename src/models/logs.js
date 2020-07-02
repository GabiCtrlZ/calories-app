const mongo = require('mongoose')

const { Schema } = mongo

const logsSchema = new Schema({
  date: String,
  user: {
    type: String,
    ref: 'user',
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: '7 days' },
  },
}, { timestamps: true })


module.exports = mongo.model('logs', logsSchema)
