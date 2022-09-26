const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TagSchema = new Schema ({
	name: {type:String, min: 1, max:20},
	color: {type:String, min:4, max:7}
});

const Tag = mongoose.model('tag', TagSchema);

module.exports = Tag;