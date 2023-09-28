/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import mongoose from 'mongoose';
import emailValidator from 'email-validator';

import dotenv from 'dotenv';
dotenv.config();

await mongoose
  .connect(process.env.MONGO_URI)
  .then(function (db) {
    console.log('user db connected');
  })
  .catch(function (err) {
    console.log(err);
  });

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: function () {
      return emailValidator.validate(this.email);
    },
  },
  stripeId: {
    type: String,
    default: '',
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  confirmPassword: {
    type: String,
    minLength: 8,
    validate: function () {
      return this.confirmPassword == this.password;
    },
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  subscribedPlans: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'planModel',
    },
  ],
});

userSchema.pre('save', function () {
  this.confirmPassword = undefined;
});

const userModel = mongoose.model('userModel', userSchema);
export default userModel;

// (async function createUser() {
//   try {
//     const user = {
//       name: 'dummy',
//       email: 'dymmy@gmail.com',
//       password: '01010101',
//       confirmPassword: '01010101',
//     };
//     const data = await userModel.create(user);
//     if (data) console.log('data inserted');
//     if (data) console.log(data);
//   } catch (err) {
//     console.log(err);
//   }
// })();
