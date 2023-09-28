import express from 'express';
import {
  createPlan,
  deletePlan,
  getAllPlans,
  getPlan,
  updatePlan,
} from '../controllers/planController.js';
import { isAuthorized } from '../controllers/authController.js';

const planRouter = express.Router();

planRouter.get('/all', getAllPlans);

planRouter.get('/:id', getPlan);

// the user should be an admin
planRouter.use(isAuthorized(['admin']));

planRouter.post('/', createPlan);

planRouter.route('/:id').patch(updatePlan).delete(deletePlan);

export default planRouter;
