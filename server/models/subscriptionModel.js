/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(function (db) {
    console.log('subscription db connected');
  })
  .catch(function (err) {
    console.log(err);
  });

const subscriptionSchama = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userModel',
    required: [true, 'subscription must have an user'],
  },
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'planModel',
    required: [true, 'subscription must be taken for a plan'],
  },
  stripeSubscriptionId: {
    type: String,
    required: true,
  },
});

const subscriptionModel = mongoose.model(
  'subscriptionModel',
  subscriptionSchama
);
export default subscriptionModel;
