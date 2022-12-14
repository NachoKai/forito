import { Heading, Stack, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { usePostsByCreator } from '../hooks/data/posts'

import { useAuthStore } from '../state/authStore'
import { CreateGradColor } from '../theme'
import { getUserLocalStorage } from '../utils/getUserLocalStorage'
import { StaggeredSlideFade } from './common/StaggeredSlideFade'
import { Post } from './Post'

const Creator = () => {
	const { id } = useParams()
	const { postsByCreator, count, isLoading } = usePostsByCreator(id)
	const { user, getUser } = useAuthStore()
	const userLocalStorage = getUserLocalStorage()
	const userName = user?.name || userLocalStorage?.result?.name

	useEffect(() => {
		getUser(id)
	}, [getUser, id])

	if (!postsByCreator?.length && !isLoading) {
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
					{userName
						? `No posts created by ${userName} were found.`
						: 'No posts created were found.'}
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
				<Text fontSize='2xl'>{userName || ''}</Text>
				<Text fontSize='md'>
					{!isLoading && count ? (count === 1 ? `${count} Post` : `${count} Posts`) : ''}
				</Text>
			</Stack>

			<StaggeredSlideFade spacing='3'>
				{postsByCreator?.map(post => (
					<Post key={post._id} post={post} />
				))}
			</StaggeredSlideFade>
		</StaggeredSlideFade>
	)
}

export default Creator
