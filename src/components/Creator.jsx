import { Heading, Stack, Text } from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'
import { useParams } from 'react-router-dom'

import { useGetUser } from '../hooks/data/auth'
import { usePostsByCreator } from '../hooks/data/posts'
import { CreateGradColor } from '../theme'
import ErrorPage from './ErrorPage'
import { Post } from './Post'
import { Loading } from './common/Loading'
import { StaggeredSlideFade } from './common/StaggeredSlideFade'

const Creator = () => {
	const { id } = useParams()
	const {
		user,
		isLoading: isUserLoading,
		isError: isUserError,
		error: userError,
	} = useGetUser(id)
	const {
		postsByCreator,
		count,
		isLoading: isPostsByCreatorLoading,
		isError: isPostsByCreatorError,
		error: postsByCreatorError,
	} = usePostsByCreator(id)
	const isLoading = isUserLoading || isPostsByCreatorLoading

	if (isUserError) return <ErrorPage error={userError} />
	if (isPostsByCreatorError) return <ErrorPage error={postsByCreatorError} />
	if (isLoading) return <Loading />

	return (
		<>
			{postsByCreator?.length ? (
				<StaggeredSlideFade
					borderRadius='24px'
					h='100%'
					minH='100vh'
					p={{ sm: '6', md: '8', lg: '8', xl: '8' }}
					spacing={{ sm: '6', md: '8', lg: '8', xl: '8' }}
				>
					<Stack spacing='2'>
						<Text fontSize='2xl'>{user?.name || ''}</Text>
						<Text fontSize='md'>
							{count ? (count === 1 ? `${count} Post` : `${count} Posts`) : ''}
						</Text>
					</Stack>
					<StaggeredSlideFade spacing='3'>
						{postsByCreator?.map(post => (
							<Post key={post._id} post={post} />
						))}
					</StaggeredSlideFade>
				</StaggeredSlideFade>
			) : (
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
						{user?.name
							? `No posts created by ${user?.name} were found.`
							: 'No posts created were found.'}
					</Heading>
				</StaggeredSlideFade>
			)}
		</>
	)
}

export default Creator
