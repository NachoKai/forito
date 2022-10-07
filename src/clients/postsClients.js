import { api } from '../api'

export const fetchAllPosts = () => {
	try {
		return api.get('/posts/top')
	} catch (err) {
		console.error('Error getting all posts', err)
	}
}

export const fetchPost = id => {
	try {
		return api.get(`/posts/${id}`)
	} catch (err) {
		console.error('Error getting post', err)
	}
}

export const fetchPosts = page => {
	try {
		return api.get(`/posts?page=${page}`)
	} catch (err) {
		console.error('Error getting posts', err)
	}
}

export const fetchPostsBySearch = searchQuery => {
	try {
		return api.get(
			`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`
		)
	} catch (err) {
		console.error('Error getting posts by search', err)
	}
}

export const fetchPostsByCreator = id => {
	try {
		return api.get(`/posts/creator?id=${id}`)
	} catch (err) {
		console.error('Error getting posts by creator', err)
	}
}

export const fetchSavedPosts = id => {
	try {
		return api.get(`/posts/saved?id=${id}`)
	} catch (err) {
		console.error('Error getting saved posts', err)
	}
}

export const createPost = newPost => {
	try {
		return api.post('/posts', newPost)
	} catch (err) {
		console.error('Error creating post', err)
	}
}

export const likePost = id => {
	try {
		return api.patch(`/posts/${id}/likePost`)
	} catch (err) {
		console.error('Error liking post', err)
	}
}

export const savePost = id => {
	try {
		return api.patch(`/posts/${id}/savePost`)
	} catch (err) {
		console.error('Error saving post', err)
	}
}

export const updatePost = (id, updatedPost) => {
	try {
		return api.patch(`/posts/${id}`, updatedPost)
	} catch (err) {
		console.error('Error updating post', err)
	}
}

export const deletePost = id => {
	try {
		return api.delete(`/posts/${id}`)
	} catch (err) {
		console.error('Error deleting post', err)
	}
}

export const addComment = (value, id) => {
	try {
		return api.post(`/posts/${id}/addComment`, { value })
	} catch (err) {
		console.error('Error adding comment', err)
	}
}

export const deleteComment = (id, commentId) => {
	try {
		return api.delete(`/posts/${id}/${commentId}`)
	} catch (err) {
		console.error('Error deleting comment', err)
	}
}
