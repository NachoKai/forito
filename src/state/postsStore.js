import { create } from './createStore'

const INITIAL_STATE = {
	loading: false,
	currentId: null,
	currentPage: null,
	searchQuery: null,
}

const createPostsStore = () =>
	create('postsStore')(set => ({
		...INITIAL_STATE,
		setCurrentId: id => set({ currentId: id }, false, 'set-current-id'),
		setCurrentPage: page => set({ currentPage: page }, false, 'set-current-page'),
		showLoading: () => set({ loading: true }, false, 'show-loading'),
		hideLoading: () => set({ loading: false }, false, 'hide-loading'),
		setSearchQuery: query => set({ searchQuery: query }, false, 'set-search-query'),
	}))

export const usePostsStore = createPostsStore()
