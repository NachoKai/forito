import * as api from '../api'
import { getUserLocalStorage } from '../utils/getUserLocalStorage.ts'
import { showError } from '../utils/showError.ts'
import { showSuccess } from '../utils/showSuccess.ts'
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
	create('postsStore')((set, get) => ({
		...INITIAL_STATE,
		cleanUp: () => set(INITIAL_STATE, false, 'posts-clean-up'),
		setCurrentId: id => set({ currentId: id }, false, 'set-current-id'),

		getPost: async id => {
			set({ loading: true }, false, 'get-post')
			try {
				const { data } = await api.fetchPost(id)

				set({ post: data }, false, 'get-post')
			} catch (err) {
				showError('Something went wrong when trying to get post. Please try again.')
				console.error(err)
			} finally {
				set({ loading: false }, false, 'get-post')
			}
		},

		getAllPosts: async page => {
			get().cleanUp()
			set({ loading: true }, false, 'get-all-posts')
			try {
				const {
					data: { data, count },
				} = await api.fetchAllPosts(page)

				set({ posts: data, count }, false, 'get-all-posts')
			} catch (err) {
				showError('Something went wrong when trying to get all posts. Please try again.')
				console.error(err)
			} finally {
				set({ loading: false }, false, 'get-all-posts')
			}
		},

		getPosts: async page => {
			get().cleanUp()
			set({ loading: true }, false, 'get-posts')
			try {
				const {
					data: { data, currentPage, numberOfPages, count },
				} = await api.fetchPosts(page)

				set({ posts: data, currentPage, numberOfPages, count }, false, 'get-posts')
			} catch (err) {
				showError('Something went wrong when trying to get posts. Please try again.')
				console.error(err)
			} finally {
				set({ loading: false }, false, 'get-posts')
			}
		},

		getPostsBySearch: async searchQuery => {
			set({ loading: true }, false, 'get-posts-by-search')
			try {
				const {
					data: { data },
				} = await api.fetchPostsBySearch(searchQuery)

				set({ posts: data }, false, 'get-posts-by-search')
			} catch (err) {
				showError(
					'Something went wrong when trying to get posts by search. Please try again.'
				)
				console.error(err)
			} finally {
				set({ loading: false }, false, 'get-posts-by-search')
			}
		},

		createPost: async (post, navigate) => {
			set({ loading: true }, false, 'create-post')
			try {
				const { data } = await api.createPost(post)

				set({ posts: [data, ...get().posts] }, false, 'create-post')
				showSuccess('Post successfully created.')
				navigate(`/posts/${data._id}`)
			} catch (err) {
				showError('Something went wrong when trying to create post. Please try again.')
				console.error(err)
			} finally {
				set({ loading: false }, false, 'create-post')
			}
		},

		updatePost: async (id, post) => {
			set({ loading: true }, false, 'update-post')
			try {
				const { data } = await api.updatePost(id, post)

				set(
					{ posts: get().posts?.map(post => (post?._id === data._id ? data : post)) },
					false,
					'update-post'
				)
				showSuccess('Post successfully updated.')
			} catch (err) {
				showError('Something went wrong when trying to update post. Please try again.')
				console.error(err)
			} finally {
				set({ loading: false }, false, 'update-post')
			}
		},

		deletePost: async id => {
			set({ loading: true }, false, 'delete-post')
			try {
				await api.deletePost(id)
				set(
					{ posts: get().posts?.filter(post => post?._id !== id) },
					false,
					'delete-post'
				)
				showSuccess('Post successfully deleted.')
			} catch (err) {
				showError('Something went wrong when trying to delete post. Please try again.')
				console.error(err)
			} finally {
				set({ loading: false }, false, 'delete-post')
			}
		},

		likePost: async id => {
			const user = getUserLocalStorage()

			try {
				const { data } = await api.likePost(id, user?.token)

				set(
					{ posts: get().posts?.map(post => (post?._id === data._id ? data : post)) },
					false,
					'like-post'
				)
			} catch (err) {
				showError('Something went wrong when trying to like post. Please try again.')
				console.error(err)
			}
		},

		savePost: async saves => {
			const user = getUserLocalStorage()

			try {
				const { data } = await api.savePost(saves, user?.token)

				set(
					{ posts: get().posts?.map(post => (post?._id === data._id ? data : post)) },
					false,
					'save-post'
				)
			} catch (err) {
				showError('Something went wrong when trying to save post. Please try again.')
				console.error(err)
			}
		},

		addComment: async (comment, id) => {
			try {
				const { data } = await api.addComment(comment, id)

				set(
					{ posts: get().posts?.map(post => (post?._id === data._id ? data : post)) },
					false,
					'add-comment'
				)
				showSuccess('Comment successfully added.')
			} catch (err) {
				showError('Something went wrong when trying to add comment. Please try again.')
				console.error(err)
			}
		},

		getPostsByCreator: async id => {
			get().cleanUp()
			set({ loading: true }, false, 'get-posts-by-creator')
			try {
				const {
					data: { data },
				} = await api.fetchPostsByCreator(id)

				set({ posts: data }, false, 'get-posts-by-creator')
			} catch (err) {
				showError(
					'Something went wrong when trying to get posts by creator. Please try again.'
				)
				console.error(err)
			} finally {
				set({ loading: false }, false, 'get-posts-by-creator')
			}
		},

		getSavedPosts: async id => {
			get().cleanUp()
			set({ loading: true }, false, 'get-saved-posts')
			try {
				const {
					data: { data },
				} = await api.fetchSavedPosts(id)

				set({ posts: data }, false, 'get-saved-posts')
			} catch (err) {
				showError(
					'Something went wrong when trying to get saved posts. Please try again.'
				)
				console.error(err)
			} finally {
				set({ loading: false }, false, 'get-saved-posts')
			}
		},

		setCurrentPage: page => set({ currentPage: page }, false, 'set-current-page'),
	}))

export const usePostsStore = createPostsStore()
