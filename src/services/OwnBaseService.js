import axios from "axios";



const BaseService = axios.create({
  timeout: 60000,
  // baseURL: "https://dashboard-test-backend.herokuapp.com",   //... production
  baseURL: "http://localhost:4000"  //... development
});

export default BaseService;
