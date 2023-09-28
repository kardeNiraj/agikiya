/* eslint-disable no-undef */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// ROUTERS
import userRouter from './routers/userRouter.js';
import planRouter from './routers/planRouter.js';
import subscriptionRouter from './routers/subscriptionRouter.js';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`server started at port ${port}`);
});

app.use('/user', userRouter);
app.use('/plan', planRouter);
app.use('/subscribe', subscriptionRouter);
