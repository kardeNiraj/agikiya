import planModel from '../models/planModel.js';

export const createPlan = async (req, res) => {
  try {
    const planData = req.body;
    console.log(planData);
    const data = await planModel.create(planData);
    console.log(data);
    res.status(200).json({ message: 'plan created successfuly', data: data });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updatePlan = async (req, res) => {
  try {
    const id = req.params.id;
    const plan = await planModel.findById(id);
    if (plan) {
      const newData = req.body;
      let keys = [];
      for (let key in newData) {
        keys.push(key);
      }
      for (let key of keys) {
        plan[key] = newData[key];
      }
      await plan.save();
      res.json({ message: 'plan updated successfully', data: plan });
    } else res.json({ message: 'no such plan found' });
  } catch (err) {
    res.json({ message: err.message });
  }
};

export const getAllPlans = async (req, res) => {
  try {
    const plans = await planModel.find();
    if (plans) {
      res.json({ message: 'plans retreived', data: plans });
    } else res.json({ message: 'no plans found' });
  } catch (err) {
    res.json({ message: err.message });
  }
};

export const getPlan = async (req, res) => {
  try {
    const id = req.params.id;
    const plan = await planModel.findById(id);
    if (plan) {
      res.json({ message: 'plan retreived', data: plan });
    } else res.json({ message: 'no such plan found' });
  } catch (err) {
    res.json({ message: err.message });
  }
};

export const deletePlan = async (req, res) => {
  try {
    const id = req.params.id;
    const plan = await planModel.findByIdAndDelete(id);
    if (plan) {
      res.json({ message: 'plan deleted', data: plan });
    } else res.json({ message: 'no plan existed' });
  } catch (err) {
    res.json({ message: err.message });
  }
};
