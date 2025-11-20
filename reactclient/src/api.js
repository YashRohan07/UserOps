import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5041", 
});

// Fetch all users
export const fetchUsers = () => API.get("/Users/fetch-users");

// Create a single user
export const createUser = (data) =>
    API.post("/Users/create-user", data);
