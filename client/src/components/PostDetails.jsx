import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	AspectRatio,
	Badge,
	Button,
	Divider,
	Flex,
	Heading,
	Image,
	Skeleton,
	Stack,
	Text,
	Tooltip,
} from '@chakra-ui/react'
import { formatDistance } from 'date-fns'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FaSearch, FaTwitter } from 'react-icons/fa'
import { RiGitRepositoryPrivateFill } from 'react-icons/ri'

import { getPost, getPostsBySearch } from '../redux/posts'
import { getRandomId } from '../utils/getRandomId'
import Comments from '../components/Comments'
import { CreateGradColor } from '../theme'
import StaggeredSlideFade from './common/StaggeredSlideFade'
import { getUserLocalStorage } from '../utils/getUserLocalStorage'
import checkIsPostCreator from '../utils/checkIsPostCreator'
import checkIsAdmin from '../utils/checkIsAdmin'
import { isDev } from '../utils/checkIsDev'

const PostDetails = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { id } = useParams()
	const { post, posts } = useSelector(state => state.posts)
	const recommendedPosts = posts.filter(({ _id }) => _id !== post?._id)
	const baseURL = isDev
		? 'http://localhost:3000/posts'
		: 'https://forito.vercel.app/posts'
	const user = getUserLocalStorage()
	const userEmail = user?.result?.email
	const isPrivate = post?.privacy === 'private'
	const isPostCreator = checkIsPostCreator(user, post?.creator)
	const isAdmin = checkIsAdmin(userEmail)
	const showPost = !isPrivate || (isPrivate && isPostCreator) || isAdmin

	const openPost = useCallback(_id => navigate(`/posts/${_id}`), [navigate])

	const shareOnTwitter = () => {
		const url = `${baseURL}/${id}`

		window.open(
			`https://twitter.com/intent/tweet?text=${url}`,
			'targetWindow',
			'toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=300'
		)

		return false
	}

	useEffect(() => {
		dispatch(getPost(id))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id])

	// Recommended Posts search
	useEffect(() => {
		post && dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [post])

	return post && showPost ? (
		<Stack
			borderRadius='lg'
			display={showPost ? 'block' : 'none'}
			p='32px'
			spacing={{
				sm: '6',
				md: '8',
				lg: '8',
				xl: '8',
			}}
		>
			<StaggeredSlideFade
				spacing={{
					sm: '6',
					md: '8',
					lg: '8',
					xl: '8',
				}}
			>
				<Stack
					direction={{ sm: 'column', md: 'column', lg: 'row', xl: 'row' }}
					spacing={{
						sm: '6',
						md: '8',
						lg: '8',
						xl: '8',
					}}
				>
					<Stack
						spacing={{
							sm: '6',
							md: '8',
							lg: '8',
							xl: '8',
						}}
						w='100%'
					>
						<Stack align='center' direction='row' justify='space-between' w='100%'>
							<Heading as='h2' data-cy='post-details-title' size='xl'>
								{post?.title}
							</Heading>
							{isPrivate && (
								<Tooltip
									hasArrow
									colorScheme='primary'
									label='Post only visible to you'
									openDelay={200}
									placement='top'
								>
									<span>
										<RiGitRepositoryPrivateFill />
									</span>
								</Tooltip>
							)}
						</Stack>

						<Text data-cy='post-details-message' fontSize='lg' whiteSpace='pre-wrap'>
							{post?.message}
						</Text>
					</Stack>

					{post?.selectedFile?.url && (
						<Image
							alt={post?.title}
							fallback={
								<Skeleton
									flexGrow='1'
									maxH='90vh'
									maxW={{ sm: '100vw', md: '100vw', lg: '50vw', xl: '50vw' }}
									objectFit='contain'
									w='100%'
								/>
							}
							flexGrow='1'
							maxH='90vh'
							maxW={{ sm: '100vw', md: '100vw', lg: '50vw', xl: '50vw' }}
							objectFit='contain'
							src={post?.selectedFile?.url}
							w='100%'
						/>
					)}
				</Stack>

				<Divider colorScheme='primary' />

				<Stack direction='row' spacing='2'>
					<Stack spacing='4' w='100%'>
						<Stack direction='row' spacing='2'>
							{post?.tags &&
								[...new Set(post?.tags)]
									.filter(e => e)
									.map(tag => (
										<Badge
											key={getRandomId()}
											bg='primary.400'
											color='white'
											data-cy='post-details-tags'
										>
											<Link to={`/tags/${tag}`}>{` #${tag} `}</Link>
										</Badge>
									))}
						</Stack>
						<Flex align='center' justify='space-between' w='100%'>
							<Stack
								direction={{ sm: 'column', md: 'column', lg: 'row', xl: 'row' }}
								spacing='2'
							>
								<Text fontSize='md'>Created by:</Text>
								<Stack direction='row'>
									<Text fontSize='md' fontWeight='bold'>
										<Link to={`/creator/${post?.creator}`}>{` ${post?.name}`}</Link>
									</Text>
									<span>•</span>
									<Text fontSize='md'>
										{formatDistance(
											new Date(),
											post?.createdAt ? new Date(post?.createdAt) : new Date()
										) + ' ago'}
									</Text>
								</Stack>
							</Stack>
							{!isPrivate && (
								<Stack
									align='flex-start'
									direction='row'
									h='100%'
									justify='flex-end'
									spacing='8px'
								>
									<Button
										colorScheme='primary'
										rightIcon={<FaTwitter />}
										size='xs'
										onClick={() => shareOnTwitter()}
									>
										Share
									</Button>
								</Stack>
							)}
						</Flex>
					</Stack>
				</Stack>

				<Divider colorScheme='primary' />

				<Text
					bgClip='text'
					bgGradient={CreateGradColor('primary', 300, 900, 50, 400)}
					fontSize='lg'
					fontWeight='bold'
					id='comments'
				>
					Comments
				</Text>
				<Comments postComments={post?.comments} postId={post?._id} />
			</StaggeredSlideFade>

			{!!recommendedPosts?.length && (
				<>
					<Divider colorScheme='primary' />

					<Stack
						overflow='auto'
						spacing={{
							sm: '6',
							md: '8',
							lg: '8',
							xl: '8',
						}}
					>
						<Text fontWeight='bold'>You might also like:</Text>
						<Stack
							className='recommended-posts'
							direction='row'
							overflow='auto'
							spacing={{
								sm: '6',
								md: '8',
								lg: '8',
								xl: '8',
							}}
						>
							{recommendedPosts?.map(({ title, name, message, selectedFile, _id }) => (
								<Stack
									key={_id}
									bg='primary_100_900'
									borderRadius='lg'
									boxShadow='md'
									className='recommended-post'
									color='primary_800_100'
									cursor='pointer'
									h='100%'
									maxWidth='320px'
									minWidth='320px'
									p={{
										sm: '6',
										md: '8',
										lg: '8',
										xl: '8',
									}}
									spacing='2'
									onClick={() => openPost(_id)}
								>
									<Heading
										as='h3'
										fontSize='lg'
										fontWeight='bold'
										noOfLines={[1, 1, 2, 2]}
									>
										{title}
									</Heading>
									<Text fontSize='sm'>
										{name}{' '}
										{formatDistance(
											new Date(),
											post?.createdAt ? new Date(post?.createdAt) : new Date()
										) + ' ago'}
									</Text>
									<Stack spacing='4'>
										<Text fontSize='md' noOfLines={[1, 2, 4, 5]}>
											{message}
										</Text>
										{selectedFile?.url && (
											<AspectRatio maxH='80vh' ratio={1} w='100%'>
												<Image
													alt={post?.title}
													borderRadius='lg'
													fallback={<Skeleton flexGrow='1' objectFit='cover' w='100%' />}
													flexGrow='1'
													objectFit='cover'
													src={selectedFile.url}
													w='100%'
												/>
											</AspectRatio>
										)}
									</Stack>
								</Stack>
							))}
						</Stack>
					</Stack>
				</>
			)}
		</Stack>
	) : (
		<StaggeredSlideFade
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
				Post not found.
			</Heading>
		</StaggeredSlideFade>
	)
}

export default PostDetails
