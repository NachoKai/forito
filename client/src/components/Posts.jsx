import { useSelector } from 'react-redux'
import { Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { FaPencilAlt } from 'react-icons/fa'
import PropTypes from 'prop-types'

import Post from './Post'
import { CreateGradColor } from '../theme'
import Loading from './Loading'
import StaggeredSlideFade from './common/StaggeredSlideFade'

const Posts = ({ setCurrentId, handleScroll }) => {
	const { posts, isLoading } = useSelector(state => state.posts)
	const havePosts = posts?.length > 0

	return (
		<Flex flexGrow minHeight='100vh' w='100%'>
			{isLoading ? (
				<StaggeredSlideFade
					minHeight='100vh'
					spacing={{
						sm: '6',
						md: '8',
						lg: '8',
						xl: '8',
					}}
					w='100%'
				>
					<Loading />
					<Loading />
					<Loading />
				</StaggeredSlideFade>
			) : (
				<StaggeredSlideFade
					direction='column'
					spacing={{
						sm: '6',
						md: '8',
						lg: '8',
						xl: '8',
					}}
					w='100%'
				>
					{!havePosts ? (
						<Stack align='center' direction='column' marginY='64px' spacing='4'>
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
							spacing={{
								sm: '6',
								md: '8',
								lg: '8',
								xl: '8',
							}}
							w='100%'
						>
							{posts?.map(post => (
								<Post
									key={post?._id}
									handleScroll={handleScroll}
									post={post}
									setCurrentId={setCurrentId}
								/>
							))}
						</StaggeredSlideFade>
					)}
				</StaggeredSlideFade>
			)}
		</Flex>
	)
}

export default Posts

Posts.propTypes = {
	setCurrentId: PropTypes.func.isRequired,
	handleScroll: PropTypes.func.isRequired,
}
