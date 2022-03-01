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
	Stack,
	Text,
} from '@chakra-ui/react'
import { formatDistance } from 'date-fns'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FaTwitter } from 'react-icons/fa'

import { getPost, getPostsBySearch } from '../redux/posts'
import { getRandomId } from '../utils/getRandomId'
import Comments from '../components/Comments'
import Loading from './Loading'
import { CreateGradColor } from '../theme'
import StaggeredSlideFade from './common/StaggeredSlideFade'

const PostDetails = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { id } = useParams()
	const { post, posts, isLoading } = useSelector(state => state.posts)
	const recommendedPosts = posts.filter(({ _id }) => _id !== post?._id)
	const isDev = process.env.NODE_ENV !== 'production'
	const baseURL = isDev
		? 'http://localhost:3000/posts'
		: 'https://forito.vercel.app/posts'

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

	return (
		<>
			{isLoading ? (
				<StaggeredSlideFade
					minHeight='100vh'
					p={{
						sm: '6',
						md: '8',
						lg: '8',
						xl: '8',
					}}
				>
					<Loading
						invert
						height={{ sm: '300px', md: '400px', lg: '500px', xl: '600px' }}
					/>
				</StaggeredSlideFade>
			) : (
				<Stack
					borderRadius='lg'
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
								<Heading as='h2' data-cy='post-details-title' size='xl'>
									{post?.title}
								</Heading>
								<Text data-cy='post-details-message' fontSize='lg' whiteSpace='pre-wrap'>
									{post?.message}
								</Text>
							</Stack>

							{post?.selectedFile?.url && (
								<Image
									alt={post?.title}
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
										<Text fontSize='md' fontWeight='bold'>
											<Link to={`/creator/${post?.creator}`}>{` ${post?.name}`}</Link>
										</Text>
										<Text fontSize='md'>
											{formatDistance(
												new Date(),
												post?.createdAt ? new Date(post?.createdAt) : new Date()
											) + ' ago'}
										</Text>
									</Stack>
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
						<Comments post={post} />
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
									{recommendedPosts?.map(
										({ title, name, message, selectedFile, _id }) => (
											<Stack
												key={_id}
												bg='primary_100_900'
												borderRadius='lg'
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
													noOfLines={[1, 1, 2]}
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
													<Text fontSize='md' noOfLines={[1, 2, 4]}>
														{message}
													</Text>
													{selectedFile?.url && (
														<AspectRatio maxH='80vh' ratio={1} w='100%'>
															<Image
																alt={post?.title}
																borderRadius='lg'
																flexGrow='1'
																objectFit='cover'
																src={selectedFile.url}
																w='100%'
															/>
														</AspectRatio>
													)}
												</Stack>
											</Stack>
										)
									)}
								</Stack>
							</Stack>
						</>
					)}
				</Stack>
			)}
		</>
	)
}

export default PostDetails
