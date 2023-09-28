/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(function (db) {
    console.log('plan db connected');
  })
  .catch(function (err) {
    console.log(err);
  });

const planSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: [true, 'plan price is required'],
  },
  img_url: {
    type: String,
    default:
      'https://information-science-engineering.newhorizoncollegeofengineering.in/wp-content/uploads/2020/01/default_image_01.png',
  },
});

const planModel = mongoose.model('planModel', planSchema);
export default planModel;

// (async function createPlan() {
//   try {
//     const plan = [
//       {
//         name: 'personal trainer in gym',
//         description:
//           'trainer will take care of your routine and your personal goals, hire him at the lowest cost here',
//         price: 5000,
//       },
//       {
//         name: 'super saver',
//         description: 'the best deals do not stop for you, they come and go',
//         price: 1000,
//         img_url:
//           'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.facebook.com%2Fdealsforal%2F&psig=AOvVaw2QQ1GKCij1MvwkPc4mfEnh&ust=1695421238245000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCMDmhLfevIEDFQAAAAAdAAAAABAE',
//       },
//       {
//         name: 'pre workout',
//         description:
//           'the best out there preworkot. take it and fly with the weights',
//         price: 10000,
//       },
//     ];
//     const data = planModel.create(plan);
//     if (data) console.log('plan created');
//     else console.log('error while creating plan');
//   } catch (err) {
//     console.log(err);
//   }
// })();
