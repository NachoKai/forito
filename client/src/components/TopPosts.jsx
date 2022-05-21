import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { FaPencilAlt } from 'react-icons/fa'

import Post from './Post'
import Loading from './Loading'
import StaggeredSlideFade from './common/StaggeredSlideFade'
import { getAllPosts } from '../redux/posts'
import { CreateGradColor } from '../theme'

const TopPosts = () => {
	const dispatch = useDispatch()
	const { posts, isLoading } = useSelector(state => state.posts)
	const havePosts = posts?.length > 0

	const getTopPosts = max => {
		if (!havePosts) return
		const postsCopy = [...posts]
		const sortedPosts = postsCopy?.sort((a, b) => b.likes.length - a.likes.length)
		const slicedArray = sortedPosts?.slice(0, max)

		return slicedArray
	}

	const topPosts = getTopPosts(5)

	useEffect(() => {
		dispatch(getAllPosts())
	}, [dispatch])

	return (
		<StaggeredSlideFade
			flexGrow
			direction='column'
			minHeight='100vh'
			px={{ sm: '0', md: '10', lg: '16', xl: '24' }}
			py={{ sm: '0', md: '6', lg: '8', xl: '8' }}
			spacing={{ sm: '6', md: '8', lg: '8', xl: '8' }}
			w='100%'
		>
			<Heading
				as='h3'
				bgClip='text'
				bgGradient={CreateGradColor('primary', 300, 900, 50, 400)}
				fontSize='4xl'
				fontWeight='bold'
			>
				Top Posts
			</Heading>

			{isLoading ? (
				<Stack
					minHeight='100vh'
					spacing={{ sm: '6', md: '8', lg: '8', xl: '8' }}
					w='100%'
				>
					<Loading />
				</Stack>
			) : (
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
			)}
		</StaggeredSlideFade>
	)
}

export default TopPosts
