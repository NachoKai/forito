import { ChevronDownIcon } from '@chakra-ui/icons'
import {
	AspectRatio,
	Badge,
	Button,
	HStack,
	Heading,
	Highlight,
	Image,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Popover,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
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
import { useRef } from 'react'
import { FaBookmark, FaEraser, FaPen, FaRegBookmark, FaRegComments } from 'react-icons/fa'
import { FiMoreHorizontal } from 'react-icons/fi'
import { RiGitRepositoryPrivateFill } from 'react-icons/ri'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import { useDeletePost, usePosts } from '../hooks/data/posts'
import { useLike } from '../hooks/useLike'
import { useLocationQuery } from '../hooks/useLocationQuery'
import { useSave } from '../hooks/useSave'
import { usePostsStore } from '../state/postsStore'
import { checkIsAdmin } from '../utils/checkIsAdmin'
import { checkIsPostCreator } from '../utils/checkIsPostCreator'
import { getUserLocalStorage } from '../utils/getUserLocalStorage'
import { isEmpty } from '../utils/isEmpty'
import ErrorPage from './ErrorPage'
import { Likes } from './Likes'
import { Dialog } from './common/Dialog'

const DATE_FORMAT = 'dd MMM yyyy • hh:mmaaa'

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
		updatedAt,
		tags,
		selectedFile,
		comments,
		alt,
	},
	onOpen,
	highlight,
}) => {
	const navigate = useNavigate()
	const locationQuery = useLocationQuery()
	const location = useLocation()
	const pathname = location?.pathname
	const page = Number(locationQuery.get('page') || 1)
	const { posts, isError, error } = usePosts(page)
	const { mutateAsync: deletePost } = useDeletePost(page)
	const { setCurrentId } = usePostsStore()
	const user = getUserLocalStorage()
	const userId = user?.result?.googleId || user?.result?._id
	const hasUserLike = likes?.includes(userId)
	const hasUserSaved = saves?.includes(userId)
	const userEmail = user?.result?.email
	const [isDialogOpen, setIsDialogOpen] = useBoolean()
	const isPrivate = privacy === 'private'
	const isPostCreator = checkIsPostCreator(user, creator)
	const isAdmin = checkIsAdmin(userEmail)
	const showPost = !isPrivate || (isPrivate && isPostCreator) || isAdmin
	const initialFocusRef = useRef()
	const isUserLogged = !isEmpty(user?.result)
	const createdAtDate = isValid(new Date(createdAt)) ? new Date(createdAt) : new Date()
	const updatedAtDate = isValid(new Date(updatedAt)) ? new Date(updatedAt) : null
	const { handleLike, likeLoading } = useLike(_id, creator, isPostCreator, hasUserLike)
	const { handleSave, saveLoading } = useSave(_id, creator, isPostCreator, hasUserLike)
	const isSaved = (hasUserSaved && !saveLoading) || (!hasUserSaved && saveLoading)
	const isLiked = (hasUserLike && !likeLoading) || (!hasUserLike && likeLoading)

	const openPost = () => navigate(`/posts/${_id}`)

	const openComments = () => navigate(`/posts/${_id}#comments`)

	const handleEdit = async () => {
		await setCurrentId(_id)
		onOpen()
	}

	const handleDelete = async () => {
		try {
			await deletePost(_id)
			setIsDialogOpen.off()

			if (posts?.length === 1 && page > 1) {
				navigate(`/posts?page=${page - 1}`)
			}
		} catch (err) {
			console.error(err)
		}
	}

	if (isError) return <ErrorPage error={error} />

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
						<Stack spacing='4'>
							<HStack align='flex-start' justify='space-between'>
								<Heading
									as='button'
									className='pointer'
									fontFamily='Roboto Slab'
									fontSize='2xl'
									maxWidth='75ch'
									textAlign='left'
									onClick={openPost}
								>
									{highlight?.length ? (
										<Highlight
											query={highlight}
											styles={{
												py: '1',
												bg: 'highlight',
												color: 'bnw_900_100',
											}}
										>
											{title}
										</Highlight>
									) : (
										<>{title}</>
									)}
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

							<HStack justify='space-between' w='100%'>
								<HStack align='center'>
									<Text fontSize='sm' fontWeight='bold'>
										<Link to={`/creator/${creator}`}>{` ${name}`}</Link>
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
										<Text fontSize='sm'>
											{formatDistance(
												new Date(),
												createdAt ? new Date(createdAt) : new Date()
											) + ' ago'}
										</Text>
									</Tooltip>
								</HStack>
							</HStack>

							<Text
								fontFamily='Roboto'
								fontSize='md'
								maxWidth='75ch'
								noOfLines={[4, 6, 8, 10]}
								whiteSpace='pre-wrap'
							>
								<Linkify>{message}</Linkify>
							</Text>
						</Stack>

						<Stack spacing='4'>
							<HStack overflow='auto' spacing='2'>
								{[...new Set(tags)].filter(Boolean).map(tag => (
									<Badge key={uuid()} bg='primary.600' borderRadius='4px' color='white'>
										<Link to={`/tags/${tag}`}>{` #${tag} `}</Link>
									</Badge>
								))}
							</HStack>

							<Stack
								direction={{ sm: 'column', md: 'column', lg: 'row', xl: 'row' }}
								display={
									pathname !== '/posts/top' && pathname.includes('/posts')
										? 'flex'
										: 'none'
								}
								spacing='2'
							>
								<HStack spacing='2'>
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
										className={isUserLogged ? 'button' : ''}
										isDisabled={!isUserLogged}
										minW='80px'
										size='sm'
										variant={isLiked ? 'ghost' : 'outline'}
										onClick={handleLike}
									>
										<Likes isLiked={isLiked} likeLoading={likeLoading} likes={likes} />
									</Button>
									{(isPostCreator || isAdmin || userEmail) && (
										<Menu isLazy>
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
												{userEmail && (
													<MenuItem onClick={handleSave}>
														<HStack align='center' spacing='2'>
															{isSaved ? <FaBookmark /> : <FaRegBookmark />}
															<Text fontWeight='bold'>{isSaved ? 'Saved' : 'Save'}</Text>
														</HStack>
													</MenuItem>
												)}
												{(isPostCreator || isAdmin) && (
													<MenuItem onClick={handleEdit}>
														<HStack align='center' spacing='2'>
															<FaPen /> <Text fontWeight='bold'>Edit</Text>
														</HStack>
													</MenuItem>
												)}
												{(isPostCreator || isAdmin) && (
													<MenuItem onClick={setIsDialogOpen.on}>
														<HStack align='center' spacing='2'>
															<FaEraser />
															<Text fontWeight='bold'>Delete</Text>
														</HStack>
													</MenuItem>
												)}
											</MenuList>
										</Menu>
									)}
									{userEmail && (
										<Button
											className={isUserLogged ? 'button' : ''}
											display={{ sm: 'none', md: 'none', lg: 'flex', xl: 'flex' }}
											isDisabled={!isUserLogged}
											leftIcon={isSaved ? <FaBookmark /> : <FaRegBookmark />}
											minW='88px'
											size='sm'
											variant={isSaved ? 'ghost' : 'outline'}
											onClick={handleSave}
										>
											{isSaved ? 'Saved' : 'Save'}
										</Button>
									)}
								</HStack>

								<HStack spacing='2'>
									{(isPostCreator || isAdmin) && (
										<Button
											className='button'
											display={{ sm: 'none', md: 'none', lg: 'flex', xl: 'flex' }}
											leftIcon={<FaPen />}
											minW='88px'
											size='sm'
											variant='solid'
											onClick={handleEdit}
										>
											Edit
										</Button>
									)}
									{(isPostCreator || isAdmin) && (
										<Button
											className='button'
											colorScheme='red'
											display={{
												sm: 'none',
												md: 'none',
												lg: 'flex',
												xl: 'flex',
											}}
											leftIcon={<FaEraser />}
											minW='88px'
											size='sm'
											variant='solid'
											onClick={setIsDialogOpen.on}
										>
											Delete
										</Button>
									)}
								</HStack>
							</Stack>
						</Stack>
					</Stack>

					{selectedFile?.url && (
						<AspectRatio
							maxH='70vh'
							maxW={{ sm: '100%', md: '100%', lg: '100%', xl: '500px' }}
							ratio={1}
							w='100%'
						>
							<>
								<Image
									alt={alt || title}
									borderRadius='16px'
									className='pointer'
									fallback={<Skeleton borderRadius='16px' flexGrow='1' />}
									flexGrow='1'
									objectFit='cover'
									src={selectedFile.url}
									onClick={openPost}
								/>
								{alt ? (
									<Popover
										isLazy
										closeOnBlur={true}
										initialFocusRef={initialFocusRef}
										placement='bottom'
									>
										<PopoverTrigger>
											<Button
												background='gray.800'
												borderRadius='4px'
												color='white'
												cursor='pointer'
												fontSize='xs'
												m='2'
												maxH='18px'
												maxW='32px'
												opacity='0.8'
												position='absolute'
												right='0'
												top='0'
											>
												ALT
											</Button>
										</PopoverTrigger>
										<PopoverContent
											border='1px solid #0d0d0d !important'
											className='button'
											position='absolute'
											right='0'
											top='0'
										>
											<PopoverCloseButton />
											<PopoverHeader>Image description</PopoverHeader>
											<PopoverBody>{alt}</PopoverBody>
										</PopoverContent>
									</Popover>
								) : null}
							</>
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
		updatedAt: PropTypes.string,
		tags: PropTypes.arrayOf(PropTypes.string),
		privacy: PropTypes.string,
		selectedFile: PropTypes.shape({
			url: PropTypes.string,
		}),
		comments: PropTypes.arrayOf(PropTypes.object),
		alt: PropTypes.string,
	}),
	highlight: PropTypes.string,
}
