import { NotificationType } from '../types'

export const displayNotificationType = (type: NotificationType) => {
	switch (type) {
		case 'like':
			return 'liked your post.'
		case 'comment':
			return 'commented on your post.'
		case 'save':
			return 'saved your post.'
		default:
			return ''
	}
}
