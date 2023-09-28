import userModel from '../models/userModel.js';

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findById(id);
    const dataToUpdate = req.body;
    if (user) {
      let keys = [];
      for (let key in dataToUpdate) {
        keys.push(key);
      }

      for (let i = 0; i < keys.length; i++) {
        user[keys[i]] = dataToUpdate[keys[i]];
      }

      await user.save();
      res.json({ message: 'user data updated' });
    } else {
      res.json({ message: 'User not found' });
    }
  } catch (err) {
    res.json({ message: err.message });
  }
};

export const getUser = async (req, res) => {
  const id = req.id;
  let user = await userModel.findById(id);
  if (user) {
    return res.json({ message: 'user found', data: user });
  } else return res.json({ message: 'No such user found' });
};

export const getAllUsers = async (req, res) => {
  const users = await userModel.find();
  try {
    if (users) res.json({ message: 'users retreived', data: users });
    else res.json({ message: 'no users registered' });
  } catch (err) {
    res.json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findByIdAndDelete(id);
    if (!user) res.json({ message: 'user not found' });
    res.json({ message: 'user deleted', data: user });
  } catch (err) {
    res.json({ message: err.message });
  }
};
