import { Heading, Stack, Text } from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'
import { useParams } from 'react-router-dom'

import { useSavedPosts } from '../hooks/data/posts'
import { CreateGradColor } from '../theme'
import { getPublicPosts } from '../utils/getPublicPosts'
import { getUserLocalStorage } from '../utils/getUserLocalStorage'
import { Post } from './Post'
import { Loading } from './common/Loading'
import { StaggeredSlideFade } from './common/StaggeredSlideFade'
import ErrorPage from './ErrorPage'

const SavedPosts = () => {
	const user = getUserLocalStorage()
	const userId = user?.result?.googleId || user?.result?._id
	const { id } = useParams<{ id: string }>()
	const { savedPosts, count, isLoading, isSuccess, isError, error } = useSavedPosts(id)
	const publicPosts = isSuccess && count > 0 && getPublicPosts(savedPosts)

	if (userId !== id) return null
	if (isError) return <ErrorPage error={error} />
	if (isLoading) return <Loading />

	if (!publicPosts?.length) {
		return (
			<StaggeredSlideFade
				align='center'
				direction='column'
				h='100%'
				minH='100vh'
				my='64px'
				px={{ sm: '0', md: '10', lg: '16', xl: '24' }}
				py={{ sm: '4', md: '6', lg: '8', xl: '8' }}
			>
				<Text color='primary.400' fontSize='6xl' mb='16px'>
					<FaSearch />
				</Text>
				<Heading
					as='h2'
					bgClip='text'
					bgGradient={CreateGradColor('primary', 300, 900, 50, 400)}
					fontSize='4xl'
					fontWeight='bold'
					px={{ sm: '4' }}
				>
					No saved posts were found.
				</Heading>
			</StaggeredSlideFade>
		)
	}

	return (
		<StaggeredSlideFade
			borderRadius='24px'
			h='100%'
			minH='100vh'
			p={{ sm: '6', md: '8', lg: '8', xl: '8' }}
			spacing={{ sm: '6', md: '8', lg: '8', xl: '8' }}
		>
			<Stack spacing='2'>
				<Text fontSize='2xl'>Saved Posts</Text>
				<Text fontSize='md'>
					{count ? (count === 1 ? `${count} Post` : `${count} Posts`) : ''}
				</Text>
			</Stack>

			<StaggeredSlideFade spacing='3'>
				{savedPosts?.map(post => (
					<Post key={post._id} post={post} />
				))}
			</StaggeredSlideFade>
		</StaggeredSlideFade>
	)
}

export default SavedPosts
