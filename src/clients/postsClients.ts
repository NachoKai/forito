import { PostI } from './../types'
import { api } from '../api'
import { CommentI, SearchQueryI } from '../types'

export const fetchAllPosts = async () => {
	try {
		return await api.get('/posts')
	} catch (err) {
		console.error('Error getting all posts', err)
	}
}

export const fetchPost = async (id: string) => {
	try {
		return await api.get(`/posts/${id}`)
	} catch (err) {
		console.error('Error getting post', err)
	}
}

export const fetchPosts = async (page: number) => {
	try {
		return await api.get(`/posts?page=${page}`)
	} catch (err) {
		console.error('Error getting posts', err)
	}
}

export const fetchPostsBySearch = async (searchQuery: SearchQueryI) => {
	try {
		return await api.get(
			`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`
		)
	} catch (err) {
		console.error('Error getting posts by search', err)
	}
}

export const fetchPostsByCreator = async (id: string) => {
	try {
		return await api.get(`/posts/creator?id=${id}`)
	} catch (err) {
		console.error('Error getting posts by creator', err)
	}
}

export const fetchSavedPosts = async (id: string) => {
	try {
		return await api.get(`/posts/saved?id=${id}`)
	} catch (err) {
		console.error('Error getting saved posts', err)
	}
}

export const createPost = async (newPost: PostI) => {
	try {
		return await api.post('/posts', newPost)
	} catch (err) {
		console.error('Error creating post', err)
	}
}

export const likePost = async (id: string) => {
	try {
		return await api.patch(`/posts/${id}/likePost`)
	} catch (err) {
		console.error('Error liking post', err)
	}
}

export const savePost = async (id: string) => {
	try {
		return await api.patch(`/posts/${id}/savePost`)
	} catch (err) {
		console.error('Error saving post', err)
	}
}

export const updatePost = async (id: string, updatedPost: PostI) => {
	try {
		return await api.patch(`/posts/${id}`, updatedPost)
	} catch (err) {
		console.error('Error updating post', err)
	}
}

export const deletePost = async (id: string) => {
	try {
		return await api.delete(`/posts/${id}`)
	} catch (err) {
		console.error('Error deleting post', err)
	}
}

export const addComment = async (value: CommentI, id: string) => {
	try {
		return await api.post(`/posts/${id}/addComment`, { value })
	} catch (err) {
		console.error('Error adding comment', err)
	}
}

export const deleteComment = async (id: string, commentId: string) => {
	try {
		return await api.delete(`/posts/${id}/${commentId}`)
	} catch (err) {
		console.error('Error deleting comment', err)
	}
}
