const express = require('express');
const {
   createDiscussion,
   updateDiscussion,
   deleteDiscussion,
   getDiscussionsByTags,
   getDiscussionsByText,
   commentOnDiscussion,
   likeDiscussion,
   viewDiscussion,
} = require('../controllers/discussionController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createDiscussion);
router.put('/:id', protect, updateDiscussion);
router.delete('/:id', protect, deleteDiscussion);
router.get('/tags', getDiscussionsByTags);
router.get('/search', getDiscussionsByText);
router.post('/:id/comment', protect, commentOnDiscussion);
router.post('/:id/like', protect, likeDiscussion);
router.post('/:id/view', protect, viewDiscussion);

module.exports = router;
