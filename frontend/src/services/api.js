import axios from "axios";

const api = axios.create({
  baseURL: "https://task-tracker-mern-4cel.onrender.com/api",
});

export default api;