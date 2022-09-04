import { Divider, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { getPostsBySearch } from '../redux/posts'
import { CreateGradColor } from '../theme.ts'
import checkIsAdmin from '../utils/checkIsAdmin.ts'
import checkIsPostCreator from '../utils/checkIsPostCreator.ts'
import { getUserLocalStorage } from '../utils/getUserLocalStorage.ts'
import StaggeredSlideFade from './common/StaggeredSlideFade'
import Loading from './Loading'
import Post from './Post'

const Tags = () => {
	const dispatch = useDispatch()
	const { name } = useParams()
	const { posts, loading } = useSelector(state => state.posts)
	const user = getUserLocalStorage()
	const userEmail = user?.result?.email
	const isAdmin = checkIsAdmin(userEmail)

	const publicPosts = posts?.filter(post => {
		const isPrivate = post?.privacy === 'private'
		const creator = post?.creator
		const isPostCreator = checkIsPostCreator(user, creator)

		return !isPrivate || (isPrivate && isPostCreator) || isAdmin
	})

	useEffect(() => {
		dispatch(getPostsBySearch({ tags: name }))
	}, [dispatch, name])

	if (!publicPosts.length && !loading) {
		return (
			<Flex align='center' direction='column' h='100%' marginY='64px' minHeight='100vh'>
				<Text color='primary.400' fontSize='6xl' marginBottom='16px'>
					<FaSearch />
				</Text>
				<Heading
					as='h2'
					bgClip='text'
					bgGradient={CreateGradColor('primary', 300, 900, 50, 400)}
					fontSize='4xl'
					fontWeight='bold'
				>
					No posts found for &quot;#{name}&quot;
				</Heading>
			</Flex>
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
				<Text fontSize='2xl'>#{name?.toUpperCase()}</Text>
				<Text fontSize='md'>
					{!loading && posts?.length
						? posts.length !== 1
							? `${posts.length} Posts`
							: `${posts.length} Post`
						: ''}
				</Text>
			</Stack>

			<Divider />

			{loading ? (
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

export default Tags
