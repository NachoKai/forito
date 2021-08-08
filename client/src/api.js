import axios from "axios"

const URL = "https://forito-app.herokuapp.com/posts"
// const URL = "http://localhost:5000/posts"

export const fetchPosts = () => axios.get(URL)
export const createPost = newPost => axios.post(URL, newPost)
export const updatePost = (id, updatedPost) => axios.patch(`${URL}/${id}`, updatedPost)
export const deletePost = id => axios.delete(`${URL}/${id}`)
export const likePost = id => axios.patch(`${URL}/${id}/likePost`)
