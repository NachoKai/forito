import { Flex, Heading, Text } from '@chakra-ui/react'
import { FaPencilAlt } from 'react-icons/fa'

import { useAllPosts } from '../hooks/data/posts'
import { CreateGradColor } from '../theme'
import { getTopPosts } from '../utils/getTopPosts'
import { Loading } from './common/Loading'
import { StaggeredSlideFade } from './common/StaggeredSlideFade'
import { Post } from './Post'

const TopPosts = () => {
	const { data, isLoading, isError, isSuccess, error } = useAllPosts()
	const posts = data?.data?.data
	const postsWithLikes = posts?.filter(post => post?.likes?.length > 0)
	const havePosts = postsWithLikes?.length > 0
	const topPosts = isSuccess && getTopPosts(postsWithLikes, 5)

	return (
		<StaggeredSlideFade
			direction='column'
			flexGrow='1'
			minH='100vh'
			px={{ sm: '0', md: '10', lg: '16', xl: '24' }}
			py={{ sm: '4', md: '6', lg: '8', xl: '8' }}
			spacing={{ sm: '6', md: '8', lg: '8', xl: '8' }}
			w='100%'
		>
			<Heading
				as='h3'
				bgClip='text'
				bgGradient={CreateGradColor('primary', 300, 900, 50, 400)}
				fontSize='4xl'
				fontWeight='bold'
				px={{ sm: '4' }}
			>
				Top Posts
			</Heading>

			<StaggeredSlideFade
				direction='column'
				spacing={{ sm: '6', md: '8', lg: '8', xl: '8' }}
				w='100%'
			>
				{isError ? (
					<Flex align='center' direction='column' my='64px'>
						<Text color='primary.400' fontSize='xl'>
							Error: {error}
						</Text>
					</Flex>
				) : isLoading ? (
					<Loading />
				) : isSuccess && havePosts ? (
					topPosts?.map(post => <Post key={post?._id} post={post} />)
				) : (
					<Flex align='center' direction='column' my='64px'>
						<Text color='primary.400' fontSize='6xl'>
							<FaPencilAlt />
						</Text>
						<Text color='primary.400' fontSize='6xl'>
							No posts found
						</Text>
					</Flex>
				)}
			</StaggeredSlideFade>
		</StaggeredSlideFade>
	)
}

export default TopPosts
