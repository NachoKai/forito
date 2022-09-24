import { Flex, Heading, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { FaPencilAlt } from 'react-icons/fa'

import { usePostsStore } from '../state/postsStore'
import { CreateGradColor } from '../theme.ts'
import { StaggeredSlideFade } from './common/StaggeredSlideFade'
import { Post } from './Post'

const TopPosts = () => {
	const { posts, getAllPosts } = usePostsStore()
	const havePosts = posts?.length > 0

	const getTopPosts = max => {
		if (!havePosts) return
		const postsCopy = [...posts]
		const sortedPosts = postsCopy?.sort((a, b) => b?.likes?.length - a?.likes?.length)

		return sortedPosts?.slice(0, max)
	}

	const topPosts = getTopPosts(5)

	useEffect(() => {
		getAllPosts()
	}, [getAllPosts])

	return (
		<StaggeredSlideFade
			flexGrow
			direction='column'
			minHeight='100vh'
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
					<Flex align='center' direction='column' marginY='64px'>
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
