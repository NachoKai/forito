import { Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { AiOutlineTrophy } from 'react-icons/ai'
import { FaSearch } from 'react-icons/fa'

import { useAllPosts } from '../hooks/data/posts'
import { CreateGradColor } from '../theme'
import { getTopPosts } from '../utils/getTopPosts'
import { Loading } from './common/Loading'
import { StaggeredSlideFade } from './common/StaggeredSlideFade'
import ErrorPage from './ErrorPage'
import { Post } from './Post'

const TopPosts = () => {
	const { allPosts, isSuccess, isLoading, isError, error } = useAllPosts()
	const postsWithLikes = allPosts?.filter(post => post?.likes?.length > 0)
	const havePosts = postsWithLikes?.length > 0
	const topPosts = isSuccess && getTopPosts(postsWithLikes, 5)

	if (isError) {
		console.error(error)

		return <ErrorPage />
	}

	if (isLoading) return <Loading />

	return (!isSuccess && !topPosts?.length) || !havePosts ? (
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
				No posts found
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
			<Stack align='center' direction='row' spacing='2'>
				<Text fontSize='2xl'>Top Posts</Text>
				<Text fontSize='2xl'>
					<AiOutlineTrophy />
				</Text>
			</Stack>

			<StaggeredSlideFade spacing='3'>
				{topPosts?.map(post => (
					<Post key={post._id} post={post} />
				))}
			</StaggeredSlideFade>
		</StaggeredSlideFade>
	)
}

export default TopPosts
