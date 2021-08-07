import { createSelector } from "reselect"

import * as api from "../api"

/* ==========  CONSTANTS  =========== */

const FETCH_ALL_POSTS = "FETCH_ALL_POSTS"
const CREATE_POST = "CREATE_POST"
const UPDATE_POST = "UPDATE_POST"
const DELETE_POST = "DELETE_POST"
const LIKE_POST = "LIKE_POST"

/* ==========  ACTIONS  =========== */

export const getPosts = () => async dispatch => {
	try {
		const { data } = await api.fetchPosts()

		dispatch({ type: FETCH_ALL_POSTS, payload: data })
	} catch (err) {
		console.error(err)
	}
}

export const createPost = post => async dispatch => {
	try {
		const { data } = await api.createPost(post)

		dispatch({ type: CREATE_POST, payload: data })
	} catch (err) {
		console.error(err)
	}
}

export const updatePost = (id, post) => async dispatch => {
	try {
		const { data } = await api.updatePost(id, post)

		dispatch({ type: UPDATE_POST, payload: data })
	} catch (err) {
		console.error(err)
	}
}

export const deletePost = id => async dispatch => {
	try {
		await api.deletePost(id)
		dispatch({ type: DELETE_POST, payload: id })
	} catch (err) {
		console.error(err)
	}
}

export const likePost = id => async dispatch => {
	try {
		const { data } = await api.likePost(id)

		dispatch({ type: LIKE_POST, payload: data })
	} catch (err) {
		console.error(err)
	}
}

/* ==========  REDUCERS  =========== */

export const postsReducer = (posts = [], action) => {
	switch (action.type) {
		case FETCH_ALL_POSTS:
			return action.payload
		case CREATE_POST:
			return [...posts, action.payload]
		case DELETE_POST:
			return posts.filter(post => post._id !== action.payload)
		case UPDATE_POST:
			return posts.map(post => (post._id === action.payload._id ? action.payload : post))
		case LIKE_POST:
			return posts.map(post => (post._id === action.payload._id ? action.payload : post))
		default:
			return posts
	}
}

/* ==========  SELECTORS  =========== */

const getPostsState = state => state.posts

export const getAllPosts = createSelector(getPostsState, posts => posts)
