const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const Post = require('../models/post.model');

// ファイルアップロード設定
let storage = multer.diskStorage({
	// ファイル保存先
	destination: (req, file, cb) => {
		cb(null, './uploads');
	},
	filename: (req, file, cb) => {
		cb(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
	},
});
// 初期化。
const upload = multer({ storage });

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
router.post('/', upload.single('image'), async (req, res) => {
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
});

// update post
router.put('/:id', upload.single('image'), async (req, res) => {
	let id = req.params.id;
	let updateFilename = '';
	if (!req.file) {
		updateFilename = req.body.old_filename;
	} else {
		updateFilename = req.file.filename;
		try {
			fs.unlinkSync(`./uploads/${req.body.old_filename}`);
		} catch (err) {
			return res.status(400).json({ message: 'directory not deleted.' });
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
});

// delete posts
router.delete('/:id', (req, res) => {
	res.send('Hello delete');
});

module.exports = router;
