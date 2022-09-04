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
import { motion, useScroll } from 'framer-motion'
import Linkify from 'linkify-react'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { FaSearch, FaTwitter } from 'react-icons/fa'
import { RiGitRepositoryPrivateFill } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { v4 as uuid } from 'uuid'

import Comments from '../components/Comments'
import { getPost, getPostsBySearch } from '../redux/posts'
import { CreateGradColor, getColorTheme } from '../theme.ts'
import checkIsAdmin from '../utils/checkIsAdmin.ts'
import { isDev } from '../utils/checkIsDev.ts'
import checkIsPostCreator from '../utils/checkIsPostCreator.ts'
import StaggeredSlideFade from './common/StaggeredSlideFade'

const PostDetails = ({ user }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { scrollYProgress } = useScroll()
	const { id } = useParams()
	const { post, posts } = useSelector(state => state.posts)
	const recommendedPosts = posts.filter(({ _id }) => _id !== post?._id)
	const userEmail = user?.result?.email
	const isPrivate = post?.privacy === 'private'
	const isPostCreator = checkIsPostCreator(user, post?.creator)
	const isAdmin = checkIsAdmin(userEmail)
	const showPost = !isPrivate || (isPrivate && isPostCreator) || isAdmin
	const progressBarColor = getColorTheme()
	const baseURL = isDev
		? 'http://localhost:3000/posts'
		: 'https://forito.vercel.app/posts'

	const openPost = _id => navigate(`/posts/${_id}`)

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
		if (post) dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [post])

	return post && showPost ? (
		<Stack
			borderRadius='lg'
			display={showPost ? 'block' : 'none'}
			px={{ sm: '6', md: '10', lg: '16', xl: '24' }}
			py={{ sm: '6', md: '6', lg: '8', xl: '8' }}
			spacing={{ sm: '6', md: '8', lg: '8', xl: '8' }}
		>
			<ProgressBar style={{ scaleX: scrollYProgress }} theme={progressBarColor?.[500]} />
			<StaggeredSlideFade spacing={{ sm: '6', md: '8', lg: '8', xl: '8' }}>
				<Stack
					direction={{ sm: 'column', md: 'column', lg: 'row', xl: 'row' }}
					spacing={{ sm: '6', md: '8', lg: '8', xl: '8' }}
				>
					<Stack spacing={{ sm: '6', md: '8', lg: '8', xl: '8' }} w='100%'>
						<Stack align='center' direction='row' justify='space-between' w='100%'>
							<Heading as='h2' data-cy='post-details-title' size='xl'>
								{post?.title}
							</Heading>
							{isPrivate && (
								<Tooltip
									hasArrow
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
							<Linkify>{post?.message}</Linkify>
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

				<Divider />

				<Stack direction='row' spacing='2'>
					<Stack spacing='4' w='100%'>
						<Stack direction='row' spacing='2'>
							{post?.tags &&
								[...new Set(post?.tags)].filter(Boolean).map(tag => (
									<Badge
										key={uuid()}
										bg='primary.600'
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

				<Divider />

				<Text
					bgClip='text'
					bgGradient={CreateGradColor('primary', 300, 900, 50, 400)}
					fontSize='lg'
					fontWeight='bold'
					id='comments'
				>
					Comments
				</Text>
				<Comments postComments={post?.comments} postId={post?._id} user={user} />
			</StaggeredSlideFade>

			{!!recommendedPosts?.length && (
				<>
					<Divider />

					<Stack overflow='auto' spacing={{ sm: '6', md: '8', lg: '8', xl: '8' }}>
						<Text fontWeight='bold'>You might also like:</Text>
						<Stack
							className='recommended-posts'
							direction='row'
							overflow='auto'
							spacing={{ sm: '6', md: '8', lg: '8', xl: '8' }}
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
									p={{ sm: '6', md: '8', lg: '8', xl: '8' }}
									spacing='2'
									onClick={() => openPost(_id)}
								>
									<Heading
										as='h2'
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
			p={{ sm: '6', md: '8', lg: '8', xl: '8' }}
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

const ProgressBar = styled(motion.div)`
	position: fixed;
	bottom: 0;
	z-index: 1;
	left: 0;
	right: 0;
	height: 6px;
	background-color: ${p => p.theme};
	transform-origin: 0%;
`

PostDetails.propTypes = {
	user: PropTypes.shape({
		result: PropTypes.shape({
			googleId: PropTypes.string,
			name: PropTypes.string,
			email: PropTypes.string,
		}),
	}),
}
