import { Text } from '@chakra-ui/react'
import {
	addComment,
	createPost,
	deleteComment,
	deletePost,
	fetchPost,
	fetchPosts,
	fetchPostsByCreator,
	fetchPostsBySearch,
	fetchSavedPosts,
	likePost,
	savePost,
	updatePost,
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
		cleanUp: () => set(INITIAL_STATE, false, 'posts-clean-up'),
		setCurrentId: id => set({ currentId: id }, false, 'set-current-id'),

		getPost: async id => {
			set({ loading: true }, false, 'get-post')
			try {
				const { data } = await fetchPost(id)

				set({ post: data }, false, 'get-post')
			} catch (err) {
				showError(
					<>
						<Text fontWeight='bold'>{err.name}</Text>
						<Text>Something went wrong when trying to get post. {err.message}</Text>
						<Text>Please try again.</Text>
					</>
				)
				console.error(err)
			} finally {
				set({ loading: false }, false, 'get-post')
			}
		},

		getPosts: async page => {
			get().cleanUp()
			set({ loading: true }, false, 'get-posts')
			try {
				const {
					data: { data, currentPage, numberOfPages, count },
				} = await fetchPosts(page)

				set({ posts: data, currentPage, numberOfPages, count }, false, 'get-posts')
			} catch (err) {
				showError(
					<>
						<Text fontWeight='bold'>{err.name}</Text>
						<Text>Something went wrong when trying to get posts. {err.message}</Text>
						<Text>Please try again.</Text>
					</>
				)
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
			} finally {
				set({ loading: false }, false, 'get-posts-by-search')
			}
		},

		createPost: async (post, navigate) => {
			set({ loading: true }, false, 'create-post')
			try {
				const { data } = await createPost(post)

				set({ posts: [data, ...get().posts] }, false, 'create-post')
				showSuccess('Post successfully created.')
				navigate(`/posts/${data._id}`)
			} catch (err) {
				showError(
					<>
						<Text fontWeight='bold'>{err.name}</Text>
						<Text>Something went wrong when trying to create post. {err.message}</Text>
						<Text>Please try again.</Text>
					</>
				)
				console.error(err)
			} finally {
				set({ loading: false }, false, 'create-post')
			}
		},

		updatePost: async (id, post) => {
			set({ loading: true }, false, 'update-post')
			try {
				const { data } = await updatePost(id, post)

				set(
					{ posts: get().posts?.map(post => (post?._id === data._id ? data : post)) },
					false,
					'update-post'
				)
				showSuccess('Post successfully updated.')
			} catch (err) {
				showError(
					<>
						<Text fontWeight='bold'>{err.name}</Text>
						<Text>Something went wrong when trying to update post. {err.message}</Text>
						<Text>Please try again.</Text>
					</>
				)
				console.error(err)
			} finally {
				set({ loading: false }, false, 'update-post')
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
			}
		},

		getPostsByCreator: async id => {
			get().cleanUp()
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
			} finally {
				set({ loading: false }, false, 'get-saved-posts')
			}
		},

		setCurrentPage: page => set({ currentPage: page }, false, 'set-current-page'),

		showLoading: () => set({ loading: true }, false, 'show-loading'),
		hideLoading: () => set({ loading: false }, false, 'hide-loading'),
	}))

export const usePostsStore = createPostsStore()
