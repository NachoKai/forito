import { useEffect } from 'react'
import { Divider, Heading, Stack, Text } from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { getUser } from '../redux/auth'
import { getPostsByCreator } from '../redux/posts'
import { CreateGradColor } from '../theme'
import StaggeredSlideFade from './common/StaggeredSlideFade'
import Loading from './Loading'
import Post from './Post'

const Creator = () => {
	const dispatch = useDispatch()
	const { id } = useParams()
	const { posts, isLoading } = useSelector(state => state.posts)
	const { user } = useSelector(state => state.auth)

	useEffect(() => {
		dispatch(getPostsByCreator(id))
		dispatch(getUser(id))
	}, [dispatch, id])

	if (!posts?.length && !isLoading) {
		return (
			<StaggeredSlideFade
				align='center'
				direction='column'
				h='100%'
				marginY='64px'
				minHeight='100vh'
				px={{ sm: '0', md: '10', lg: '16', xl: '24' }}
				py={{ sm: '4', md: '6', lg: '8', xl: '8' }}
			>
				<Text color='primary.400' fontSize='6xl' marginBottom='16px'>
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
					{user?.name
						? `No posts created by ${user?.name} were found.`
						: 'No posts created were found.'}
				</Heading>
			</StaggeredSlideFade>
		)
	}

	return (
		<StaggeredSlideFade
			borderRadius='lg'
			h='100%'
			minHeight='100vh'
			p={{ sm: '6', md: '8', lg: '8', xl: '8' }}
			spacing={{ sm: '6', md: '8', lg: '8', xl: '8' }}
		>
			<Stack spacing='2'>
				<Text fontSize='2xl'>{user?.name || ''}</Text>
				<Text fontSize='md'>
					{!isLoading && posts?.length
						? posts.length !== 1
							? `${posts.length} Posts`
							: `${posts.length} Post`
						: ''}
				</Text>
			</Stack>

			<Divider colorScheme='primary' />

			{isLoading ? (
				<Loading />
			) : (
				<StaggeredSlideFade spacing='3'>
					{posts?.map(post => (
						<Stack key={post._id}>
							<Post post={post} />
						</Stack>
					))}
				</StaggeredSlideFade>
			)}
		</StaggeredSlideFade>
	)
}

export default Creator
