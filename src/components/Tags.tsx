import { Divider, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useParams } from 'react-router-dom'

import { usePostsStore } from '../state/postsStore'
import { CreateGradColor } from '../theme'
import { PostI, UserI } from '../types'
import { checkIsAdmin } from '../utils/checkIsAdmin'
import { checkIsPostCreator } from '../utils/checkIsPostCreator'
import { getUserLocalStorage } from '../utils/getUserLocalStorage'
import { StaggeredSlideFade } from './common/StaggeredSlideFade'
import { Post } from './Post'

const Tags: React.FC = () => {
	const { name } = useParams()
	const { posts, loading, getPostsBySearch } = usePostsStore()
	const user: UserI = getUserLocalStorage()
	const userEmail = user?.result?.email
	const isAdmin = checkIsAdmin(userEmail)
	const title = posts?.length !== 1 ? `${posts?.length} Posts` : `${posts?.length} Post`

	const publicPosts = posts?.filter((post: PostI) => {
		const isPrivate = post?.privacy === 'private'
		const creator = post?.creator
		const isPostCreator = checkIsPostCreator(user, creator)

		return !isPrivate || (isPrivate && isPostCreator) || isAdmin
	})

	useEffect(() => {
		getPostsBySearch({ tags: name })
	}, [getPostsBySearch, name])

	return !publicPosts?.length && !loading ? (
		<Flex align='center' direction='column' h='100%' minH='100vh' my='64px'>
			<Text color='primary.400' fontSize='6xl' mb='16px'>
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
	) : (
		<StaggeredSlideFade
			borderRadius='24px'
			h='100%'
			minH='100vh'
			p={{ sm: '6', md: '8', lg: '8', xl: '8' }}
			spacing={{ sm: '6', md: '8', lg: '8', xl: '8' }}
		>
			<Stack spacing='2'>
				<Text fontSize='2xl'>#{name?.toUpperCase()}</Text>
				<Text fontSize='md'>{!loading && posts?.length ? title : ''}</Text>
			</Stack>

			<Divider />

			<StaggeredSlideFade spacing='3'>
				{posts?.map(post => (
					<Stack key={post._id}>
						<Post post={post} />
					</Stack>
				))}
			</StaggeredSlideFade>
		</StaggeredSlideFade>
	)
}

export default Tags