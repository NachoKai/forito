import * as api from "../api"
import { getUser } from "../utils/getUser"
import showError from "../utils/showError"
import showSuccess from "../utils/showSuccess"

/* ==========  CONSTANTS  =========== */

const FETCH_ALL_POSTS = "FETCH_ALL_POSTS"
const CREATE_POST = "CREATE_POST"
const UPDATE_POST = "UPDATE_POST"
const DELETE_POST = "DELETE_POST"
const LIKE_POST = "LIKE_POST"
const START_LOADING_POST = "START_LOADING_POST"
const FETCH_POST_BY_SEARCH = "FETCH_POST_BY_SEARCH"
const END_LOADING_POST = "END_LOADING_POST"

/* ==========  ACTIONS  =========== */

export const getPosts = () => async dispatch => {
	try {
		const { data } = await api.fetchPosts()

		dispatch({ type: FETCH_ALL_POSTS, payload: data })
	} catch (err) {
		showError("Something went wrong. Please try again.")
		console.error(err)
	}
}

export const getPostsBySearch = searchQuery => async dispatch => {
	try {
		dispatch({ type: START_LOADING_POST })
		const {
			data: { data },
		} = await api.fetchPostsBySearch(searchQuery)

		dispatch({ type: FETCH_POST_BY_SEARCH, payload: { data } })
		dispatch({ type: END_LOADING_POST })
	} catch (err) {
		console.error(err)
	}
}

export const createPost = post => async dispatch => {
	try {
		const { data } = await api.createPost(post)

		dispatch({ type: CREATE_POST, payload: data })
		showSuccess("Successfully created post.")
	} catch (err) {
		showError("Something went wrong. Please try again.")
		console.error(err)
	}
}

export const updatePost = (id, post) => async dispatch => {
	try {
		const { data } = await api.updatePost(id, post)

		dispatch({ type: UPDATE_POST, payload: data })
		showSuccess("Successfully edited post.")
	} catch (err) {
		showError("Something went wrong. Please try again.")
		console.error(err)
	}
}

export const deletePost = id => async dispatch => {
	try {
		await api.deletePost(id)
		dispatch({ type: DELETE_POST, payload: id })
		showSuccess("Successfully deleted post.")
	} catch (err) {
		showError("Something went wrong. Please try again.")
		console.error(err)
	}
}

export const likePost = id => async dispatch => {
	const user = getUser()

	try {
		const { data } = await api.likePost(id, user?.token)

		dispatch({ type: LIKE_POST, payload: data })
	} catch (err) {
		showError("Something went wrong. Please try again.")
		console.error(err)
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
		case DELETE_POST:
			return state.filter(post => post._id !== action.payload)
		case UPDATE_POST:
			return state.map(post => (post._id === action.payload._id ? action.payload : post))
		case LIKE_POST:
			return state.map(post => (post._id === action.payload._id ? action.payload : post))
		default:
			return state
	}
}
