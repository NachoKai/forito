import { createSelector } from "reselect"

import * as api from "../api"

/* ==========  CONSTANTS  =========== */

const FETCH_ALL_POSTS = "FETCH_ALL_POSTS"
const CREATE_POST = "CREATE_POST"

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

/* ==========  REDUCERS  =========== */

const initialState = {
	posts: [],
}

export const postsReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_ALL_POSTS:
			return action.payload
		case CREATE_POST:
			return [...state, action.payload]
		default:
			return state
	}
}

/* ==========  SELECTORS  =========== */

const getPostsState = state => state.posts

export const getAllPosts = createSelector(getPostsState, posts => posts)
