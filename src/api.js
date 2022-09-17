import axios from 'axios'

import { isDev } from './utils/checkIsDev.ts'
import { getUserLocalStorage } from './utils/getUserLocalStorage.ts'

const API = axios.create({
	baseURL: isDev ? 'http://localhost:5000' : 'https://forito-server.onrender.com',
	timeout: 5_000,
})

API.interceptors.request.use(req => {
	if (localStorage.getItem('forito-profile')) {
		req.headers.authorization = `Bearer ${getUserLocalStorage().token}`
	}

	return req
})

/* ==========  POSTS  ========== */

export const fetchAllPosts = () => API.get(`/posts/top`)
export const fetchPost = id => API.get(`/posts/${id}`)
export const fetchPosts = page => API.get(`/posts?page=${page}`)
export const fetchPostsBySearch = searchQuery =>
	API.get(
		`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`
	)
export const fetchPostsByCreator = id => API.get(`/posts/creator?id=${id}`)
export const fetchSavedPosts = id => API.get(`/posts/saved?id=${id}`)
export const createPost = newPost => API.post('/posts', newPost)
export const likePost = id => API.patch(`/posts/${id}/likePost`)
export const savePost = id => API.patch(`/posts/${id}/savePost`)
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost)
export const deletePost = id => API.delete(`/posts/${id}`)
export const addComment = (value, id) => API.post(`/posts/${id}/commentPost`, { value })

/* ==========  USER  ========== */

export const login = formData => API.post('/user/login', formData)
export const signup = formData => API.post('/user/signup', formData)
export const fetchUser = id => API.get(`/user/${id}`)
