import { NotificationI } from '../types'

export const calculateLastNotifications = (
	notifications: NotificationI[],
	quantity: number
): NotificationI[] => {
	if (!notifications || isNaN(quantity)) return []

	return [...notifications]
		.sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf())
		.slice(0, quantity || 5)
}
