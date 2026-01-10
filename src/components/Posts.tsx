import { Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'

import { PostI } from '../types'
import { CreateGradColor } from '../theme'
import { getPublicPosts } from '../utils/getPublicPosts'
import { Post } from './Post'
import { StaggeredSlideFade } from './common/StaggeredSlideFade'

interface PostsProps {
	onOpen?: () => void
	posts?: PostI[]
	highlight?: string
}

export const Posts = ({ onOpen, posts, highlight }: PostsProps) => {
	const havePosts = posts?.length && posts.length > 0
	const publicPosts = posts?.length && getPublicPosts(posts)

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
