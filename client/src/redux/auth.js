/* ==========  CONSTANTS  =========== */

export const AUTH = "AUTH"
export const LOGOUT = "LOGOUT"

/* ==========  ACTIONS  =========== */

/* ==========  REDUCERS  =========== */

export const authReducer = (state = { authData: null }, action) => {
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

/* ==========  SELECTORS  =========== */
