import { Flex, HStack, Heading, Stack, Text, useColorMode } from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import { IoMdNotificationsOutline } from 'react-icons/io'

import { formatDistance } from 'date-fns'
import { useNotifications } from '../hooks/data/auth'
import { CreateGradColor } from '../theme'
import { calculateLastNotifications } from '../utils/calculateLastNotifications'
import { displayNotificationType } from '../utils/displayNotificationType'
import { getUserLocalStorage } from '../utils/getUserLocalStorage'
import ErrorPage from './ErrorPage'
import { Loading } from './common/Loading'
import { StaggeredSlideFade } from './common/StaggeredSlideFade'

const Notifications = () => {
	const { id } = useParams()
	const user = getUserLocalStorage()
	const userId = user?.result?.googleId || user?.result?._id
	const { notifications, count, isSuccess, isError, error, isLoading, isFetching } =
		useNotifications(userId)
	const lastNotifications = isSuccess && calculateLastNotifications(notifications, 100)
	const { colorMode } = useColorMode()

	if (userId !== id) return null
	if (isError) return <ErrorPage error={error} />
	if (isLoading || isFetching) return <Loading />

	if (!lastNotifications?.length) {
		return (
			<StaggeredSlideFade
				align='center'
				direction='column'
				h='100%'
				minH='100vh'
				my='64px'
				px={{ sm: '0', md: '10', lg: '16', xl: '24' }}
				py={{ sm: '4', md: '6', lg: '8', xl: '8' }}
			>
				<Text color='primary.400' fontSize='6xl' mb='16px'>
					<FaSearch />
				</Text>
				<Heading
					as='h2'
					bgClip='text'
					bgGradient={CreateGradColor('primary', 300, 900, 50, 400)}
					fontSize='4xl'
					fontWeight='bold'
					px={{ sm: '4' }}
				>
					No notifications were found.
				</Heading>
			</StaggeredSlideFade>
		)
	}

	return (
		<StaggeredSlideFade
			borderRadius='24px'
			h='100%'
			minH='100vh'
			p={{ sm: '6', md: '8', lg: '8', xl: '8' }}
			spacing={{ sm: '6', md: '8', lg: '8', xl: '8' }}
		>
			<Stack spacing='2'>
				<HStack spacing='2'>
					<Text fontSize='2xl'>Notifications</Text>
					<Text fontSize='2xl'>
						<IoMdNotificationsOutline />
					</Text>
				</HStack>

				<Text fontSize='md'>
					{count
						? count === 1
							? `${count} Notification`
							: `${count} Notifications`
						: ''}
				</Text>
			</Stack>

			<StaggeredSlideFade spacing='3'>
				{lastNotifications?.map(notification => (
					<Link key={notification?._id} to={`/posts/${notification?.postId}`}>
						<Stack
							_hover={{ bg: colorMode === 'dark' ? 'gray.600' : 'gray.100' }}
							borderRadius='md'
							cursor='pointer'
							fontWeight={notification?.read ? 'normal' : 'bold'}
							p='2'
						>
							<Flex align='flex-start' justify='space-between' spacing='2'>
								<Text pr='8px' w='68%'>
									{notification?.username} {displayNotificationType(notification?.type)}
								</Text>
								<Text fontSize='sm' w='28%'>
									{`${formatDistance(new Date(), new Date(notification?.createdAt))} ago`}
								</Text>
							</Flex>
						</Stack>
					</Link>
				))}
			</StaggeredSlideFade>
		</StaggeredSlideFade>
	)
}

export default Notifications
