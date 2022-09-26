const express = require('express');
const router = express.Router();

const SchemaType = require('../models/post');
const name = "post";

// Get posts
router.get('/', (req, res, next) => {
	SchemaType.find().then((data) => res.json(data)).catch((err) => {
		res.status(500).send({ message: err.message || `Failed to get all ${name}s.` });
	});
});

// Create post
router.put('/', (req, res, next) => {
	SchemaType.create(req.body).then((data) => res.json(data)).catch((err) => {
		res.status(500).send({ message: err.message || `Failed to create ${name}.` });
	});
});

// Get categorie posts
router.get('/cat/:id', (req, res, next) => {
	SchemaType.find({ categorie_id: req.params.id }).then((data) => {
		if (!data) {
			return res.status(404).send({ message: `Could not find a ${name} with the id: ${req.params.id}` });
		}
		res.json(data);
	}).catch((err) => {
		if (!err.kind === "ObjectId") {
			return res.status(404).send({ message: `Could not find a ${name} with the id: ${req.params.id}` });
		}
		return res.status(500).send({ message: `Could not retrieve a ${name} with the id: ${req.params.id}` });
	});
});

// Get specific post
router.get('/:id', (req, res, next) => {
	SchemaType.findOne({ _id: req.params.id }).then((data) => {
		if (!data) {
			return res.status(404).send({ message: `Could not find a ${name} with the id: ${req.params.id}` });
		}
		res.json(data);
	}).catch((err) => {
		if (!err.kind === "ObjectId") {
			return res.status(404).send({ message: `Could not find a ${name} with the id: ${req.params.id}` });
		}
		return res.status(500).send({ message: `Could not retrieve a ${name} with the id: ${req.params.id}` });
	});
});

// Update specific post
router.put('/:id', (req, res, next) => {
	SchemaType.findByIdAndUpdate(req.params.id, res.body, { new: true }).then((data) => {
		if (!data) {
			return res.status(404).send({ message: `Could not find a ${name} with the id: ${req.params.id}` });
		}
		res.json(data)
	}).catch((err) => {
		if (!err.kind === "ObjectId") {
			return res.status(404).send({ message: `Could not find a ${name} with the id: ${req.params.id}` });
		}
		return res.status(500).send({ message: `Could not update a ${name} with the id: ${req.params.id}` });
	});
});

// Delete specific post
router.delete('/:id', (req, res, next) => {
	SchemaType.findByIdAndRemove(req.params.id).then((data) => {
		if (!data) {
			return res.status(404).send({ message: `Could not find a ${name} with the id: ${req.params.id}` });
		}
		res.json(data)
	}).catch((err) => {
		if (!err.kind === "ObjectId") {
			return res.status(404).send({ message: `Could not find a ${name} with the id: ${req.params.id}` });
		}
		return res.status(500).send({ message: `Could not delete a ${name} with the id: ${req.params.id}` });
	});
});

// Vote for a specific post
router.put('/vote/:id', (req, res, next) => {
	SchemaType.findByIdAndUpdate(req.params.id, {$inc: {"votes": 1}}).then((data) => {
		return res.status(200).send({message: 'Complete.'});
	}).catch((err) => {
		console.log(err);
		if (!err.kind === "ObjectId") {
			return res.status(404).send({ message: `Could not find a ${name} with the id: ${req.params.id}` });
		}
		return res.status(500).send({ message: `Could not update a ${name} with the id: ${req.params.id}` });
	});
});

module.exports = router;