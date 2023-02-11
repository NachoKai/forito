import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import {
	addComment,
	createPost,
	deleteComment,
	deletePost,
	fetchAllPosts,
	fetchPost,
	fetchPosts,
	fetchPostsByCreator,
	fetchPostsBySearch,
	fetchSavedPosts,
	likePost,
	savePost,
	updatePost,
} from '../../clients/postsClients'
import { showError } from '../../utils/showError'
import { showSuccess } from '../../utils/showSuccess'

export const useAllPosts = () => {
	const allPostsQuery = useQuery(['allPostsQuery'], async () => {
		try {
			return await fetchAllPosts()
		} catch (err) {
			const errorMsg =
				'Something went wrong when trying to get all posts. Please try again.'

			console.error(err)
			showError(errorMsg)
			throw new Error(errorMsg)
		}
	})

	return {
		...allPostsQuery,
		allPosts: allPostsQuery.data?.data?.data,
		count: allPostsQuery.data?.data?.count || 0,
	}
}

export const usePost = id => {
	const postQuery = useQuery(
		['postQuery', id],
		async () => {
			try {
				return await fetchPost(id)
			} catch (err) {
				const errorMsg = 'Something went wrong when trying to get post. Please try again.'

				console.error(err)
				showError(errorMsg)
				throw new Error(errorMsg)
			}
		},
		{
			enabled: !!id,
		}
	)

	return {
		...postQuery,
		post: postQuery.data?.data,
	}
}

export const usePosts = page => {
	const postsQuery = useQuery(
		['postsQuery', page],
		async () => {
			try {
				const {
					data: { data, currentPage, numberOfPages, count },
				} = await fetchPosts(page)

				return { data, currentPage, numberOfPages, count }
			} catch (err) {
				const errorMsg =
					'Something went wrong when trying to get posts. Please try again.'

				console.error(err)
				showError(errorMsg)
				throw new Error(errorMsg)
			}
		},
		{
			enabled: !!page,
		}
	)

	return {
		...postsQuery,
		posts: postsQuery.data?.data,
		currentPage: postsQuery.data?.currentPage || 1,
		numberOfPages: postsQuery.data?.numberOfPages || 1,
		count: postsQuery.data?.count || 0,
	}
}

export const usePostsBySearch = searchQuery => {
	const postsBySearchQuery = useQuery(
		['postsBySearchQuery', searchQuery],
		async () => {
			try {
				return await fetchPostsBySearch(searchQuery)
			} catch (err) {
				const errorMsg =
					'Something went wrong when trying to get posts by search. Please try again.'

				console.error(err)
				showError(errorMsg)
				throw new Error(errorMsg)
			}
		},
		{
			enabled: !!searchQuery,
		}
	)

	return {
		...postsBySearchQuery,
		postsBySearch: postsBySearchQuery.data?.data?.data,
	}
}

export const usePostsByCreator = id => {
	const postsByCreatorQuery = useQuery(
		['postsByCreatorQuery', id],
		async () => {
			try {
				return await fetchPostsByCreator(id)
			} catch (err) {
				const errorMsg =
					'Something went wrong when trying to get posts by creator. Please try again.'

				console.error(err)
				showError(errorMsg)
				throw new Error(errorMsg)
			}
		},
		{
			enabled: !!id,
		}
	)

	return {
		...postsByCreatorQuery,
		postsByCreator: postsByCreatorQuery.data?.data?.data,
		count: postsByCreatorQuery.data?.data?.count || 0,
	}
}

export const useSavedPosts = id => {
	const savedPostsQuery = useQuery(['savedPostsQuery', id], async () => {
		try {
			const {
				data: { data, count },
			} = await fetchSavedPosts(id)

			return { data, count }
		} catch (err) {
			const errorMsg =
				'Something went wrong when trying to get saved posts. Please try again.'

			console.error(err)
			showError(errorMsg)
			throw new Error(errorMsg)
		}
	})

	return {
		...savedPostsQuery,
		savedPosts: savedPostsQuery.data?.data,
		count: savedPostsQuery.data?.count || 0,
	}
}

export const useCreatePost = () => {
	const queryClient = useQueryClient()
	const navigate = useNavigate()

	return useMutation(
		async post => {
			try {
				const { data } = await createPost(post)

				showSuccess('Post successfully created.')
				navigate(`/posts/${data._id}`)
			} catch (err) {
				const errorMsg =
					'Something went wrong when trying to create post. Please try again.'

				console.error(err)
				showError(errorMsg)
				throw new Error(errorMsg)
			}
		},
		{
			onSuccess: async () => {
				await queryClient.refetchQueries({ queryKey: ['postsQuery'] })
				await queryClient.refetchQueries({ queryKey: ['postsByCreatorQuery'] })
				await queryClient.refetchQueries({ queryKey: ['savedPostsQuery'] })
				await queryClient.refetchQueries({ queryKey: ['postsBySearchQuery'] })
			},
		}
	)
}

export const useUpdatePost = () => {
	const queryClient = useQueryClient()

	return useMutation(
		async ({ id, post }) => {
			try {
				await updatePost(id, post)

				showSuccess('Post successfully updated.')

				return { id }
			} catch (err) {
				const errorMsg =
					'Something went wrong when trying to update post. Please try again.'

				console.error(err)
				showError(errorMsg)
				throw new Error(errorMsg)
			}
		},
		{
			onSuccess: async ({ id }) => {
				await queryClient.refetchQueries({ queryKey: ['postQuery', Number(id)] })
				await queryClient.refetchQueries({ queryKey: ['postsQuery'] })
			},
		}
	)
}

export const useDeletePost = () => {
	const queryClient = useQueryClient()

	return useMutation(
		async id => {
			try {
				await deletePost(id)

				return { id }
			} catch (err) {
				const errorMsg =
					'Something went wrong when trying to delete post. Please try again.'

				console.error(err)
				showError(errorMsg)
				throw new Error(errorMsg)
			}
		},
		{
			onSuccess: async ({ id }) => {
				queryClient.removeQueries({ queryKey: ['postQuery', id] })
				await queryClient.refetchQueries({ queryKey: ['postsQuery'] })
			},
		}
	)
}

export const useLikePost = () => {
	const queryClient = useQueryClient()

	return useMutation(
		async id => {
			try {
				await likePost(id)

				return { id }
			} catch (err) {
				const errorMsg =
					'Something went wrong when trying to like post. Please try again.'

				console.error(err)
				showError(errorMsg)
				throw new Error(errorMsg)
			}
		},
		{
			onSuccess: async ({ id }) => {
				await queryClient.refetchQueries({ queryKey: ['postQuery', Number(id)] })
				await queryClient.refetchQueries({ queryKey: ['postsQuery'] })
			},
		}
	)
}

export const useSavePost = () => {
	const queryClient = useQueryClient()

	return useMutation(
		async id => {
			try {
				await savePost(id)

				return { id }
			} catch (err) {
				const errorMsg =
					'Something went wrong when trying to save post. Please try again.'

				console.error(err)
				showError(errorMsg)
				throw new Error(errorMsg)
			}
		},
		{
			onSuccess: async ({ id }) => {
				await queryClient.refetchQueries({ queryKey: ['postQuery', Number(id)] })
				await queryClient.refetchQueries({ queryKey: ['savedPostsQuery'] })
				await queryClient.refetchQueries({ queryKey: ['postsQuery'] })
			},
		}
	)
}

export const useAddComment = () => {
	const queryClient = useQueryClient()

	return useMutation(
		async ({ id, value }) => {
			try {
				await addComment(id, value)
				showSuccess('Comment successfully added.')

				return { id }
			} catch (err) {
				const errorMsg =
					'Something went wrong when trying to add comment. Please try again.'

				console.error(err)
				showError(errorMsg)
				throw new Error(errorMsg)
			}
		},
		{
			onSuccess: async ({ id }) => {
				await queryClient.refetchQueries({ queryKey: ['postQuery', Number(id)] })
				await queryClient.refetchQueries({ queryKey: ['postsQuery'] })
			},
		}
	)
}

export const useDeleteComment = () => {
	const queryClient = useQueryClient()

	return useMutation(
		async ({ id, commentId }) => {
			try {
				await deleteComment(id, commentId)
				showSuccess('Comment successfully deleted.')

				return { id }
			} catch (err) {
				const errorMsg =
					'Something went wrong when trying to delete comment. Please try again.'

				console.error(err)
				showError(errorMsg)
				throw new Error(errorMsg)
			}
		},
		{
			onSuccess: async ({ id }) => {
				await queryClient.refetchQueries({ queryKey: ['postQuery', Number(id)] })
				await queryClient.refetchQueries({ queryKey: ['postsQuery'] })
			},
		}
	)
}
