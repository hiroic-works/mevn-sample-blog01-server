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
		try {
			const post = new Post({
				title: req.body.title,
				category: req.body.category,
				content: req.body.content,
				image: req.file.filename,
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
		if (!req.file) {
			updateFilename = req.body.old_filename;
		} else {
			updateFilename = req.file.filename;
			try {
				fs.unlinkSync(`./uploads/${req.body.old_filename}`);
			} catch (err) {
				console.log('fs.unlinkSync error', err);
			}
		}
		try {
			await Post.findByIdAndUpdate(id, {
				title: req.body.title,
				category: req.body.category,
				content: req.body.content,
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
