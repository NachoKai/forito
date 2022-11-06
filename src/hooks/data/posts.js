import { Text } from '@chakra-ui/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

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

export const useAllPosts = () => {
	const allPostsQuery = useQuery(
		['allPostsQuery'],
		async () => {
			try {
				const allPosts = await fetchAllPosts()

				if (!allPosts) return []

				return allPosts
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
		allPosts: allPostsQuery.data?.data?.data || [],
		count: allPostsQuery.data?.data?.count || 0,
		refetch: async () => {
			await allPostsQuery.refetch()
		},
	}
}

export const usePost = id => {
	const postQuery = useQuery(
		['postQuery', id],
		async () => {
			try {
				const post = await fetchPost(id)

				if (!post) return []

				return post
			} catch (err) {
				showError('Something went wrong when trying to get post. Please try again.')
				handleErrorResponse(err, { source: 'post' })
			}
		},
		{
			retry,
			staleTime: 60 * 1000,
		}
	)

	return {
		...postQuery,
		refetch: async () => {
			await postQuery.refetch()
		},
	}
}

export const usePosts = page => {
	const postsQuery = useQuery(
		['postsQuery', page],
		async () => {
			try {
				const posts = await fetchPosts(page)

				if (!posts) return []

				return posts
			} catch (err) {
				handleErrorResponse(err, { source: 'posts' })
			}
		},
		{
			retry,
			staleTime: 60 * 1000,
		}
	)

	return {
		...postsQuery,
		refetch: async () => {
			await postsQuery.refetch()
		},
	}
}

export const usePostsBySearch = searchQuery => {
	const postsBySearchQuery = useQuery(
		['postsBySearchQuery', searchQuery],
		async () => {
			try {
				const posts = await fetchPostsBySearch(searchQuery)

				if (!posts) return []

				return posts
			} catch (err) {
				handleErrorResponse(err, { source: 'posts-by-search' })
			}
		},
		{
			retry,
			staleTime: 60 * 1000,
		}
	)

	return {
		...postsBySearchQuery,
		refetch: async () => {
			await postsBySearchQuery.refetch()
		},
	}
}

export const usePostsByCreator = id => {
	const postsByCreatorQuery = useQuery(
		['postsByCreatorQuery', id],
		async () => {
			try {
				const posts = await fetchPostsByCreator(id)

				if (!posts) return []

				return posts
			} catch (err) {
				showError('Something went wrong when trying to get posts. Please try again.')
				handleErrorResponse(err, { source: 'posts-by-creator' })
			}
		},
		{
			retry,
			staleTime: 60 * 1000,
		}
	)

	return {
		...postsByCreatorQuery,
		refetch: async () => {
			await postsByCreatorQuery.refetch()
		},
	}
}

export const useSavedPosts = () => {
	const savedPostsQuery = useQuery(
		['savedPostsQuery'],
		async () => {
			try {
				const posts = await fetchSavedPosts()

				if (!posts) return []

				return posts
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
		refetch: async () => {
			await savedPostsQuery.refetch()
		},
	}
}

export const useCreatePost = () => {
	const queryClient = useQueryClient()

	return useMutation(
		async ({ title, description, tags, selectedFile }) => {
			try {
				const { data } = await createPost({
					title,
					description,
					tags,
					selectedFile,
				})

				return data
			} catch (err) {
				handleErrorResponse(err, { source: 'create-post' })
			}
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries('postsQuery')
				queryClient.invalidateQueries('allPostsQuery')
			},
		}
	)
}

export const useUpdatePost = () => {
	const queryClient = useQueryClient()

	return useMutation(
		async ({ id, title, description, tags, selectedFile }) => {
			try {
				const { data } = await updatePost({
					id,
					title,
					description,
					tags,
					selectedFile,
				})

				return data
			} catch (err) {
				handleErrorResponse(err, { source: 'update-post' })
			}
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries('postsQuery')
				queryClient.invalidateQueries('allPostsQuery')
			},
		}
	)
}

export const useDeletePost = () => {
	const queryClient = useQueryClient()

	return useMutation(
		async id => {
			try {
				const { data } = await deletePost(id)

				return data
			} catch (err) {
				handleErrorResponse(err, { source: 'delete-post' })
			}
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries('postsQuery')
				queryClient.invalidateQueries('allPostsQuery')
			},
		}
	)
}

export const useLikePost = () => {
	const queryClient = useQueryClient()

	return useMutation(
		async id => {
			try {
				const { data } = await likePost(id)

				return data
			} catch (err) {
				handleErrorResponse(err, { source: 'like-post' })
			}
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries('postsQuery')
				queryClient.invalidateQueries('allPostsQuery')
			},
		}
	)
}

export const useSavePost = () => {
	const queryClient = useQueryClient()

	return useMutation(
		async id => {
			try {
				const { data } = await savePost(id)

				return data
			} catch (err) {
				handleErrorResponse(err, { source: 'save-post' })
			}
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries('savedPostsQuery')
			},
		}
	)
}

export const useAddComment = () => {
	const queryClient = useQueryClient()

	return useMutation(
		async ({ id, value }) => {
			try {
				const { data } = await addComment({ id, value })

				return data
			} catch (err) {
				handleErrorResponse(err, { source: 'add-comment' })
			}
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries('postsQuery')
				queryClient.invalidateQueries('allPostsQuery')
			},
		}
	)
}

export const useDeleteComment = () => {
	const queryClient = useQueryClient()

	return useMutation(
		async ({ id, commentId }) => {
			try {
				const { data } = await deleteComment({ id, commentId })

				return data
			} catch (err) {
				handleErrorResponse(err, { source: 'delete-comment' })
			}
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries('postsQuery')
				queryClient.invalidateQueries('allPostsQuery')
			},
		}
	)
}
