import { Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'
import { useParams } from 'react-router-dom'

import { usePostsBySearch } from '../hooks/data/posts'
import { CreateGradColor } from '../theme'
import { PostI } from '../types'
import { getPublicPosts } from '../utils/getPublicPosts'
import ErrorPage from './ErrorPage'
import { Post } from './Post'
import { StaggeredSlideFade } from './common/StaggeredSlideFade'
import { Loading } from './common/Loading'

const Tags = () => {
	const { name } = useParams()
	const searchQuery = { tags: name }
	const { postsBySearch, isLoading, isError, error, isSuccess } =
		usePostsBySearch(searchQuery)
	const postsQuantity = postsBySearch?.length
	const title = postsQuantity === 1 ? `${postsQuantity} Post` : `${postsQuantity} Posts`
	const publicPosts = isSuccess && postsBySearch?.length && getPublicPosts(postsBySearch)

	if (isError) return <ErrorPage error={error} />
	if (isLoading) return <Loading />

	return publicPosts?.length ? (
		<StaggeredSlideFade
			borderRadius='24px'
			h='100%'
			minH='100vh'
			p={{ sm: '6', md: '8', lg: '8', xl: '8' }}
			spacing={{ sm: '6', md: '8', lg: '8', xl: '8' }}
		>
			<Stack spacing='2'>
				<Text fontSize='2xl'>#{name?.toUpperCase()}</Text>
				<Text fontSize='md'>{!isLoading && postsQuantity ? title : ''}</Text>
			</Stack>

			<StaggeredSlideFade spacing='3'>
				{postsBySearch?.map((post: PostI) => (
					<Post key={post._id} post={post} />
				))}
			</StaggeredSlideFade>
		</StaggeredSlideFade>
	) : (
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
	)
}

export default Tags
