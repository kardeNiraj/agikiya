import express from 'express';
import {
  updateUser,
  getUser,
  deleteUser,
} from '../controllers/userController.js';
import { isAuthorized, login, signup } from '../controllers/authController.js';
import {
  getSubscriptionsByCustomerId,
  cancelSubscription,
} from '../controllers/stripeController.js';
import { saveSubscriptionInDb } from '../controllers/subscriptionController.js';

const userRouter = express.Router();

userRouter.post('/login', login);

// create new user in db
userRouter.route('/').post(signup);

userRouter.post('/cancel-subscription', cancelSubscription);

userRouter.get('/auth', isAuthorized);

userRouter
  .route('/subscriptions')
  .get(getSubscriptionsByCustomerId)
  .post(saveSubscriptionInDb);

userRouter.route('/:id').patch(updateUser).get(getUser).delete(deleteUser);

export default userRouter;
