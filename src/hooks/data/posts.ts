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
import { CommentI, PostI, SearchQueryI } from '../../types'
import { showError } from '../../utils/showError'
import { showSuccess } from '../../utils/showSuccess'

interface UpdatePostParams {
	id: string
	post: Partial<PostI>
}

interface AddCommentParams {
	id: string
	value: CommentI
}

interface DeleteCommentParams {
	id: string
	commentId: string
}

export const useAllPosts = () => {
	const allPostsQuery = useQuery({
		queryKey: ['allPostsQuery'],
		queryFn: async () => {
			try {
				return await getAllPosts()
			} catch (err) {
				console.error(err)
				throw err
			}
		},
		onError: () => {
			showError('Something went wrong when trying to get all posts. Please try again.')
		},
	})

	return {
		...allPostsQuery,
		allPosts: allPostsQuery.data?.data?.data,
		count: allPostsQuery.data?.data?.count || 0,
	}
}

export const usePost = (id: string | undefined) => {
	const postQuery = useQuery({
		queryKey: ['postQuery', id],
		queryFn: async () => {
			try {
				return await getPost(id!)
			} catch (err) {
				console.error(err)
				throw err
			}
		},
		enabled: !!id,
		onError: () => {
			showError('Something went wrong when trying to get post. Please try again.')
		},
	})

	return {
		...postQuery,
		post: postQuery.data?.data,
	}
}

export const usePosts = (page: number) => {
	const postsQuery = useQuery({
		queryKey: ['postsQuery', page],
		queryFn: async () => {
			try {
				const {
					data: { data, currentPage, numberOfPages, count },
				} = await getPosts(page)

				return { data, currentPage, numberOfPages, count }
			} catch (err) {
				console.error(err)
				throw err
			}
		},
		enabled: !!page,
		onError: () => {
			showError('Something went wrong when trying to get posts. Please try again.')
		},
	})

	return {
		...postsQuery,
		posts: postsQuery.data?.data,
		currentPage: postsQuery.data?.currentPage || 1,
		numberOfPages: postsQuery.data?.numberOfPages || 1,
		count: postsQuery.data?.count || 0,
	}
}

export const usePostsBySearch = (
	searchQuery: SearchQueryI | { search: string | null; tags: string | null }
) => {
	const postsBySearchQuery = useQuery({
		queryKey: ['postsBySearchQuery', searchQuery],
		queryFn: async () => {
			try {
				return await getPostsBySearch(searchQuery)
			} catch (err) {
				console.error(err)
				throw err
			}
		},
		enabled: !!searchQuery,
		onError: () => {
			showError(
				'Something went wrong when trying to get posts by search. Please try again.'
			)
		},
	})

	return {
		...postsBySearchQuery,
		postsBySearch: postsBySearchQuery.data?.data?.data,
	}
}

export const usePostsByCreator = (id: string | undefined) => {
	const postsByCreatorQuery = useQuery({
		queryKey: ['postsByCreatorQuery', id],
		queryFn: async () => {
			try {
				return await getPostsByCreator(id!)
			} catch (err) {
				console.error(err)
				throw err
			}
		},
		enabled: !!id,
		onError: () => {
			showError(
				'Something went wrong when trying to get posts by creator. Please try again.'
			)
		},
	})

	return {
		...postsByCreatorQuery,
		postsByCreator: postsByCreatorQuery.data?.data?.data,
		count: postsByCreatorQuery.data?.data?.count || 0,
	}
}

export const useSavedPosts = (id: string | undefined) => {
	const savedPostsQuery = useQuery({
		queryKey: ['savedPostsQuery', id],
		queryFn: async () => {
			try {
				const {
					data: { data, count },
				} = await getSavedPosts(id!)

				return { data, count }
			} catch (err) {
				console.error(err)
				throw err
			}
		},
		enabled: !!id,
		onError: () => {
			showError('Something went wrong when trying to get saved posts. Please try again.')
		},
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

	return useMutation({
		mutationFn: async (post: Partial<PostI>) => {
			try {
				const { data } = await createPost(post)

				showSuccess('Post successfully created.')
				navigate(`/posts/${data._id}`)
			} catch (err) {
				console.error(err)
				throw err
			}
		},
		onSuccess: async () => {
			await queryClient.refetchQueries({ queryKey: ['postsQuery'] })
			await queryClient.refetchQueries({ queryKey: ['postsByCreatorQuery'] })
			await queryClient.refetchQueries({ queryKey: ['savedPostsQuery'] })
			await queryClient.refetchQueries({ queryKey: ['postsBySearchQuery'] })
		},
		onError: () => {
			showError('Something went wrong when trying to create post. Please try again.')
		},
	})
}

export const useUpdatePost = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({ id, post }: UpdatePostParams) => {
			try {
				await updatePost(id, post)

				showSuccess('Post successfully updated.')

				return { id }
			} catch (err) {
				console.error(err)
				throw err
			}
		},
		onSuccess: async ({ id }) => {
			await queryClient.refetchQueries({ queryKey: ['postQuery', Number(id)] })
			await queryClient.refetchQueries({ queryKey: ['postsQuery'] })
		},
		onError: () => {
			showError('Something went wrong when trying to update post. Please try again.')
		},
	})
}

export const useDeletePost = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (id: string) => {
			try {
				await deletePost(id)

				return { id }
			} catch (err) {
				console.error(err)
				throw err
			}
		},
		onSuccess: async ({ id }) => {
			queryClient.removeQueries({ queryKey: ['postQuery', id] })
			await queryClient.refetchQueries({ queryKey: ['postsQuery'] })
		},
		onError: () => {
			showError('Something went wrong when trying to delete post. Please try again.')
		},
	})
}

export const useLikePost = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (id: string) => {
			try {
				await likePost(id)

				return { id }
			} catch (err) {
				console.error(err)
				throw err
			}
		},
		onSuccess: async ({ id }) => {
			await queryClient.refetchQueries({ queryKey: ['postQuery', Number(id)] })
			await queryClient.refetchQueries({ queryKey: ['postsQuery'] })
		},
		onError: () => {
			showError('Something went wrong when trying to like post. Please try again.')
		},
	})
}

export const useSavePost = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (id: string) => {
			try {
				await savePost(id)

				return { id }
			} catch (err) {
				console.error(err)
				throw err
			}
		},
		onSuccess: async ({ id }) => {
			await queryClient.refetchQueries({ queryKey: ['postQuery', Number(id)] })
			await queryClient.refetchQueries({ queryKey: ['savedPostsQuery'] })
			await queryClient.refetchQueries({ queryKey: ['postsQuery'] })
		},
		onError: () => {
			showError('Something went wrong when trying to save post. Please try again.')
		},
	})
}

export const useAddComment = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({ id, value }: AddCommentParams) => {
			try {
				await addComment(id, value)
				showSuccess('Comment successfully added.')

				return { id }
			} catch (err) {
				console.error(err)
				throw err
			}
		},
		onSuccess: async ({ id }) => {
			await queryClient.refetchQueries({ queryKey: ['postQuery', Number(id)] })
			await queryClient.refetchQueries({ queryKey: ['postsQuery'] })
		},
		onError: () => {
			showError('Something went wrong when trying to add comment. Please try again.')
		},
	})
}

export const useDeleteComment = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({ id, commentId }: DeleteCommentParams) => {
			try {
				await deleteComment(id, commentId)
				showSuccess('Comment successfully deleted.')

				return { id }
			} catch (err) {
				console.error(err)
				throw err
			}
		},
		onSuccess: async ({ id }) => {
			await queryClient.refetchQueries({ queryKey: ['postQuery', Number(id)] })
			await queryClient.refetchQueries({ queryKey: ['postsQuery'] })
		},
		onError: () => {
			showError('Something went wrong when trying to delete comment. Please try again.')
		},
	})
}
