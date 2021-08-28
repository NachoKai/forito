import * as api from "../api"
import showError from "../utils/showError"

/* ==========  CONSTANTS  =========== */

export const AUTH = "AUTH"
export const LOGOUT = "LOGOUT"

/* ==========  ACTIONS  =========== */

export const login = (formData, history) => async dispatch => {
	try {
		const { data } = await api.login(formData)

		dispatch({ type: AUTH, data })
		history.push("/")
	} catch (err) {
		showError("Something went wrong when trying to log in. Please try again.")
		console.error(err)
	}
}

export const logout = history => async dispatch => {
	try {
		dispatch({ type: LOGOUT })
		history.push("/auth")
	} catch (err) {
		showError("Something went wrong when trying to log out. Please try again.")
		console.error(err)
	}
}

export const signup = (formData, history) => async dispatch => {
	try {
		const { data } = await api.signup(formData)

		dispatch({ type: AUTH, data })
		history.push("/")
	} catch (err) {
		showError("Something went wrong when trying to sign up. Please try again.")
		console.error(err)
	}
}

/* ==========  REDUCERS  =========== */

const initialState = {
	authData: null,
}

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case AUTH:
			localStorage.setItem("forito-profile", JSON.stringify({ ...action?.data }))

			return { ...state, authData: action.data, loading: false, errors: null }
		case LOGOUT:
			localStorage.removeItem("forito-profile")

			return { ...state, authData: null, loading: false, errors: null }
		default:
			return state
	}
}
