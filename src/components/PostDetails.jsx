import {
	AspectRatio,
	Badge,
	Button,
	Divider,
	Flex,
	HStack,
	Heading,
	Image,
	Skeleton,
	Stack,
	Text,
	Tooltip,
} from '@chakra-ui/react'
import { format, formatDistance, isValid } from 'date-fns'
import { motion, useScroll } from 'framer-motion'
import Linkify from 'linkify-react'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useMemo } from 'react'
import { FaSearch, FaTwitter } from 'react-icons/fa'
import { RiGitRepositoryPrivateFill } from 'react-icons/ri'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { v4 as uuid } from 'uuid'

import { Comments } from '../components/Comments'
import { usePostsStore } from '../state/postsStore'
import { CreateGradColor, getColorTheme } from '../theme'
import { checkIsAdmin } from '../utils/checkIsAdmin'
import { checkIsPostCreator } from '../utils/checkIsPostCreator'
import { StaggeredSlideFade } from './common/StaggeredSlideFade'

const DATE_FORMAT = 'dd MMM yyyy • hh:mmaaa'

const PostDetails = ({ user }) => {
	const navigate = useNavigate()
	const { scrollYProgress } = useScroll()
	const { id } = useParams()
	const { post, posts, getPost, loading, getPostsBySearch } = usePostsStore()
	const postComments = post?.comments
	const postId = post?._id

	const recommendedPosts = useMemo(
		() => posts?.filter(({ _id }) => _id !== post?._id),
		[post?._id, posts]
	)

	const userEmail = user?.result?.email
	const isPrivate = post?.privacy === 'private'
	const isPostCreator = checkIsPostCreator(user, post?.creator)
	const isAdmin = checkIsAdmin(userEmail)
	const showPost = !isPrivate || (isPrivate && isPostCreator) || isAdmin
	const progressBarColor = getColorTheme()
	const baseURL = 'https://forito.vercel.app/posts'
	const createdAtDate = isValid(new Date(post?.createdAt))
		? new Date(post.createdAt)
		: new Date()
	const updatedAtDate = isValid(new Date(post?.updatedAt))
		? new Date(post.updatedAt)
		: null

	const openPost = useCallback(
		_id => {
			navigate(`/posts/${_id}`)
		},
		[navigate]
	)

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
		getPost(id)
	}, [getPost, id])

	// Recommended Posts search
	useEffect(() => {
		if (!post) return
		if (post) {
			const searchQuery = { search: 'none', tags: post?.tags.join(',') }

			getPostsBySearch(searchQuery)
		}
	}, [getPostsBySearch, post])

	return post && showPost && !loading ? (
		<Stack
			borderRadius='24px'
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
						<HStack align='flex-start' justify='space-between' w='100%'>
							<Heading as='h2' data-cy='post-details-title' size='xl'>
								{post?.title}
							</Heading>
							{isPrivate && (
								<Tooltip
									hasArrow
									arrowSize={8}
									border='1px solid #000'
									borderRadius='8px'
									label='Post only visible to you'
									openDelay={150}
									placement='top'
								>
									<span>
										<RiGitRepositoryPrivateFill />
									</span>
								</Tooltip>
							)}
						</HStack>

						<Text data-cy='post-details-message' fontSize='lg' whiteSpace='pre-wrap'>
							<Linkify>{post?.message}</Linkify>
						</Text>
					</Stack>

					{post?.selectedFile?.url && (
						<Image
							alt={post?.alt || post?.title}
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

				<HStack spacing='2'>
					<Stack spacing='4' w='100%'>
						<Flex align='center' justify='space-between'>
							<Text fontSize='md'>Tags:</Text>
							{!isPrivate && (
								<HStack align='flex-start' h='100%' justify='flex-end' spacing='8px'>
									<Button
										className='button'
										rightIcon={<FaTwitter />}
										size='xs'
										onClick={() => shareOnTwitter()}
									>
										Share
									</Button>
								</HStack>
							)}
						</Flex>
						<HStack spacing='2'>
							{post?.tags?.length ? (
								[...new Set(post?.tags)].filter(Boolean).map(tag => (
									<Badge
										key={uuid()}
										bg='primary.600'
										borderRadius='4px'
										color='white'
										data-cy='post-details-tags'
									>
										<Link to={`/tags/${tag}`}>{` #${tag} `}</Link>
									</Badge>
								))
							) : (
								<Text color='gray.500'>No tags yet</Text>
							)}
						</HStack>
						<Flex align='center' justify='space-between' w='100%'>
							<Stack
								direction={{ sm: 'column', md: 'column', lg: 'row', xl: 'row' }}
								spacing='2'
							>
								<Text fontSize='md'>Created by:</Text>
								<HStack>
									<Text fontSize='md' fontWeight='bold'>
										<Link to={`/creator/${post?.creator}`}>{` ${post?.name}`}</Link>
									</Text>
									<span>•</span>
									<Tooltip
										hasArrow
										arrowSize={8}
										border='1px solid #000'
										borderRadius='8px'
										label={
											updatedAtDate ? (
												<>
													<Text>{format(createdAtDate, DATE_FORMAT)}</Text>
													<Text fontSize='xs'>
														Edited: {format(updatedAtDate, DATE_FORMAT)}
													</Text>
												</>
											) : (
												<Text>{format(createdAtDate, DATE_FORMAT)}</Text>
											)
										}
										openDelay={150}
										placement='top'
									>
										<Text fontSize='md'>
											{formatDistance(
												new Date(),
												post?.createdAt ? new Date(post?.createdAt) : new Date()
											) + ' ago'}
										</Text>
									</Tooltip>
								</HStack>
							</Stack>
						</Flex>
					</Stack>
				</HStack>

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
				<Comments postComments={postComments} postId={postId} user={user} />
			</StaggeredSlideFade>

			{Boolean(recommendedPosts?.length) && (
				<>
					<Divider />

					<Stack overflow='auto' spacing={{ sm: '6', md: '8', lg: '8', xl: '8' }}>
						<Text fontWeight='bold'>You might also like:</Text>
						<HStack
							align='flex-start'
							className='recommended-posts'
							overflow='auto'
							spacing={{ sm: '6', md: '8', lg: '8', xl: '8' }}
							tabIndex='-1'
						>
							{recommendedPosts?.map(({ title, name, message, selectedFile, _id }) => (
								<Stack
									key={_id}
									as={Link}
									bg='primary_100_900'
									borderRadius='24px'
									className=' container recommended-post'
									color='primary_800_100'
									cursor='pointer'
									h='100%'
									m='2'
									maxW='320px'
									minW='320px'
									p={{ sm: '6', md: '8', lg: '8', xl: '8' }}
									spacing='2'
									to={`/posts/${_id}`}
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
													borderRadius='24px'
													fallback={
														<Skeleton
															borderRadius='24px'
															flexGrow='1'
															objectFit='cover'
															w='100%'
														/>
													}
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
						</HStack>
					</Stack>
				</>
			)}
		</Stack>
	) : (
		<StaggeredSlideFade
			align='center'
			direction='column'
			h='100%'
			minH='100vh'
			my='64px'
			p={{ sm: '6', md: '8', lg: '8', xl: '8' }}
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
			>
				Post not found.
			</Heading>
		</StaggeredSlideFade>
	)
}

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

export default PostDetails
