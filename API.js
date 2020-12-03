import axios from "axios";

export default {
  // Gets all posts
  getPosts: function () {
    return axios.get("/api/posts");
  },
  // Gets the post with the given id
  getPost: function (id) {
    return axios.get("/api/posts/" + id);
  },
  // Deletes the post with the given id
  deletePost: function (id) {
    return axios.delete("/api/posts/" + id);
  },
  // Saves a post to the database
  savePost: function (postData) {
    return axios.post("/api/posts", postData);
  },

  signUp: function (user) {
    return axios.post("/api/user", user);
  },
  getUser: function (username, password) {
    return axios.post("/api/user/login", { username, password });
  },
  updateUser: function (user) {
    return axios.put("/api/user", user);
  }
};
