import { Divider, Heading, Stack, Text } from '@chakra-ui/react'
import { useEffect, useMemo } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useParams } from 'react-router-dom'

import { usePostsStore } from '../state/postsStore'
import { CreateGradColor } from '../theme'
import { checkIsAdmin } from '../utils/checkIsAdmin'
import { checkIsPostCreator } from '../utils/checkIsPostCreator'
import { getUserLocalStorage } from '../utils/getUserLocalStorage'
import { StaggeredSlideFade } from './common/StaggeredSlideFade'
import { Post } from './Post'

const SavedPosts = () => {
	const { id } = useParams()
	const { posts, loading, getSavedPosts } = usePostsStore()
	const user = getUserLocalStorage()
	const userEmail = user?.result?.email
	const userId = user?.result?.googleId || user?.result?._id
	const isAdmin = checkIsAdmin(userEmail)

	const publicPosts = useMemo(
		() =>
			posts?.filter(post => {
				const isPrivate = post?.privacy === 'private'
				const creator = post?.creator
				const isPostCreator = checkIsPostCreator(user, creator)

				return !isPrivate || (isPrivate && isPostCreator) || isAdmin
			}),
		[isAdmin, posts, user]
	)

	useEffect(() => {
		if (userId === id) getSavedPosts(id)
	}, [getSavedPosts, id, userId])

	if ((!publicPosts?.length && !loading) || userId !== id) {
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
					{posts?.length
						? posts?.length === 1
							? `${posts?.length} Post`
							: `${posts?.length} Posts`
						: ''}
				</Text>
			</Stack>

			<Divider />

			<StaggeredSlideFade spacing='3'>
				{posts?.map(post => (
					<Post key={post._id} post={post} />
				))}
			</StaggeredSlideFade>
		</StaggeredSlideFade>
	)
}

export default SavedPosts
