require("dotenv").config();
const { sequelize } = require("../server/Util/database");

const { User } = require("./models/user");
const { Post } = require("./models/post");

const express = require("express");
const cors = require("cors");

const { SERVER_PORT } = process.env;
const {
  getAllPosts,
  getCurrentUserPosts,
  addPost,
  editPost,
  deletePost,
} = require("./controllers/post");

const { register, login } = require("./controllers/auth");

const { isAuthenticated } = require("./middleware/isAuthenticated");

const app = express();

app.use(express.json());
app.use(cors());

User.hasMany(Post);
Post.belongsTo(User);

app.post("/register", register);
app.post("/login", login);

app.get("/userposts/:userId", getCurrentUserPosts);

app.get("/posts", getAllPosts);
app.post("/posts", isAuthenticated, addPost);
app.put("/posts/:id", isAuthenticated, editPost);
app.delete("/posts/:id", isAuthenticated, deletePost);

sequelize
  .sync()
  // .sync({ force: true })
  .then(() => {
    app.listen(SERVER_PORT, () =>
      console.log(`Server is running on port ${SERVER_PORT}`)
    );
  })
  .catch((err) => console.log(err));
