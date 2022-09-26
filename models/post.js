const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
	categorie_id: {type:Schema.Types.ObjectId, required:[true, 'Missing categorie id.']},
	title: {type:String, min: 1, max:256, required:[true, 'Missing title.']},
	status: {type:String, required:[true, 'Missing status.']},
	votes: {type:Number, required:[true, 'Missing vote count.']},
	date: {type:Date, required:[true, 'Missing date']}
});

const Post = mongoose.model('posts', PostSchema);

module.exports = Post;