require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const postRouter = require('./router/posts');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/posts', postRouter);

app.listen(port, () => console.log(`Server started http://localhost:${port}`));
