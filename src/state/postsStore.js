import { Text } from '@chakra-ui/react'
import { fetchPostsBySearch } from '../clients/postsClients'
import { showError } from '../utils/showError'
import { create } from './createStore'

const INITIAL_STATE = {
	posts: [],
	post: null,
	loading: false,
	currentId: null,
	currentPage: null,
	numberOfPages: null,
	count: null,
}

const createPostsStore = () =>
	create('postsStore')(set => ({
		...INITIAL_STATE,
		setCurrentId: id => set({ currentId: id }, false, 'set-current-id'),

		getPostsBySearch: async searchQuery => {
			set({ loading: true }, false, 'get-posts-by-search')
			try {
				const {
					data: { data },
				} = await fetchPostsBySearch(searchQuery)

				set({ posts: data }, false, 'get-posts-by-search')
			} catch (err) {
				showError(
					<>
						<Text fontWeight='bold'>{err.name}</Text>
						<Text>
							Something went wrong when trying to get posts by search. {err.message}
						</Text>
						<Text>Please try again.</Text>
					</>
				)
				console.error(err)
				throw err
			} finally {
				set({ loading: false }, false, 'get-posts-by-search')
			}
		},

		setCurrentPage: page => set({ currentPage: page }, false, 'set-current-page'),

		showLoading: () => set({ loading: true }, false, 'show-loading'),
		hideLoading: () => set({ loading: false }, false, 'hide-loading'),
	}))

export const usePostsStore = createPostsStore()
