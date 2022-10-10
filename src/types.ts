export interface SearchQueryI {
	search: string
	tags: string
}

export interface CommentI {
	userId: string
	name: string
	comment: string
	commentId: string
}
export interface PostI {
	_id: string
	title: string
	message: string
	tags: string[]
	selectedFile: string
	privacy: string
	creator: string
	createdAt: string
	updatedAt: string
	__v: number
}

export interface FormDataI {
	firstName: string
	lastName: string
	email: string
	password: string
	confirmPassword: string
}