import axios from "axios";


const baseURL =
  process.env.REACT_APP_NODE_ENV === "dev"
    ? "http://localhost:4000"
    : "https://dashboard-test-backend.herokuapp.com";
const BaseService = axios.create({
  timeout: 60000,
  baseURL: baseURL,
});

export default BaseService;
