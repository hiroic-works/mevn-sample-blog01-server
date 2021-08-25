const router = require('express').Router();
const Post = require('../models/post.model');

// fetch all posts
router.get('/', async (req, res) => {
	try {
		const posts = await Post.find();
		res.status(200).json(posts);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// fetch single post
router.get('/:id', async (req, res) => {
	let id = req.params.id;
	try {
		const post = await Post.findById(id);
		res.status(200).json(post);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// create post
router.post('/', (req, res) => {
	res.send('Hello create');
});

// update post
router.put('/:id', (req, res) => {
	res.send('Hello update');
});

// delete posts
router.delete('/:id', (req, res) => {
	res.send('Hello delete');
});

module.exports = router;
