const Joi = require('joi');
const fs = require('fs');
const Post = require('../models/post.model');

const posts = {
	fetchAllPosts: async (req, res) => {
		try {
			const posts = await Post.find();
			res.status(200).json(posts);
		} catch (err) {
			res.status(400).json({ message: err.message });
		}
	},
	fetchSinglePost: async (req, res) => {
		let id = req.params.id;
		try {
			const post = await Post.findById(id);
			res.status(200).json(post);
		} catch (err) {
			res.status(400).json({ message: err.message });
		}
	},
	createPost: async (req, res) => {
		if (!req.file) {
			return res.status(400).json({ message: 'file upload not found' });
		}

		const PostSchema = Joi.object().keys({
			title: Joi.string().required(),
			category: Joi.string().required(),
			content: Joi.string().required(),
			image: Joi.string().required(),
		});

		const payload = {
			title: req.body.title,
			category: req.body.category,
			content: req.body.content,
			image: req.file.filename,
		};
		const { error, value } = PostSchema.validate(payload, { abortEarly: false });

		if (error) {
			fs.unlinkSync(`./uploads/${payload.image}`);
			return res.status(400).json({ message: 'request validation error.', details: error.details });
		}

		try {
			const post = new Post({
				title: payload.title,
				category: payload.category,
				content: payload.content,
				image: payload.filename,
			});
			await post.save();
			res.status(201).json({ message: 'post created.' });
		} catch (err) {
			res.status(400).json({ message: err.message });
		}
	},
	updatePost: async (req, res) => {
		let id = req.params.id;
		let updateFilename = '';

		const PostSchema = Joi.object().keys({
			title: Joi.string().required(),
			category: Joi.string().required(),
			content: Joi.string().required(),
			old_filename: Joi.string().required(),
		});

		const payload = {
			title: req.body.title,
			category: req.body.category,
			content: req.body.content,
			old_filename: req.body.old_filename,
		};
		const { error, value } = PostSchema.validate(payload, { abortEarly: false });

		if (error) {
			return res.status(400).json({ message: 'request validation error.', details: error.details });
		}

		if (!req.file) {
			updateFilename = payload.old_filename;
		} else {
			updateFilename = req.file.filename;
			try {
				fs.unlinkSync(`./uploads/${payload.old_filename}`);
			} catch (err) {
				console.log('fs.unlinkSync error', err);
			}
		}
		try {
			await Post.findByIdAndUpdate(id, {
				title: payload.title,
				category: payload.category,
				content: payload.content,
				image: updateFilename,
			});
			res.status(200).json({ message: 'post updated.' });
		} catch (err) {
			res.status(400).json({ message: err.message });
		}
	},
	deletePost: async (req, res) => {
		let id = req.params.id;
		try {
			const post = await Post.findByIdAndDelete(id);
			if (post.image) {
				try {
					fs.unlinkSync(`./uploads/${post.image}`);
				} catch (err) {
					console.log('fs.unlinkSync error', err);
				}
			}
			res.status(200).json({ message: 'post deleted.' });
		} catch (err) {
			res.status(400).json({ message: err.message });
		}
	},
};

module.exports = posts;
