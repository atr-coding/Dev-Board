const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Board = new Schema ({
	id: Schema.Types.ObjectId,
	name: {type:String, min: 1, max:20}
});

const CategorieSchema = new Schema({
	name: {type:String, min: 1, max: 20, required:[true, 'Categorie must have a name']},
	boards: [Board],
});

const Categorie = mongoose.model('categories', CategorieSchema);

module.exports = Categorie;