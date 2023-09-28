import express from 'express';
import {
  createSession,
  saveSubscriptionInDb,
} from '../controllers/subscriptionController.js';

const subscriptionRouter = express.Router();

subscriptionRouter
  .post('/create-checkout-session', createSession)
  .post('/webhook', saveSubscriptionInDb);

export default subscriptionRouter;
