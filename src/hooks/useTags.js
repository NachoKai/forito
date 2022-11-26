import { useState } from 'react'

export const useTags = () => {
	const [searchTags, setSearchTags] = useState([])

	const handleAddTag = tag => setSearchTags([...searchTags, tag])

	const handleDeleteTag = tagToDelete =>
		setSearchTags(searchTags.filter(tag => tag !== tagToDelete))

	return { searchTags, setSearchTags, handleAddTag, handleDeleteTag }
}
