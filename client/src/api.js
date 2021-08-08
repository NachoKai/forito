import axios from "axios"

const isDev = process.env.NODE_ENV !== "production"
const API = axios.create({
	baseURL: isDev ? "http://localhost:5000" : "https://forito-app.herokuapp.com",
})

API.interceptors.request.use(req => {
	if (localStorage.getItem("forito-profile")) {
		req.headers.authorization = `Bearer ${
			JSON.parse(localStorage.getItem("forito-profile")).token
		}`
	}

	return req
})

export const fetchPosts = () => API.get("/posts")
export const createPost = newPost => API.post("/posts", newPost)
export const likePost = id => API.patch(`/posts/${id}/likePost`)
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost)
export const deletePost = id => API.delete(`/posts/${id}`)

export const login = formData => API.post("/user/login", formData)
export const signup = formData => API.post("/user/signup", formData)
