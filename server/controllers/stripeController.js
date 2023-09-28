/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createStripeCustomer = async (email) => {
  const customer = await stripe.customers.create({
    email: email,
  });

  return customer;
};

export const cancelSubscription = async (req, res) => {
  try {
    const { subscriptionId } = req.body;

    const data = await stripe.subscriptions.cancel(subscriptionId);

    res
      .status(200)
      .json({ message: 'Subscription cancelled successfully', data: data });
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    res
      .status(500)
      .json({ message: 'An error occurred while cancelling the subscription' });
  }
};

export const getSubscriptionsByCustomerId = async (req, res) => {
  try {
    const subscriptions = await stripe.subscriptions.list({
      status: 'all',
    });

    const active = subscriptions.data.filter(
      (subscription) => subscription.status === 'active'
    );
    const canceled = subscriptions.data.filter(
      (subscription) => subscription.status === 'canceled'
    );

    // console.log(canceled);
    // const array = subscriptions.data.map((obj) => obj);
    res.status(200).json({ active: active, canceled: canceled });

    // console.log(array.items.data);
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
  }
};
