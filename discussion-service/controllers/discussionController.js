const Discussion = require('../models/Discussion');
const User = require('../models/User');

// Create a new discussion
const createDiscussion = async (req, res) => {
   try {
      const { text, image, hashtags } = req.body;
      const newDiscussion = new Discussion({
         text,
         image,
         hashtags,
         createdBy: req.user.id,
         createdOn: new Date()
      });

      const savedDiscussion = await newDiscussion.save();
      res.status(201).json(savedDiscussion);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Update an existing discussion
const updateDiscussion = async (req, res) => {
   try {
      const { id } = req.params;
      const updatedDiscussion = await Discussion.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(updatedDiscussion);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Delete a discussion
const deleteDiscussion = async (req, res) => {
   try {
      const { id } = req.params;
      await Discussion.findByIdAndDelete(id);
      res.status(200).json({ message: 'Discussion deleted successfully' });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Get list of discussions by tags
const getDiscussionsByTags = async (req, res) => {
   try {
      const { tags } = req.query;
      const discussions = await Discussion.find({ hashtags: { $in: tags.split(',') } });
      res.status(200).json(discussions);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Get list of discussions by text
const getDiscussionsByText = async (req, res) => {
   try {
      const { text } = req.query;
      const discussions = await Discussion.find({ text: new RegExp(text, 'i') });
      res.status(200).json(discussions);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Comment on a discussion
const commentOnDiscussion = async (req, res) => {
   try {
      const { id } = req.params;
      const { text } = req.body;

      const discussion = await Discussion.findById(id);
      if (!discussion) {
         return res.status(404).json({ message: 'Discussion not found' });
      }

      discussion.comments.push({ text, createdBy: req.user.id, createdOn: new Date() });
      await discussion.save();

      res.status(201).json(discussion);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Like a discussion
const likeDiscussion = async (req, res) => {
   try {
      const { id } = req.params;

      const discussion = await Discussion.findById(id);
      if (!discussion) {
         return res.status(404).json({ message: 'Discussion not found' });
      }

      if (!discussion.likes.includes(req.user.id)) {
         discussion.likes.push(req.user.id);
         await discussion.save();
      }

      res.status(200).json(discussion);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// View a discussion
const viewDiscussion = async (req, res) => {
   try {
      const { id } = req.params;

      const discussion = await Discussion.findById(id);
      if (!discussion) {
         return res.status(404).json({ message: 'Discussion not found' });
      }

      discussion.views += 1;
      await discussion.save();

      res.status(200).json(discussion);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

module.exports = {
   createDiscussion,
   updateDiscussion,
   deleteDiscussion,
   getDiscussionsByTags,
   getDiscussionsByText,
   commentOnDiscussion,
   likeDiscussion,
   viewDiscussion
};

