import {
	Avatar,
	AvatarBadge,
	HStack,
	Popover,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
	useBoolean,
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { MdNotificationsActive } from 'react-icons/md'
import { v4 as uuid } from 'uuid'

const displayNotificationType = type => {
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

export const NotificationsNavbar = ({ colorMode }) => {
	const [isDropdownOpen, setIsDropdownOpen] = useBoolean()
	const notifications = []
	const notificationsQuantity = notifications?.length
	const hasNotifications = notificationsQuantity > 0

	return (
		<HStack align='center' spacing={{ sm: '4', md: '8', lg: '8', xl: '8' }}>
			<Popover
				isLazy
				closeOnBlur={true}
				isOpen={isDropdownOpen}
				returnFocusOnClose={false}
				onClose={setIsDropdownOpen.off}
				onOpen={setIsDropdownOpen.toggle}
			>
				<PopoverTrigger>
					<HStack align='center' as='button' cursor='pointer'>
						<Avatar
							bg='primary_500_200'
							icon={
								hasNotifications ? (
									<MdNotificationsActive
										color={colorMode === 'dark' ? '#000' : '#fff'}
										size='1.5rem'
									/>
								) : (
									<IoMdNotificationsOutline
										color={colorMode === 'dark' ? '#000' : '#fff'}
										size='1.5rem'
									/>
								)
							}
							size='sm'
						>
							{hasNotifications ? (
								<AvatarBadge bg='white' boxSize='1.5em' color='black'>
									{notificationsQuantity}
								</AvatarBadge>
							) : null}
						</Avatar>
					</HStack>
				</PopoverTrigger>
				<PopoverContent className='container'>
					<PopoverCloseButton />
					<PopoverHeader>Notifications</PopoverHeader>

					{hasNotifications ? (
						notifications.map(notification => (
							<Link
								key={uuid()}
								to={`/posts/${notification.postId}`}
								onClick={setIsDropdownOpen.off}
							>
								<PopoverBody
									_hover={{ bg: colorMode === 'dark' ? 'gray.600' : 'gray.100' }}
									borderRadius='md'
									cursor='pointer'
									fontWeight={notification.read ? 'normal' : 'bold'}
								>
									{notification.user.name} {displayNotificationType(notification.type)}
								</PopoverBody>
							</Link>
						))
					) : (
						<PopoverBody>There are no notifications.</PopoverBody>
					)}
				</PopoverContent>
			</Popover>
		</HStack>
	)
}

NotificationsNavbar.propTypes = {
	user: PropTypes.object,
	colorMode: PropTypes.string,
}
