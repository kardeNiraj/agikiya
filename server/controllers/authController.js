/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import userModel from '../models/userModel.js';
import { createStripeCustomer } from '../controllers/stripeController.js';

import dotenv from 'dotenv';
dotenv.config();

export async function login(req, res) {
  try {
    const data = req.body;
    if (data.email) {
      const user = await userModel.findOne({ email: data.email });
      if (user) {
        if (user.password == data.password) {
          return res
            .status(200)
            .json({ message: 'User Logged in!', data: user });
        } else {
          return res.status(401).json({ message: 'Wrong Credentials!' });
        }
      } else {
        return res.status(404).json({ message: 'User not found!' });
      }
    } else {
      return res.status(400).json({ message: 'Empty field found!' });
    }
  } catch (err) {
    return res.json({ message: err.message });
  }
}

export async function signup(req, res) {
  try {
    const dataObj = req.body;
    const user = await userModel.create(dataObj);
    if (user) {
      const cus = await createStripeCustomer(user.email);
      user.stripeId = cus.id;
      await user.save();
      res.json({
        message: 'user signed up',
        data: user,
      });
    } else {
      res.json({ message: 'error while signup' });
    }
  } catch (err) {
    res.json({ message: err.message });
  }
}

export function isAuthorized() {
  return function (req, res, next) {
    // console.log(req);
    // console.log(role);
    // if (roles.includes(req.role) == true) {
    //   next();
    // } else {
    //   res.status(401).json({ message: 'operation not allowed' });
    // }
  };
  //   res.json({ message: 'is authorized gate encountered' });
}
