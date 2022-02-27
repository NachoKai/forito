import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Divider, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'

import { getSavedPosts } from '../redux/posts'
import Post from './Post'
import { CreateGradColor } from '../theme'
import Loading from './Loading'

const SavedPosts = () => {
	const dispatch = useDispatch()
	const { id } = useParams()
	const { posts, isLoading } = useSelector(state => state.posts)

	useEffect(() => {
		dispatch(getSavedPosts(id))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (!posts?.length && !isLoading) {
		return (
			<Flex
				align='center'
				direction='column'
				h='100%'
				marginY='64px'
				minHeight='100vh'
				p={{
					sm: '6',
					md: '8',
					lg: '8',
					xl: '8',
				}}
			>
				<Text color='primary.400' fontSize='6xl' marginBottom='16px'>
					<FaSearch />
				</Text>
				<Heading
					as='h2'
					bgClip='text'
					bgGradient={CreateGradColor('primary', 300, 900, 50, 400)}
					fontSize='4xl'
					fontWeight='bold'
				>
					No saved posts were found.
				</Heading>
			</Flex>
		)
	}

	return (
		<Stack
			borderRadius='lg'
			h='100%'
			minHeight='100vh'
			p='32px'
			spacing={{
				sm: '6',
				md: '8',
				lg: '8',
				xl: '8',
			}}
		>
			<Stack spacing='2'>
				<Text fontSize='2xl'>Saved Posts</Text>
				<Text fontSize='md'>
					{posts?.length
						? posts.length !== 1
							? `${posts.length} Posts`
							: `${posts.length} Post`
						: ''}
				</Text>
			</Stack>

			<Divider colorScheme='primary' />

			{isLoading ? (
				<>
					<Loading />
					<Loading />
					<Loading />
					<Loading />
				</>
			) : (
				<Stack spacing='3'>
					{posts?.map(post => (
						<Stack key={post._id}>
							<Post post={post} />
						</Stack>
					))}
				</Stack>
			)}
		</Stack>
	)
}

export default SavedPosts
