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
	useColorModeValue,
} from '@chakra-ui/react'
import { format, formatDistance, isValid } from 'date-fns'
import Linkify from 'linkify-react'
import PropTypes from 'prop-types'
import { memo, useCallback, useState } from 'react'
import { FaBookmark, FaEraser, FaPen, FaRegBookmark, FaRegComments } from 'react-icons/fa'
import { FiMoreHorizontal } from 'react-icons/fi'
import { RiGitRepositoryPrivateFill } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { deletePost, likePost, savePost, setCurrentId } from '../redux/posts'
import checkIsAdmin from '../utils/checkIsAdmin.ts'
import checkIsPostCreator from '../utils/checkIsPostCreator.ts'
import { getUserLocalStorage } from '../utils/getUserLocalStorage.ts'
import Dialog from './common/Dialog'
import Likes from './Likes'

const Post = ({
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
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const user = getUserLocalStorage()
	const userId = user?.result?.googleId || user?.result?._id
	const isUserLike = Boolean(likes?.find(like => like === userId))
	const hasUserSaved = saves?.find(save => save === userId)
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const location = useLocation()
	const userEmail = user?.result?.email
	const [saveLoading, setSaveLoading] = useState(false)
	const [likeLoading, setLikeLoading] = useState(false)
	const textShadow = useColorModeValue(
		`0 0 2px rgba(0,0,0,0.3)`,
		`0 0 2px rgba(255,255,255,0.3)`
	)
	const isPrivate = privacy === 'private'
	const isPostCreator = checkIsPostCreator(user, creator)
	const isAdmin = checkIsAdmin(userEmail)
	const showPost = !isPrivate || (isPrivate && isPostCreator) || isAdmin

	const handleLike = useCallback(async () => {
		await setLikeLoading(true)
		await dispatch(likePost(_id))
		await setLikeLoading(false)
	}, [_id, dispatch])

	const handleSave = useCallback(async () => {
		await setSaveLoading(true)
		await dispatch(savePost(_id))
		await setSaveLoading(false)
	}, [_id, dispatch])

	const openPost = useCallback(() => navigate(`/posts/${_id}`), [_id, navigate])

	const openComments = useCallback(
		() => navigate(`/posts/${_id}#comments`),
		[_id, navigate]
	)

	const handleEdit = useCallback(() => {
		onOpen()
		dispatch(setCurrentId(_id))
	}, [_id, dispatch, onOpen])

	return (
		<>
			{showPost ? (
				<Stack
					bg='primary_100_900'
					borderRadius='lg'
					boxShadow='lg'
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
									textShadow={textShadow}
									w='100%'
									onClick={openPost}
								>
									{title}
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

							<Stack direction='row' justify='space-between' w='100%'>
								<Stack align='center' direction='row'>
									<Text fontSize='sm' fontWeight='bold'>
										<Link to={`/creator/${creator}`}>{` ${name}`}</Link>
									</Text>
									<span>•</span>
									<Tooltip
										hasArrow
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

							<Message
								fontSize='md'
								m={{ sm: '6', md: '8', lg: '8', xl: '8' }}
								noOfLines={[4, 6, 8, 10]}
								whiteSpace='pre-wrap'
							>
								<Linkify tagName='span'>{message}</Linkify>
							</Message>
						</Stack>

						<Stack direction='column' spacing='4'>
							<Stack direction='row' overflow='auto' spacing='2'>
								{[...new Set(tags)].filter(Boolean).map(tag => (
									<Badge key={Math.random()} bg='primary.600' color='white'>
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
										leftIcon={<FaRegComments />}
										size='sm'
										variant='ghost'
										onClick={openComments}
									>
										{comments?.length} {comments?.length === 1 ? 'Comment' : 'Comments'}
									</Button>
									<Button
										disabled={!user?.result}
										isLoading={!!likeLoading}
										loadingText='Loading...'
										minWidth='80px'
										size='sm'
										variant={isUserLike ? 'ghost' : 'outline'}
										onClick={handleLike}
									>
										<Likes isUserLike={isUserLike} likes={likes} />
									</Button>
									{(isPostCreator || isAdmin || userEmail) && (
										<Menu>
											<MenuButton
												as={Button}
												display={{ sm: 'flex', md: 'flex', lg: 'none', xl: 'none' }}
												rightIcon={<ChevronDownIcon />}
												size='sm'
												variant='ghost'
											>
												<FiMoreHorizontal />
												<VisuallyHidden>More Options</VisuallyHidden>
											</MenuButton>
											<MenuList>
												{!!userEmail && (
													<MenuItem onClick={handleSave}>
														<Stack align='center' direction='row' spacing='2'>
															{hasUserSaved ? <FaBookmark /> : <FaRegBookmark />}
															<Text fontWeight='bold'>
																{hasUserSaved ? 'Saved' : 'Save'}
															</Text>
														</Stack>
													</MenuItem>
												)}
												{!!(isPostCreator || isAdmin) && (
													<MenuItem onClick={handleEdit}>
														<Stack align='center' direction='row' spacing='2'>
															<FaPen /> <Text fontWeight='bold'>Edit</Text>
														</Stack>
													</MenuItem>
												)}
												{!!(isPostCreator || isAdmin) && (
													<MenuItem onClick={() => setIsDialogOpen(true)}>
														<Stack align='center' direction='row' spacing='2'>
															<FaEraser />
															<Text fontWeight='bold'>Delete</Text>
														</Stack>
													</MenuItem>
												)}
											</MenuList>
										</Menu>
									)}
									{!!userEmail && (
										<Button
											disabled={!user?.result}
											display={{ sm: 'none', md: 'none', lg: 'flex', xl: 'flex' }}
											isLoading={!!saveLoading}
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
									{!!(isPostCreator || isAdmin) && (
										<Button
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
									{!!(isPostCreator || isAdmin) && (
										<Button
											bg='red_500_200'
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
											onClick={() => setIsDialogOpen(true)}
										>
											Delete
										</Button>
									)}
								</Stack>
							</Stack>
						</Stack>
					</Stack>

					{!!selectedFile?.url && (
						<AspectRatio
							maxH='80vh'
							maxW={{ sm: '100%', md: '100%', lg: '100%', xl: '500px' }}
							ratio={1}
							w='100%'
						>
							<Image
								alt={title}
								borderRadius='lg'
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
						action={() => dispatch(deletePost(_id))}
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

export default memo(Post)

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

const Message = styled(Text)`
  white-space: pre-wrap;
	span a {
		text-decoration: underline;
    &:hover {
      font-weight: bold;
	}
`
