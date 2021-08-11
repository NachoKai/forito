import * as api from "../api"
import showError from "../utils/showError"
import showSuccess from "../utils/showSuccess"

/* ==========  CONSTANTS  =========== */

export const AUTH = "AUTH"
export const LOGOUT = "LOGOUT"

/* ==========  ACTIONS  =========== */

export const login = (formData, router) => async dispatch => {
	try {
		const { data } = await api.login(formData)

		dispatch({ type: AUTH, data })
		router.push("/")
		showSuccess("Successfully logged in.")
	} catch (err) {
		showError("Something went wrong. Please try again.")
		console.error(err)
	}
}

export const signup = (formData, router) => async dispatch => {
	try {
		const { data } = await api.signup(formData)

		dispatch({ type: AUTH, data })
		router.push("/")
		showSuccess("Successfully signed up.")
	} catch (err) {
		showError("Something went wrong. Please try again.")
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
