const SHOW_LOADING = 'SHOW_LOADING'
const HIDE_LOADING = 'HIDE_LOADING'

// ----------------- ACTIONS ----------------- //

export const showLoading = () => ({ type: SHOW_LOADING })
export const hideLoading = () => ({ type: HIDE_LOADING })

// ----------------- REDUCERS ----------------- //

export const loadingReducer = (state = false, action) => {
	switch (action.type) {
		case SHOW_LOADING:
			return true
		case HIDE_LOADING:
			return false
		default:
			if (action.loading !== undefined) {
				return action.loading
			}

			return state
	}
}

// ----------------- SELECTORS ----------------- //

export const getLoading = state => state.loading
