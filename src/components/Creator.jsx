import { Divider, Heading, Stack, Text } from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { usePostsByCreator } from '../hooks/data/posts'

import { useGetUser } from '../hooks/data/user'
import { CreateGradColor } from '../theme'
import { getUserLocalStorage } from '../utils/getUserLocalStorage'
import { Loading } from './common/Loading'
import { StaggeredSlideFade } from './common/StaggeredSlideFade'
import { Post } from './Post'

const Creator = () => {
	const { id } = useParams()
	const { user } = useGetUser(id)
	const userLocalStorage = getUserLocalStorage()
	const userName = user?.name || userLocalStorage?.result?.name
	const { postsByCreator, isLoading } = usePostsByCreator(id)
	const postsByCreatorQuantity = postsByCreator?.length

	if (isLoading) {
		return <Loading />
	}

	if (!postsByCreatorQuantity) {
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
					{postsByCreatorQuantity
						? postsByCreatorQuantity !== 1
							? `${postsByCreatorQuantity} Posts`
							: `${postsByCreatorQuantity} Post`
						: ''}
				</Text>
			</Stack>

			<Divider />

			<StaggeredSlideFade spacing='3'>
				{postsByCreator?.map(post => (
					<Stack key={post._id}>
						<Post post={post} />
					</Stack>
				))}
			</StaggeredSlideFade>
		</StaggeredSlideFade>
	)
}

export default Creator
