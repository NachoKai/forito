import { create } from './createStore'

const INITIAL_STATE = false

const createLoadingStore = () =>
	create('loadingStore')((set, get) => ({
		...INITIAL_STATE,
		showLoading: () => set(true, false, 'show-loading'),
		hideLoading: () => set(false, false, 'hide-loading'),
		loading: () => get(),
	}))

export const useLoadingStore = createLoadingStore()
