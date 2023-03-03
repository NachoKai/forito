const regEx = /^[a-zA-Z0-9_.-]*$/

export const calculateValidTags = (tags: string[]) => {
	const uniqueTags = [...new Set(tags)]

	return uniqueTags.every(tag => regEx.test(tag))
}
