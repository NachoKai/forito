import { Text } from '@chakra-ui/react'
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
import { showError } from '../../utils/showError.ts'
import { handleErrorResponse, retry } from './utils'
import { showSuccess } from '../../utils/showSuccess'

export const useAllPosts = () => {
	const allPostsQuery = useQuery(
		['allPostsQuery'],
		async () => {
			try {
				return await fetchAllPosts()
			} catch (err) {
				showError(
					<>
						<Text fontWeight='bold'>{err.name}</Text>
						<Text>Something went wrong when trying to get all posts. {err.message}</Text>
						<Text>Please try again.</Text>
					</>
				)
				handleErrorResponse(err, { source: 'all-posts' })
			}
		},
		{
			retry,
			staleTime: 60 * 1000,
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
				return await fetchPost(id)
			} catch (err) {
				showError('Something went wrong when trying to get post. Please try again.')
				handleErrorResponse(err, { source: 'post' })
			}
		},
		{
			retry,
			staleTime: 60 * 1000,
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
				handleErrorResponse(err, { source: 'posts' })
			}
		},
		{
			retry,
			staleTime: 60 * 1000,
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
				handleErrorResponse(err, { source: 'posts-by-search' })
			}
		},
		{
			retry,
			staleTime: 60 * 1000,
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
				showError('Something went wrong when trying to get posts. Please try again.')
				handleErrorResponse(err, { source: 'posts-by-creator' })
			}
		},
		{
			retry,
			staleTime: 60 * 1000,
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
	const savedPostsQuery = useQuery(
		['savedPostsQuery'],
		async () => {
			try {
				const {
					data: { data, count },
				} = await fetchSavedPosts(id)

				return { data, count }
			} catch (err) {
				handleErrorResponse(err, { source: 'saved-posts' })
			}
		},
		{
			retry,
			staleTime: 60 * 1000,
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
				handleErrorResponse(err, { source: 'create-post' })
			}
		},
		{
			onSuccess: async () => {
				await queryClient.refetchQueries({ queryKey: ['postsQuery'] })
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
				handleErrorResponse(err, { source: 'update-post' })
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
				handleErrorResponse(err, { source: 'delete-post' })
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
				handleErrorResponse(err, { source: 'like-post' })
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
				handleErrorResponse(err, { source: 'save-post' })
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

export const useAddComment = () => {
	const queryClient = useQueryClient()

	return useMutation(
		async ({ id, value }) => {
			try {
				await addComment({ id, value })

				return { id }
			} catch (err) {
				handleErrorResponse(err, { source: 'add-comment' })
			}
		},
		{
			onSuccess: async ({ id }) => {
				await queryClient.refetchQueries({ queryKey: ['postQuery', Number(id)] })
			},
		}
	)
}

export const useDeleteComment = () => {
	const queryClient = useQueryClient()

	return useMutation(
		async ({ id, commentId }) => {
			try {
				await deleteComment({ id, commentId })

				return { id }
			} catch (err) {
				handleErrorResponse(err, { source: 'delete-comment' })
			}
		},
		{
			onSuccess: async ({ id }) => {
				await queryClient.refetchQueries({ queryKey: ['postQuery', Number(id)] })
			},
		}
	)
}
