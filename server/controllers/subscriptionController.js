/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import Stripe from 'stripe';
import dotenv from 'dotenv';

// models
import userModel from '../models/userModel.js';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createSession = async (req, res) => {
  const plan = req.body;
  const encodedData = encodeURIComponent(JSON.stringify(plan));
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'inr',
          product_data: {
            name: plan.name,
          },
          unit_amount: plan.price * 100,
          recurring: {
            interval: plan.option,
          },
        },
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `http://localhost:5173/success?data=${encodedData}`,
    cancel_url: `http://localhost:5173/cancel`,
  });
  res.json({ id: session.id });
};

export const saveSubscriptionInDb = async (req, res) => {
  try {
    const { userId, planId } = req.body;
    const user = await userModel.findById(userId).exec();
    if (user) {
      user.subscribedPlans.push(planId);
      await user.save();
    } else res.json({ message: 'no user found' });
  } catch (err) {
    res.json({ message: err.message });
  }
};
