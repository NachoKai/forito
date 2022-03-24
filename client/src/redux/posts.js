import * as api from '../api'
import { hideLoading, showLoading } from './loading'
import { getUserLocalStorage } from '../utils/getUserLocalStorage'
import showError from '../utils/showError'
import showSuccess from '../utils/showSuccess'

/* ==========  CONSTANTS  ========== */

const FETCH_ALL = 'FETCH_ALL'
const FETCH_ALL_POSTS = 'FETCH_ALL_POSTS'
const FETCH_POST = 'FETCH_POST'
const CREATE_POST = 'CREATE_POST'
const UPDATE_POST = 'UPDATE_POST'
const DELETE_POST = 'DELETE_POST'
const LIKE_POST = 'LIKE_POST'
const SAVE_POST = 'SAVE_POST'
const FETCH_POSTS_BY_SEARCH = 'FETCH_POSTS_BY_SEARCH'
const FETCH_BY_CREATOR = 'FETCH_BY_CREATOR'
const FETCH_SAVED_POSTS = 'FETCH_SAVED_POSTS'
const START_LOADING = 'START_LOADING'
const END_LOADING = 'END_LOADING'
const ADD_COMMENT = 'ADD_COMMENT'
const CLEAN_UP = 'CLEAN_UP'
const SET_CURRENT_ID = 'SET_CURRENT_ID'

/* ==========  ACTIONS  ========== */

export const cleanUp = () => ({ type: CLEAN_UP })

export const setCurrentId = id => ({ type: SET_CURRENT_ID, id })

export const getPost = id => async dispatch => {
	try {
		dispatch(showLoading())
		dispatch({ type: START_LOADING })

		const { data } = await api.fetchPost(id)

		dispatch({ type: FETCH_POST, payload: { post: data } })
		dispatch({ type: END_LOADING })
	} catch (err) {
		showError('Something went wrong when trying to get post. Please try again.')
		console.error(err)
	} finally {
		dispatch(hideLoading())
	}
}

export const getPosts = page => async dispatch => {
	try {
		dispatch({ type: START_LOADING })
		const {
			data: { data, currentPage, numberOfPages },
		} = await api.fetchPosts(page)

		dispatch({ type: FETCH_ALL_POSTS, payload: { data, currentPage, numberOfPages } })
		dispatch({ type: END_LOADING })
	} catch (err) {
		showError('Something went wrong when trying to get posts. Please try again.')
		console.error(err)
	}
}

export const getPostsBySearch = searchQuery => async dispatch => {
	try {
		dispatch({ type: START_LOADING })
		const {
			data: { data },
		} = await api.fetchPostsBySearch(searchQuery)

		dispatch({ type: FETCH_POSTS_BY_SEARCH, payload: { data } })
		dispatch({ type: END_LOADING })
	} catch (err) {
		showError('Something went wrong when trying to get post by search. Please try again.')
		console.error(err)
	}
}

export const createPost = (post, navigate) => async dispatch => {
	try {
		dispatch({ type: START_LOADING })
		dispatch(showLoading())
		const { data } = await api.createPost(post)

		dispatch({ type: CREATE_POST, payload: data })
		dispatch({ type: END_LOADING })
		showSuccess('Successfully created post.')
		navigate(`/posts/${data._id}`)
	} catch (err) {
		showError('Something went wrong when trying to create post. Please try again.')
		console.error(err)
	} finally {
		dispatch(hideLoading())
	}
}

export const updatePost = (id, post) => async dispatch => {
	try {
		dispatch({ type: START_LOADING })
		dispatch(showLoading())
		const { data } = await api.updatePost(id, post)

		dispatch({ type: UPDATE_POST, payload: data })
		dispatch({ type: END_LOADING })

		showSuccess('Successfully edited post.')
	} catch (err) {
		showError('Something went wrong when trying to update post. Please try again.')
		console.error(err)
	} finally {
		dispatch(hideLoading())
	}
}

export const deletePost = id => async dispatch => {
	try {
		dispatch({ type: START_LOADING })
		dispatch(showLoading())
		await api.deletePost(id)
		dispatch({ type: DELETE_POST, payload: id })
		dispatch({ type: END_LOADING })
		showSuccess('Successfully deleted post.')
	} catch (err) {
		showError('Something went wrong when trying to delete post. Please try again.')
		console.error(err)
	} finally {
		dispatch(hideLoading())
	}
}

export const likePost = id => async dispatch => {
	const user = getUserLocalStorage()

	try {
		const { data } = await api.likePost(id, user?.token)

		dispatch({ type: LIKE_POST, payload: data })
	} catch (err) {
		showError('Something went wrong when trying to like post. Please try again.')
		console.error(err)
	}
}

export const savePost = saves => async dispatch => {
	const user = getUserLocalStorage()

	try {
		const { data } = await api.savePost(saves, user?.token)

		dispatch({ type: SAVE_POST, payload: data })
	} catch (err) {
		showError('Something went wrong when trying to save post. Please try again.')
		console.error(err)
	}
}

export const addComment = (comment, id) => async dispatch => {
	try {
		const { data } = await api.addComment(comment, id)

		dispatch({ type: ADD_COMMENT, payload: data })
		showSuccess('Successfully added comment.')

		return data.comments
	} catch (err) {
		showError('Something went wrong when trying to add comment. Please try again.')
		console.error(err)
	}
}

export const getPostsByCreator = id => async dispatch => {
	try {
		dispatch({ type: START_LOADING })
		dispatch(showLoading())
		const {
			data: { data },
		} = await api.fetchPostsByCreator(id)

		dispatch({ type: FETCH_BY_CREATOR, payload: { data } })
		dispatch({ type: END_LOADING })
	} catch (err) {
		showError(
			'Something went wrong when trying to get posts by creator. Please try again.'
		)
		console.error(err)
	} finally {
		dispatch(hideLoading())
	}
}

export const getSavedPosts = id => async dispatch => {
	try {
		dispatch({ type: START_LOADING })
		dispatch(showLoading())
		const {
			data: { data },
		} = await api.fetchSavedPosts(id)

		dispatch({ type: FETCH_SAVED_POSTS, payload: { data } })
		dispatch({ type: END_LOADING })
	} catch (err) {
		showError(
			'Something went wrong when trying to get posts by creator. Please try again.'
		)
		console.error(err)
	} finally {
		dispatch(hideLoading())
	}
}

/* ==========  REDUCERS  =========== */

const initialState = {
	posts: [],
	isLoading: true,
	currentId: null,
}

export const postsReducer = (state = initialState, action) => {
	const { type, payload } = action

	switch (type) {
		case CLEAN_UP:
			return initialState
		case START_LOADING:
			return { ...state, isLoading: true }
		case END_LOADING:
			return { ...state, isLoading: false }
		case FETCH_ALL:
			return payload
		case FETCH_ALL_POSTS:
			return {
				...state,
				posts: payload.data,
				currentPage: payload.currentPage,
				numberOfPages: payload.numberOfPages,
			}
		case FETCH_POSTS_BY_SEARCH:
		case FETCH_BY_CREATOR:
		case FETCH_SAVED_POSTS:
			return { ...state, posts: payload.data }
		case FETCH_POST:
			return { ...state, post: payload.post }
		case CREATE_POST:
			return { ...state, posts: [...state.posts, payload] }
		case DELETE_POST:
			return { ...state, posts: state.posts?.filter(post => post?._id !== payload) }
		case UPDATE_POST:
		case LIKE_POST:
		case SAVE_POST:
			return {
				...state,
				posts: state.posts?.map(post => (post?._id === payload._id ? payload : post)),
			}
		case ADD_COMMENT:
			return {
				...state,
				posts: state.posts?.map(post => {
					if (post._id === payload._id) return payload

					return post
				}),
			}
		case SET_CURRENT_ID: {
			const { id } = action

			return {
				...state,
				currentId: id,
			}
		}
		default:
			return state
	}
}
