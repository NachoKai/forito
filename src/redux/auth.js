import * as api from '../api'
import { showError } from '../utils/showError.ts'

/* ==========  CONSTANTS  ========== */

export const AUTH = 'AUTH'
export const LOGOUT = 'LOGOUT'
export const FETCH_USER = 'FETCH_USER'
export const CLEAN_UP = 'CLEAN_UP'
const START_LOADING = 'START_LOADING'
const END_LOADING = 'END_LOADING'

/* ==========  ACTIONS  ========== */

export const login = (formData, navigate) => async dispatch => {
	try {
		dispatch({ type: START_LOADING, loading: true })
		const { data } = await api.login(formData)

		dispatch({ type: AUTH, data })
		navigate('/')
		navigate(0)
	} catch (err) {
		showError('Something went wrong when trying to log in. Please try again.')
		console.error(err)
	} finally {
		dispatch({ type: END_LOADING, loading: false })
	}
}

export const logout = navigate => async dispatch => {
	try {
		dispatch({ type: LOGOUT })
		navigate('/')
		navigate(0)
	} catch (err) {
		showError('Something went wrong when trying to log out. Please try again.')
		console.error(err)
	}
}

export const signup = (formData, navigate) => async dispatch => {
	try {
		dispatch({ type: START_LOADING, loading: true })
		const { data } = await api.signup(formData)

		dispatch({ type: AUTH, data })
		navigate('/')
		navigate(0)
	} catch (err) {
		showError('Something went wrong when trying to sign up. Please try again.')
		console.error(err)
	} finally {
		dispatch({ type: END_LOADING, loading: false })
	}
}

export const getUser = id => async dispatch => {
	try {
		const { data } = await api.fetchUser(id)

		dispatch({ type: FETCH_USER, data: { user: data } })
	} catch (err) {
		// showError('Something went wrong when trying to get user. Please try again.')
		console.error(err)
	}
}

export const cleanUp = () => ({ type: CLEAN_UP })

/* ==========  REDUCERS  ========== */

const initialState = {
	authData: null,
	user: null,
	loading: true,
}

export const authReducer = (state = initialState, action) => {
	const { type, data } = action

	switch (type) {
		case CLEAN_UP:
			return initialState
		case AUTH:
			localStorage.setItem('forito-profile', JSON.stringify({ ...data }))

			return { ...state, authData: data, loading: false }
		case LOGOUT:
			localStorage.removeItem('forito-profile')
			localStorage.removeItem('forito-theme')

			return { ...state, authData: null, loading: false }
		case FETCH_USER:
			return { ...state, user: data.user }
		case START_LOADING:
			return { ...state, loading: true }
		case END_LOADING:
			return { ...state, loading: false }
		default:
			return state
	}
}
