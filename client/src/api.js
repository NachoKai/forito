import axios from "axios"
import { getUser } from "./utils/getUser"

const isDev = process.env.NODE_ENV !== "production"
const API = axios.create({
	baseURL: isDev ? "http://localhost:5000" : "https://forito-app.herokuapp.com",
})

API.interceptors.request.use(req => {
	if (localStorage.getItem("forito-profile")) {
		req.headers.authorization = `Bearer ${getUser().token}`
	}

	return req
})

/* ==========  POSTS  ========== */

export const fetchPost = id => API.get(`/posts/${id}`)
export const fetchPosts = page => API.get(`/posts?page=${page}`)
export const fetchPostsBySearch = searchQuery =>
	API.get(
		`/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${searchQuery.tags}`
	)
export const fetchPostsByCreator = name => API.get(`/posts/creator?name=${name}`)
export const createPost = newPost => API.post("/posts", newPost)
export const likePost = id => API.patch(`/posts/${id}/likePost`)
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost)
export const deletePost = id => API.delete(`/posts/${id}`)
export const addComment = (value, id) => API.post(`/posts/${id}/commentPost`, { value })

/* ==========  USER  ========== */

export const login = formData => API.post("/user/login", formData)
export const signup = formData => API.post("/user/signup", formData)
