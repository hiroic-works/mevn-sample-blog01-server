require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const postRouter = require('./routes/posts');
const port = process.env.PORT || 5000;
const db = mongoose.connection;

// DB接続
mongoose.connect(process.env.DB_URI, {
	useNewUrlParser: true,
});
db.on('error', console.error.bind(console, 'mongo connect error... '));
db.once('open', () => {
	console.log('DB connected...');
});

// ミドルウェア
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ルーティング
app.use('/api/posts', postRouter);

// 接続
app.listen(port, () => console.log(`Server started http://localhost:${port}`));
