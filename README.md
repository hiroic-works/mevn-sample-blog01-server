# mevn-sample-blog01

full stack MEVN(MongoDB Express Vue.js Node.js) sample project

## server

simple post REST API

※バリデーションなどなし、エラー処理なども最小限

### stack

- Express (Node.js framework)
- Mongoose (MongoDB ODM)
- multer (file upload)
- cors (cross origin)
- dotenv (use env)
- nodemon (Node.js live server)

### post model Schema

- title: String
- category: String
- content: String
- image: String (filename)
- createdAt: Date
- updatedAt: Date

※一旦必須項目なし

### post API

#### fetch all posts

`GET`: `/api/posts`

#### fetch post by id

`GET`: `/api/posts/:id`

#### create post

`POST`: `/api/posts`

#### update post

`PUT`: `/api/posts/:id`

※update 時、サーバー側でファイル関連の更新比較をするため、クライアント側では form の hidden で「old_image」キーとして現在反映中のファイル名をセットしてサーバーにリクエストさせるようにする。

#### delete post

`DELETE`: `/api/posts/:id`
