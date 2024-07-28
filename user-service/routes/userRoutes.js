const express = require('express');
const {
   createUser,
   updateUser,
   deleteUser,
   listUsers,
   searchUser,
   followUser,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// // router.post('/', protect, createUser);
router.patch('/:id', protect, updateUser);
router.delete('/:id', protect, deleteUser);
router.get('/', protect, listUsers);
router.get('/search', protect, searchUser);
router.post('/follow/:id', protect, followUser);

module.exports = router;
