const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
	post_id: {type:Schema.Types.ObjectId, required:[true, 'Missing post id.']},
	user: {type:String, min:1, max: 50, required:[true, 'Missing username.']},
	message: {type:String, min: 1, max:2048, required:[true, 'Missing message.']},
	date: {type:Date, required:[true, 'Missing date.']}
});

const Comment = mongoose.model('comments', CommentSchema);

module.exports = Comment;