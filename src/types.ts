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
	selectedFile?: {
		url?: string
		name?: string
		id?: string
	}
	privacy: string
	creator: string
	createdAt: string
	updatedAt: string
	likes: string[]
	saves: string[]
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
		name?: string
		email: string
		birthday?: string
		createdAt: string
		updatedAt: string
		__v: number
		googleId: string
	}
	token?: string
}

export type NotificationType = 'like' | 'comment' | 'save'

export interface NotificationI {
	_id: string
	postId: string
	read: boolean
	username: string
	type: NotificationType
	createdAt: string
}

export interface UserLocalStorageI {
	result?: UserI['result']
	token: string
}
