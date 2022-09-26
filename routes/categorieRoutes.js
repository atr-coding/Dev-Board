const express = require('express');
const router = express.Router();

const SchemaType = require('../models/categorie');
const name = "categorie";

router.get('/', (req, res, next) => {
	SchemaType.find().then((data) => res.json(data)).catch((err) => {
		res.status(500).send({ message: err.message || `Failed to get all ${name}s.` });
	});
});

router.post('/', (req, res, next) => {
	SchemaType.create(req.body).then((data) => res.json(data)).catch((err) => {
		res.status(500).send({ message: err.message || `Failed to create ${name}.` });
	});
});

router.get('/:id', (req, res, next) => {
	SchemaType.findById(req.params.id).then((data) => {
		if (!data) {
			return res.status(404).send({ message: `Could not find a ${name} with the id: ${req.params.id}` });
		}
		res.json(data)
	}).catch((err) => {
		if (!err.kind === "ObjectId") {
			return res.status(404).send({ message: `Could not find a ${name} with the id: ${req.params.id}` });
		}
		return res.status(500).send({ message: `Could not retrieve a ${name} with the id: ${req.params.id}` });
	});
});

router.post('/:id', (req, res, next) => {
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

router.get('/delete/:id', (req, res, next) => {
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

module.exports = router;