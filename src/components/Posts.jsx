import { Flex, Heading, Stack, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { FaSearch } from 'react-icons/fa'

import { CreateGradColor } from '../theme'
import { getPublicPosts } from '../utils/getPublicPosts'
import { Post } from './Post'
import { Loading } from './common/Loading'
import { StaggeredSlideFade } from './common/StaggeredSlideFade'

export const Posts = ({ onOpen, posts, highlight, isLoading }) => {
	const havePosts = posts?.length > 0
	const publicPosts = getPublicPosts(posts)

	if (isLoading) return <Loading />

	return (
		<Flex flexGrow='1' minH='100vh' w='100%'>
			<StaggeredSlideFade
				direction='column'
				spacing={{ sm: '6', md: '8', lg: '8', xl: '8' }}
				w='100%'
			>
				{havePosts ? (
					<StaggeredSlideFade
						direction='column'
						spacing={{ sm: '6', md: '8', lg: '8', xl: '8' }}
						w='100%'
					>
						{publicPosts?.map(post => (
							<Post key={post?._id} highlight={highlight} post={post} onOpen={onOpen} />
						))}
					</StaggeredSlideFade>
				) : (
					<Stack align='center' direction='column' my='64px' spacing='4'>
						<Text color='primary.400' fontSize='6xl'>
							<FaSearch />
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
				)}
			</StaggeredSlideFade>
		</Flex>
	)
}

Posts.propTypes = {
	onOpen: PropTypes.func,
	posts: PropTypes.array,
	highlight: PropTypes.string,
	isLoading: PropTypes.bool,
}
