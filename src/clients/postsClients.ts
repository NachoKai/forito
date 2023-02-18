import { PostI } from './../types'
import { api } from '../api/api'
import { CommentI, SearchQueryI } from '../types'

const POSTS_ENDPOINT = '/posts'

export const getAllPosts = async () => {
	try {
		return await api.get(`${POSTS_ENDPOINT}/top`)
	} catch (err) {
		console.error('Error getting all posts', err)
		throw err
	}
}

export const getPost = async (postId: string) => {
	try {
		return await api.get(`${POSTS_ENDPOINT}/${postId}`)
	} catch (err) {
		console.error(`Error getting post ${postId}`, err)
		throw err
	}
}

export const getPosts = async (page: number) => {
	try {
		return await api.get(`${POSTS_ENDPOINT}?page=${page}`)
	} catch (err) {
		console.error('Error getting posts', err)
		throw err
	}
}

export const getPostsBySearch = async (searchQuery: SearchQueryI) => {
	try {
		return await api.get(
			`${POSTS_ENDPOINT}/search?searchQuery=${searchQuery.search}&tags=${searchQuery.tags}`
		)
	} catch (err) {
		console.error('Error getting posts by search', err)
		throw err
	}
}

export const getPostsByCreator = async (userId: string) => {
	try {
		return await api.get(`${POSTS_ENDPOINT}/creator?id=${userId}`)
	} catch (err) {
		console.error('Error getting posts by creator', err)
		throw err
	}
}

export const getSavedPosts = async (postId: string) => {
	try {
		return await api.get(`${POSTS_ENDPOINT}/saved?id=${postId}`)
	} catch (err) {
		console.error('Error getting saved posts', err)
		throw err
	}
}

export const createPost = async (newPost: PostI) => {
	try {
		return await api.post(`${POSTS_ENDPOINT}`, newPost)
	} catch (err) {
		console.error('Error creating post', err)
		throw err
	}
}

export const likePost = async (postId: string) => {
	try {
		return await api.patch(`${POSTS_ENDPOINT}/${postId}/likePost`)
	} catch (err) {
		console.error(`Error liking post ${postId}`, err)
		throw err
	}
}

export const savePost = async (postId: string) => {
	try {
		return await api.patch(`${POSTS_ENDPOINT}/${postId}/savePost`)
	} catch (err) {
		console.error(`Error saving post ${postId}`, err)
		throw err
	}
}

export const updatePost = async (postId: string, updatedPost: PostI) => {
	try {
		return await api.patch(`${POSTS_ENDPOINT}/${postId}`, updatedPost)
	} catch (err) {
		console.error(`Error updating post ${postId}`, err)
		throw err
	}
}

export const deletePost = async (postId: string) => {
	try {
		return await api.delete(`${POSTS_ENDPOINT}/${postId}`)
	} catch (err) {
		console.error(`Error deleting post ${postId}`, err)
		throw err
	}
}

export const addComment = async (postId: string, value: CommentI) => {
	try {
		return await api.post(`${POSTS_ENDPOINT}/${postId}/addComment`, { value })
	} catch (err) {
		console.error('Error adding comment', err)
		throw err
	}
}

export const deleteComment = async (postId: string, commentId: string) => {
	try {
		return await api.delete(`${POSTS_ENDPOINT}/${postId}/${commentId}`)
	} catch (err) {
		console.error('Error deleting comment', err)
		throw err
	}
}
