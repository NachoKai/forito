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
	likes: []
	saves: []
	alt: string
	name: string
	comments: CommentI[]
}

export interface FormDataI {
	firstName: string
	lastName: string
	email: string
	password: string
	confirmPassword: string
}

export interface UserI {
	result?: {
		_id: string
		firstName: string
		lastName: string
		email: string
		createdAt: string
		updatedAt: string
		__v: number
		googleId: string
	}
	token?: string
}

export interface NotificationI {
	_id: string
	postId: string
	read: boolean
	username: string
	type: string
	createdAt: string
}

export interface UserLocalStorageI {
	token: string
}
