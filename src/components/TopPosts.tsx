import { Flex, Heading, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { FaPencilAlt } from 'react-icons/fa'

import { usePostsStore } from '../state/postsStore'
import { CreateGradColor } from '../theme'
import { PostI } from './../types'
import { StaggeredSlideFade } from './common/StaggeredSlideFade'
import { Post } from './Post'

const getTopPosts = (posts: PostI[], max: number) => {
	const sortedPosts = [...posts]?.sort((a, b) => b?.likes?.length - a?.likes?.length)

	return sortedPosts?.slice(0, max)
}

const TopPosts: React.FC = () => {
	const { posts, getAllPosts } = usePostsStore()
	const postsWithLikes = posts?.filter((post: PostI) => post?.likes?.length > 0)
	const havePosts = postsWithLikes?.length > 0
	const topPosts = getTopPosts(postsWithLikes, 5)

	useEffect(() => {
		getAllPosts()
	}, [getAllPosts])

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
				{!havePosts ? (
					<Flex align='center' direction='column' my='64px'>
						<Text color='primary.400' fontSize='6xl'>
							<FaPencilAlt />
						</Text>
						<Text color='primary.400' fontSize='6xl'>
							No posts found
						</Text>
					</Flex>
				) : (
					topPosts?.map(post => <Post key={post?._id} post={post} />)
				)}
			</StaggeredSlideFade>
		</StaggeredSlideFade>
	)
}

export default TopPosts
