import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export default {
  getPosts: async () => {
    let { data: json } = await api.get(`/posts`);
    return json;
  },

  getSinglePost: async (id) => {
    let { data: json } = await api.get(`post/${id}`);
    return json;
  },

  getCategories: async () => {
    let { data: json } = await api.get(`categories`);
    return json;
  },

  getSingleCategory: async (cat) => {
    let { data: json } = await api.get(`categorie/${cat}`);
    return json;
  },
};
