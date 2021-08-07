import { createSelector } from "reselect"

import * as api from "../api"

/* ==========  CONSTANTS  =========== */

const FETCH_ALL_POSTS = "FETCH_ALL_POSTS"
const CREATE_POST = "CREATE_POST"
const UPDATE_POST = "UPDATE_POST"

/* ==========  ACTIONS  =========== */

export const getPosts = () => async dispatch => {
	try {
		const { data } = await api.fetchPosts()
		dispatch({ type: FETCH_ALL_POSTS, payload: data })
	} catch (err) {
		console.error(err.message)
	}
}

export const createPost = post => async dispatch => {
	try {
		const { data } = await api.createPost(post)
		dispatch({ type: CREATE_POST, payload: data })
	} catch (err) {
		console.error(err.message)
	}
}

export const updatePost = (id, post) => async dispatch => {
	try {
		const { data } = await api.updatePost(id, post)
		dispatch({ type: UPDATE_POST, payload: data })
	} catch (err) {
		console.error(err.message)
	}
}

/* ==========  REDUCERS  =========== */

export const postsReducer = (posts = [], action) => {
	switch (action.type) {
		case FETCH_ALL_POSTS:
			return action.payload
		case CREATE_POST:
			return [...posts, action.payload]
		case UPDATE_POST:
			return posts.map(post => (post._id === action.payload._id ? action.payload : post))
		default:
			return posts
	}
}

/* ==========  SELECTORS  =========== */

const getPostsState = state => state.posts

export const getAllPosts = createSelector(getPostsState, posts => posts)
export const getPost = createSelector(getPostsState, posts => posts)
