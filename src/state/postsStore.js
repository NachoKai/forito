import { Text } from '@chakra-ui/react'
import {
	addComment,
	deleteComment,
	deletePost,
	fetchPostsByCreator,
	fetchPostsBySearch,
	fetchSavedPosts,
	likePost,
	savePost,
} from '../clients/postsClients'
import { getUserLocalStorage } from '../utils/getUserLocalStorage'
import { showError } from '../utils/showError'
import { showSuccess } from '../utils/showSuccess'
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

		deletePost: async id => {
			set({ loading: true }, false, 'delete-post')
			try {
				await deletePost(id)
				set(
					{ posts: get().posts?.filter(post => post?._id !== id) },
					false,
					'delete-post'
				)
				showSuccess('Post successfully deleted.')
			} catch (err) {
				showError(
					<>
						<Text fontWeight='bold'>{err.name}</Text>
						<Text>Something went wrong when trying to delete post. {err.message}</Text>
						<Text>Please try again.</Text>
					</>
				)
				console.error(err)
				throw err
			} finally {
				set({ loading: false }, false, 'delete-post')
			}
		},

		likePost: async id => {
			const user = getUserLocalStorage()

			try {
				const { data } = await likePost(id, user?.token)

				set(
					{ posts: get().posts?.map(post => (post?._id === data._id ? data : post)) },
					false,
					'like-post'
				)
			} catch (err) {
				showError(
					<>
						<Text fontWeight='bold'>{err.name}</Text>
						<Text>Something went wrong when trying to like post. {err.message}</Text>
						<Text>Please try again.</Text>
					</>
				)
				console.error(err)
				throw err
			}
		},

		savePost: async saves => {
			const user = getUserLocalStorage()

			try {
				const { data } = await savePost(saves, user?.token)

				set(
					{ posts: get().posts?.map(post => (post?._id === data._id ? data : post)) },
					false,
					'save-post'
				)
			} catch (err) {
				showError(
					<>
						<Text fontWeight='bold'>{err.name}</Text>
						<Text>Something went wrong when trying to save post. {err.message}</Text>
						<Text>Please try again.</Text>
					</>
				)
				console.error(err)
				throw err
			}
		},

		addComment: async (comment, id) => {
			try {
				const { data } = await addComment(comment, id)

				set(
					{ posts: get().posts?.map(post => (post?._id === data._id ? data : post)) },
					false,
					'add-comment'
				)
				showSuccess('Comment successfully added.')
			} catch (err) {
				showError(
					<>
						<Text fontWeight='bold'>{err.name}</Text>
						<Text>Something went wrong when trying to add comment. {err.message}</Text>
						<Text>Please try again.</Text>
					</>
				)
				console.error(err)
				throw err
			}
		},

		deleteComment: async (postId, commentId) => {
			try {
				const { data } = await deleteComment(postId, commentId)

				set(
					{ posts: get().posts?.map(post => (post?._id === data._id ? data : post)) },
					false,
					'delete-comment'
				)
				showSuccess('Comment successfully deleted.')
			} catch (err) {
				showError(
					<>
						<Text fontWeight='bold'>{err.name}</Text>
						<Text>Something went wrong when trying to delete comment. {err.message}</Text>
						<Text>Please try again.</Text>
					</>
				)
				console.error(err)
				throw err
			}
		},

		getPostsByCreator: async id => {
			set({ loading: true }, false, 'get-posts-by-creator')
			try {
				const {
					data: { data },
				} = await fetchPostsByCreator(id)

				set({ posts: data }, false, 'get-posts-by-creator')
			} catch (err) {
				showError(
					<>
						<Text fontWeight='bold'>{err.name}</Text>
						<Text>
							Something went wrong when trying to get posts by creator. {err.message}
						</Text>
						<Text>Please try again.</Text>
					</>
				)
				console.error(err)
				throw err
			} finally {
				set({ loading: false }, false, 'get-posts-by-creator')
			}
		},

		getSavedPosts: async id => {
			set({ loading: true }, false, 'get-saved-posts')
			try {
				const {
					data: { data },
				} = await fetchSavedPosts(id)

				set({ posts: data }, false, 'get-saved-posts')
			} catch (err) {
				showError(
					<>
						<Text fontWeight='bold'>{err.name}</Text>
						<Text>
							Something went wrong when trying to get saved posts. {err.message}
						</Text>
						<Text>Please try again.</Text>
					</>
				)
				console.error(err)
				throw err
			} finally {
				set({ loading: false }, false, 'get-saved-posts')
			}
		},

		setCurrentPage: page => set({ currentPage: page }, false, 'set-current-page'),

		showLoading: () => set({ loading: true }, false, 'show-loading'),
		hideLoading: () => set({ loading: false }, false, 'hide-loading'),
	}))

export const usePostsStore = createPostsStore()
