const regEx = /^[a-zA-Z0-9_.-]*$/

export const calculateValidTags = (tags: string[]) =>
	[...new Set(tags)].every(tag => regEx.test(tag))
