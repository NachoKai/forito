import { Flex, Heading, Stack, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { FaPencilAlt } from 'react-icons/fa'

import { usePostsStore } from '../state/postsStore'
import { CreateGradColor } from '../theme'
import { checkIsAdmin } from '../utils/checkIsAdmin'
import { checkIsPostCreator } from '../utils/checkIsPostCreator'
import { getUserLocalStorage } from '../utils/getUserLocalStorage'
import { StaggeredSlideFade } from './common/StaggeredSlideFade'
import { Post } from './Post'

export const Posts = ({ onOpen, posts, highlight }) => {
	const { loading } = usePostsStore()
	const havePosts = posts?.length > 0
	const user = getUserLocalStorage()
	const userEmail = user?.result?.email
	const isAdmin = checkIsAdmin(userEmail)

	const publicPosts = posts?.filter(post => {
		const isPrivate = post?.privacy === 'private'
		const creator = post?.creator
		const isPostCreator = checkIsPostCreator(user, creator)

		return !isPrivate || (isPrivate && isPostCreator) || isAdmin
	})

	return (
		<Flex flexGrow='1' minH='100vh' w='100%'>
			<StaggeredSlideFade
				direction='column'
				spacing={{ sm: '6', md: '8', lg: '8', xl: '8' }}
				w='100%'
			>
				{!havePosts && !loading ? (
					<Stack align='center' direction='column' my='64px' spacing='4'>
						<Text color='primary.400' fontSize='6xl'>
							<FaPencilAlt />
						</Text>
						<Heading
							as='h2'
							bgClip='text'
							bgGradient={CreateGradColor('primary', 300, 900, 50, 400)}
							fontSize='4xl'
							fontWeight='bold'
						>
							No posts found
						</Heading>
					</Stack>
				) : (
					<StaggeredSlideFade
						direction='column'
						spacing={{ sm: '6', md: '8', lg: '8', xl: '8' }}
						w='100%'
					>
						{publicPosts?.map(post => (
							<Post key={post?._id} highlight={highlight} post={post} onOpen={onOpen} />
						))}
					</StaggeredSlideFade>
				)}
			</StaggeredSlideFade>
		</Flex>
	)
}

Posts.propTypes = {
	onOpen: PropTypes.func,
	posts: PropTypes.array,
	highlight: PropTypes.string,
}
