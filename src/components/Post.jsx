import { ChevronDownIcon } from '@chakra-ui/icons'
import {
	AspectRatio,
	Badge,
	Button,
	Heading,
	Image,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Skeleton,
	Stack,
	Text,
	Tooltip,
	VisuallyHidden,
	useBoolean,
} from '@chakra-ui/react'
import { format, formatDistance, isValid } from 'date-fns'
import Linkify from 'linkify-react'
import PropTypes from 'prop-types'
import { FaBookmark, FaEraser, FaPen, FaRegBookmark, FaRegComments } from 'react-icons/fa'
import { FiMoreHorizontal } from 'react-icons/fi'
import { RiGitRepositoryPrivateFill } from 'react-icons/ri'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import { usePostsStore } from '../state/postsStore'
import { checkIsAdmin } from '../utils/checkIsAdmin.ts'
import { checkIsPostCreator } from '../utils/checkIsPostCreator.ts'
import { getUserLocalStorage } from '../utils/getUserLocalStorage.ts'
import { showError } from '../utils/showError.ts'
import { useLocationQuery } from '../utils/useLocationQuery.ts'
import { Dialog } from './common/Dialog'
import { Likes } from './Likes'

export const Post = ({
	post: {
		_id,
		title,
		name,
		creator,
		message,
		likes,
		saves,
		privacy = 'public',
		createdAt,
		tags,
		selectedFile,
		comments,
	},
	onOpen,
}) => {
	const navigate = useNavigate()
	const { likePost, savePost, setCurrentId, deletePost, posts, getPosts } =
		usePostsStore()
	const user = getUserLocalStorage()
	const userId = user?.result?.googleId || user?.result?._id
	const hasUserLike = Boolean(likes?.find(like => like === userId))
	const hasUserSaved = saves?.find(save => save === userId)
	const location = useLocation()
	const userEmail = user?.result?.email
	const [isDialogOpen, setIsDialogOpen] = useBoolean()
	const [saveLoading, setSaveLoading] = useBoolean()
	const [likeLoading, setLikeLoading] = useBoolean()
	const isPrivate = privacy === 'private'
	const isPostCreator = checkIsPostCreator(user, creator)
	const isAdmin = checkIsAdmin(userEmail)
	const showPost = !isPrivate || (isPrivate && isPostCreator) || isAdmin
	const locationQuery = useLocationQuery()
	const page = Number(locationQuery.get('page') || 1)

	const handleLike = async () => {
		try {
			await setLikeLoading.on()
			await likePost(_id)
			await setLikeLoading.off()
		} catch (err) {
			showError('Something went wrong when trying to like post. Please try again.')
			console.error(err)
		}
	}

	const handleSave = async () => {
		try {
			await setSaveLoading.on()
			await savePost(_id)
			await setSaveLoading.off()
		} catch (err) {
			showError('Something went wrong when trying to like post. Please try again.')
			console.error(err)
		}
	}

	const openPost = () => navigate(`/posts/${_id}`)

	const openComments = () => navigate(`/posts/${_id}#comments`)

	const handleEdit = () => {
		onOpen()
		setCurrentId(_id)
	}

	const handleDelete = async () => {
		try {
			await deletePost(_id)
			setIsDialogOpen.off()

			if (posts.length === 1 && page > 1) {
				navigate(`/posts?page=${page - 1}`)
			}

			getPosts(page)
		} catch (err) {
			showError('Something went wrong when trying to delete post. Please try again.')
			console.error(err)
		}
	}

	return (
		<>
			{showPost ? (
				<Stack
					bg='primary_100_900'
					borderRadius='24px'
					className='container'
					direction={{
						sm: 'column-reverse',
						md: 'column-reverse',
						lg: 'column-reverse',
						xl: 'row',
					}}
					display={showPost ? 'flex' : 'none'}
					h='100%'
					p={{ sm: '6', md: '8', lg: '8', xl: '8' }}
					spacing={{ sm: '6', md: '8', lg: '8', xl: '8' }}
					w='100%'
				>
					<Stack justify='space-between' spacing='4' w='100%'>
						<Stack direction='column' spacing='4'>
							<Stack direction='row'>
								<Heading
									as='h2'
									className='pointer'
									fontSize='2xl'
									w='100%'
									onClick={openPost}
								>
									{title}
								</Heading>
								{isPrivate && (
									<Tooltip
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

							<Stack direction='row' justify='space-between' w='100%'>
								<Stack align='center' direction='row'>
									<Text fontSize='sm' fontWeight='bold'>
										<Link to={`/creator/${creator}`}>{` ${name}`}</Link>
									</Text>
									<span>•</span>
									<Tooltip
										label={format(
											isValid(new Date(createdAt)) ? new Date(createdAt) : new Date(),
											'dd MMM yyyy - HH:mm'
										)}
										openDelay={200}
										placement='top'
									>
										<Text fontSize='sm'>
											{formatDistance(
												new Date(),
												createdAt ? new Date(createdAt) : new Date()
											) + ' ago'}
										</Text>
									</Tooltip>
								</Stack>
							</Stack>

							<Text
								fontSize='md'
								m={{ sm: '6', md: '8', lg: '8', xl: '8' }}
								noOfLines={[4, 6, 8, 10]}
								whiteSpace='pre-wrap'
							>
								<Linkify>{message}</Linkify>
							</Text>
						</Stack>

						<Stack direction='column' spacing='4'>
							<Stack direction='row' overflow='auto' spacing='2'>
								{[...new Set(tags)].filter(Boolean).map(tag => (
									<Badge key={uuid()} bg='primary.600' borderRadius='4px' color='white'>
										<Link to={`/tags/${tag}`}>{` #${tag} `}</Link>
									</Badge>
								))}
							</Stack>

							<Stack
								direction={{ sm: 'column', md: 'column', lg: 'row', xl: 'row' }}
								spacing='2'
							>
								<Stack
									direction='row'
									display={location?.pathname.includes('/posts') ? 'flex' : 'none'}
									spacing='2'
								>
									<Button
										className='button'
										leftIcon={<FaRegComments />}
										size='sm'
										variant='ghost'
										onClick={openComments}
									>
										{comments?.length} {comments?.length === 1 ? 'Comment' : 'Comments'}
									</Button>
									<Button
										className='button'
										disabled={!user?.result}
										isLoading={Boolean(likeLoading)}
										loadingText='Loading...'
										minWidth='80px'
										size='sm'
										variant={hasUserLike ? 'ghost' : 'outline'}
										onClick={handleLike}
									>
										<Likes hasUserLike={hasUserLike} likes={likes} />
									</Button>
									{(isPostCreator || isAdmin || userEmail) && (
										<Menu>
											<MenuButton
												as={Button}
												className='button'
												display={{ sm: 'flex', md: 'flex', lg: 'none', xl: 'none' }}
												rightIcon={<ChevronDownIcon />}
												size='sm'
												variant='ghost'
											>
												<FiMoreHorizontal />
												<VisuallyHidden>More Options</VisuallyHidden>
											</MenuButton>
											<MenuList border='2px solid #0d0d0d' className='button'>
												{Boolean(userEmail) && (
													<MenuItem onClick={handleSave}>
														<Stack align='center' direction='row' spacing='2'>
															{hasUserSaved ? <FaBookmark /> : <FaRegBookmark />}
															<Text fontWeight='bold'>
																{hasUserSaved ? 'Saved' : 'Save'}
															</Text>
														</Stack>
													</MenuItem>
												)}
												{Boolean(isPostCreator || isAdmin) && (
													<MenuItem onClick={handleEdit}>
														<Stack align='center' direction='row' spacing='2'>
															<FaPen /> <Text fontWeight='bold'>Edit</Text>
														</Stack>
													</MenuItem>
												)}
												{Boolean(isPostCreator || isAdmin) && (
													<MenuItem onClick={setIsDialogOpen.on}>
														<Stack align='center' direction='row' spacing='2'>
															<FaEraser />
															<Text fontWeight='bold'>Delete</Text>
														</Stack>
													</MenuItem>
												)}
											</MenuList>
										</Menu>
									)}
									{Boolean(userEmail) && (
										<Button
											className='button'
											disabled={!user?.result}
											display={{ sm: 'none', md: 'none', lg: 'flex', xl: 'flex' }}
											isLoading={Boolean(saveLoading)}
											leftIcon={hasUserSaved ? <FaBookmark /> : <FaRegBookmark />}
											loadingText='Loading...'
											minWidth='88px'
											size='sm'
											variant={hasUserSaved ? 'ghost' : 'outline'}
											onClick={handleSave}
										>
											{hasUserSaved ? 'Saved' : 'Save'}
										</Button>
									)}
								</Stack>

								<Stack
									direction='row'
									display={location?.pathname.includes('/posts') ? 'flex' : 'none'}
									spacing='2'
								>
									{Boolean(isPostCreator || isAdmin) && (
										<Button
											className='button'
											display={{ sm: 'none', md: 'none', lg: 'flex', xl: 'flex' }}
											leftIcon={<FaPen />}
											minWidth='88px'
											size='sm'
											variant='solid'
											onClick={handleEdit}
										>
											Edit
										</Button>
									)}
									{Boolean(isPostCreator || isAdmin) && (
										<Button
											bg='red_500_200'
											className='button'
											display={{
												sm: 'none',
												md: 'none',
												lg: 'flex',
												xl: 'flex',
											}}
											leftIcon={<FaEraser />}
											minWidth='88px'
											size='sm'
											variant='solid'
											onClick={setIsDialogOpen.on}
										>
											Delete
										</Button>
									)}
								</Stack>
							</Stack>
						</Stack>
					</Stack>

					{Boolean(selectedFile?.url) && (
						<AspectRatio
							maxH='80vh'
							maxW={{ sm: '100%', md: '100%', lg: '100%', xl: '500px' }}
							ratio={1}
							w='100%'
						>
							<Image
								alt={title}
								borderRadius='16px'
								className='pointer'
								fallback={<Skeleton flexGrow='1' />}
								flexGrow='1'
								objectFit='cover'
								src={selectedFile.url}
								onClick={openPost}
							/>
						</AspectRatio>
					)}

					<Dialog
						_id={_id}
						action={handleDelete}
						button='Delete'
						isDialogOpen={isDialogOpen}
						message='Are you sure you want to delete this post?'
						setIsDialogOpen={setIsDialogOpen}
						title='Delete Post'
					/>
				</Stack>
			) : null}
		</>
	)
}

Post.propTypes = {
	onOpen: PropTypes.func,
	post: PropTypes.shape({
		_id: PropTypes.string,
		title: PropTypes.string,
		name: PropTypes.string,
		creator: PropTypes.string,
		message: PropTypes.string,
		likes: PropTypes.arrayOf(PropTypes.string),
		saves: PropTypes.arrayOf(PropTypes.string),
		createdAt: PropTypes.string,
		tags: PropTypes.arrayOf(PropTypes.string),
		privacy: PropTypes.string,
		selectedFile: PropTypes.shape({
			url: PropTypes.string,
		}),
		comments: PropTypes.arrayOf(PropTypes.object),
	}),
}
