const router = require('express').Router();
const multer = require('multer');
const postsController = require('../controllers/posts.controller');

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
router.get('/', postsController.fetchAllPosts);

// fetch single post
router.get('/:id', postsController.fetchSinglePost);

// create post
router.post('/', upload.single('image'), postsController.createPost);

// update post
router.put('/:id', upload.single('image'), postsController.updatePost);

// delete posts
router.delete('/:id', postsController.deletePost);

module.exports = router;
