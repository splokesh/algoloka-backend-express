const { Schema, model } = require('mongoose')
const {
  BROKER,
  EXCHANGE,
  ORDER_TYPES,
  PRODUCTS,
} = require('../constants/broker.constants')

const UserProfileSchema = new Schema(
  {
    user_id: { type: String, required: true },
    user_type: { type: String, required: true },
    avatar_url: { type: String, required: false },
    broker: { type: String, required: true, enum: Object.values(BROKER) },
    email: { type: String, required: true },
    user_shortname: { type: String, required: true },
    user_name: { type: String, required: true },
    exchanges: { type: [String], enum: Object.values(EXCHANGE) },
    products: { type: [String], enum: Object.values(PRODUCTS) },
    order_types: { type: [String], enum: Object.values(ORDER_TYPES) },
    api_key: { type: String, required: true },
    access_token: { type: String, required: true },
    public_token: { type: String, required: true },
    enctoken: { type: String, required: true },
    refresh_token: { type: String, required: false },
    login_time: { type: Date, required: true },
  },
  { timestamps: true }
)

UserProfileSchema.index({ user_id: 1, broker: 1 })
UserProfileSchema.index({ email: 1 })

const UserProfileModel = model('UserProfile', UserProfileSchema)

module.exports = { UserProfileModel }
