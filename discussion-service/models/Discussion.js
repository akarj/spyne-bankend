const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
   text: { type: String, required: true },
   createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
   createdOn: { type: Date, default: Date.now },
   likes: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const DiscussionSchema = new Schema({
   text: { type: String, required: true },
   image: { type: String },
   hashtags: [{ type: String }],
   createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
   createdOn: { type: Date, default: Date.now },
   comments: [CommentSchema],
   likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
   views: { type: Number, default: 0 }
});

module.exports = mongoose.model('Discussion', DiscussionSchema);
