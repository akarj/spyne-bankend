const User = require('../models/User');

exports.createUser = async (req, res) => {
   const { name, mobile, email, password } = req.body;
   try {
      const user = await User.create({ name, mobile, email, password });
      res.status(201).json(user);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

exports.updateUser = async (req, res) => {
   const { id } = req.params;
   const { name, mobile, email } = req.body;
   const updateObj = {};
   if (name) {
      updateObj.name = name;
   }
   if (mobile) {
      updateObj.mobile = mobile;
   }
   if (email) {
      updateObj.email = email;
   }


   try {
      const user = await User.findByIdAndUpdate(id, updateObj, { new: true });
      res.status(200).json(user);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

exports.deleteUser = async (req, res) => {
   const { id } = req.params;
   try {
      await User.findByIdAndDelete(id);
      res.status(200).json({ message: 'User deleted successfully' });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

exports.listUsers = async (req, res) => {
   try {
      const users = await User.find();
      res.status(200).json(users);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

exports.searchUser = async (req, res) => {
   const { name } = req.query;
   try {
      const users = await User.find({ name: new RegExp(name, 'i') });
      res.status(200).json(users);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

exports.followUser = async (req, res) => {
   const { id } = req.params;
   const { userId } = req.body;
   try {
      const user = await User.findById(id);
      const currentUser = await User.findById(userId);
      if (user && currentUser && !user.followers.includes(userId)) {
         user.followers.push(userId);
         currentUser.following.push(id);
         await user.save();
         await currentUser.save();
         res.status(200).json({ message: 'User followed successfully' });
      } else {
         res.status(400).json({ message: 'User already followed or invalid user' });
      }
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};
