import axios from "axios";
const instance = axios.create({
  baseURL: 'http://localhost:5084/api',
});
export default instance;
