const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const CategorieRoutes = require('./routes/categorieRoutes');
const PostRoutes = require('./routes/postRoutes');
const CommentRoutes = require('./routes/commentRoutes');
const TagRoutes = require('./routes/tagRoutes');

const PostModel = require('./models/post');

require('dotenv').config();

const port = process.env.PORT || 5000;

mongoose.connect(process.env.DB, { useNewUrlParser: true })
	.then(() => console.log('Database connected successfully'))
	.catch((err) => console.log(err));
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.use((err, req, res, next) => {
	console.log(err);
	next();
});

app.get('/api/search/', (req, res, next) => {
	PostModel.find(
		{ $text: { $search: req.query.query } },
		{ score: { $meta: "textScore" } })
		.sort({ score: { $meta: "textScore" } })
		.exec((err, results) => {
			if(!err) {
				res.status(200).send(results);
			}
			// console.log(`Results given for query "${req.query.query}"`)
			// results.map((value, index) => {
			// 	console.log(index + ' : ' + value.title);
			// });
		});
	// res.send({message: `Searching for "${req.query.query}"`});
});

app.use('/api/posts', PostRoutes);
app.use('/api/categories', CategorieRoutes);
app.use('/api/comments', CommentRoutes);
app.use('/api/tags', TagRoutes);

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});