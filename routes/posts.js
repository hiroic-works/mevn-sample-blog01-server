const router = require('express').Router();

// fetch all posts
router.get('/', (req, res) => {
	res.send('Hello get all');
});

// fetch single posts
router.get('/:id', (req, res) => {
	res.send('Hello get single');
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
