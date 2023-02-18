import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import {
	addComment,
	createPost,
	deleteComment,
	deletePost,
	getAllPosts,
	getPost,
	getPosts,
	getPostsByCreator,
	getPostsBySearch,
	getSavedPosts,
	likePost,
	savePost,
	updatePost,
} from '../../clients/postsClients'
import { showError } from '../../utils/showError'
import { showSuccess } from '../../utils/showSuccess'

export const useAllPosts = () => {
	const allPostsQuery = useQuery(
		['allPostsQuery'],
		async () => {
			try {
				return await getAllPosts()
			} catch (err) {
				console.error(err)
			}
		},
		{
			onError: () => {
				showError('Something went wrong when trying to get all posts. Please try again.')
			},
		}
	)

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
				return await getPost(id)
			} catch (err) {
				console.error(err)
			}
		},
		{
			enabled: !!id,
			onError: () => {
				showError('Something went wrong when trying to get post. Please try again.')
			},
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
				} = await getPosts(page)

				return { data, currentPage, numberOfPages, count }
			} catch (err) {
				console.error(err)
			}
		},
		{
			enabled: !!page,
			onError: () => {
				showError('Something went wrong when trying to get posts. Please try again.')
			},
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
				return await getPostsBySearch(searchQuery)
			} catch (err) {
				console.error(err)
			}
		},
		{
			enabled: !!searchQuery,
			onError: () => {
				showError(
					'Something went wrong when trying to get posts by search. Please try again.'
				)
			},
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
				return await getPostsByCreator(id)
			} catch (err) {
				console.error(err)
			}
		},
		{
			enabled: !!id,
			onError: () => {
				showError(
					'Something went wrong when trying to get posts by creator. Please try again.'
				)
			},
		}
	)

	return {
		...postsByCreatorQuery,
		postsByCreator: postsByCreatorQuery.data?.data?.data,
		count: postsByCreatorQuery.data?.data?.count || 0,
	}
}

export const useSavedPosts = id => {
	const savedPostsQuery = useQuery(
		['savedPostsQuery', id],
		async () => {
			try {
				const {
					data: { data, count },
				} = await getSavedPosts(id)

				return { data, count }
			} catch (err) {
				console.error(err)
			}
		},
		{
			enabled: !!id,
			onError: () => {
				showError(
					'Something went wrong when trying to get saved posts. Please try again.'
				)
			},
		}
	)

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
				console.error(err)
			}
		},
		{
			onSuccess: async () => {
				await queryClient.refetchQueries({ queryKey: ['postsQuery'] })
				await queryClient.refetchQueries({ queryKey: ['postsByCreatorQuery'] })
				await queryClient.refetchQueries({ queryKey: ['savedPostsQuery'] })
				await queryClient.refetchQueries({ queryKey: ['postsBySearchQuery'] })
			},
			onError: () => {
				showError('Something went wrong when trying to create post. Please try again.')
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
				console.error(err)
			}
		},
		{
			onSuccess: async ({ id }) => {
				await queryClient.refetchQueries({ queryKey: ['postQuery', Number(id)] })
				await queryClient.refetchQueries({ queryKey: ['postsQuery'] })
			},
			onError: () => {
				showError('Something went wrong when trying to update post. Please try again.')
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
				console.error(err)
			}
		},
		{
			onSuccess: async ({ id }) => {
				queryClient.removeQueries({ queryKey: ['postQuery', id] })
				await queryClient.refetchQueries({ queryKey: ['postsQuery'] })
			},
			onError: () => {
				showError('Something went wrong when trying to delete post. Please try again.')
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
				console.error(err)
			}
		},
		{
			onSuccess: async ({ id }) => {
				await queryClient.refetchQueries({ queryKey: ['postQuery', Number(id)] })
				await queryClient.refetchQueries({ queryKey: ['postsQuery'] })
			},
			onError: () => {
				showError('Something went wrong when trying to like post. Please try again.')
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
				console.error(err)
			}
		},
		{
			onSuccess: async ({ id }) => {
				await queryClient.refetchQueries({ queryKey: ['postQuery', Number(id)] })
				await queryClient.refetchQueries({ queryKey: ['savedPostsQuery'] })
				await queryClient.refetchQueries({ queryKey: ['postsQuery'] })
			},
			onError: () => {
				showError('Something went wrong when trying to save post. Please try again.')
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
				console.error(err)
			}
		},
		{
			onSuccess: async ({ id }) => {
				await queryClient.refetchQueries({ queryKey: ['postQuery', Number(id)] })
				await queryClient.refetchQueries({ queryKey: ['postsQuery'] })
			},
			onError: () => {
				showError('Something went wrong when trying to add comment. Please try again.')
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
				console.error(err)
			}
		},
		{
			onSuccess: async ({ id }) => {
				await queryClient.refetchQueries({ queryKey: ['postQuery', Number(id)] })
				await queryClient.refetchQueries({ queryKey: ['postsQuery'] })
			},
			onError: () => {
				showError('Something went wrong when trying to delete comment. Please try again.')
			},
		}
	)
}
