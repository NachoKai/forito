import { memo, useCallback, useState } from 'react'
import {
	AspectRatio,
	Badge,
	Button,
	Heading,
	Image,
	Skeleton,
	Stack,
	Text,
	Tooltip,
	useColorModeValue,
} from '@chakra-ui/react'
import { FaEraser, FaPen, FaRegComments } from 'react-icons/fa'
import { format, formatDistance, isValid } from 'date-fns'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'

import { getRandomId } from '../utils/getRandomId'
import { deletePost, likePost, savePost } from '../redux/posts'
import Likes from './Likes'
import { getUser } from '../utils/getUser'
import Dialog from './common/Dialog'

const Post = ({
	setCurrentId,
	post: {
		_id,
		title,
		name,
		creator,
		message,
		likes,
		saves,
		createdAt,
		tags,
		selectedFile,
		comments,
	},
	handleScroll,
}) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const user = getUser()
	const userId = user?.result?.googleId || user?.result?._id
	const isUserLike = likes?.find(like => like === userId)
	const hasUserSaved = saves?.find(save => save === userId)
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const location = useLocation()
	const userEmail = user?.result?.email
	const [saveLoading, setSaveLoading] = useState(false)
	const [likeLoading, setLikeLoading] = useState(false)

	const isPostCreator = user?.result?.googleId
		? user?.result?.googleId === creator
		: false || user?.result?._id
		? user?.result?._id === creator
		: false

	const isAdmin = userEmail ? process.env.REACT_APP_ADMIN === userEmail : false

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
		setCurrentId(_id)
		handleScroll()
	}, [_id, handleScroll, setCurrentId])

	return (
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
			h='100%'
			p={{
				sm: '6',
				md: '8',
				lg: '8',
				xl: '8',
			}}
			spacing={{
				sm: '6',
				md: '8',
				lg: '8',
				xl: '8',
			}}
			w='100%'
		>
			<Stack justify='space-between' spacing='4' w='100%'>
				<Stack direction='column' spacing='4'>
					<Stack direction='row'>
						<Stack direction='column' spacing='0'>
							<Text fontSize='md' fontWeight='bold'>
								<Link to={`/creator/${creator}`}>{` ${name}`}</Link>
							</Text>
							<Tooltip
								hasArrow
								colorScheme='primary'
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

					<Heading
						as='h3'
						className='pointer'
						fontSize='2xl'
						marginBottom='2'
						textShadow={useColorModeValue(
							`0 0 2px rgba(0,0,0,0.3)`,
							`0 0 2px rgba(255,255,255,0.3)`
						)}
						onClick={openPost}
					>
						{title}
					</Heading>

					<Text
						fontSize='md'
						m={{
							sm: '6',
							md: '8',
							lg: '8',
							xl: '8',
						}}
						noOfLines={[2, 4, 6]}
						whiteSpace='pre-wrap'
					>
						{message}
					</Text>
				</Stack>

				<Stack direction='column' spacing='4'>
					<Stack direction='row' overflow='auto' spacing='2'>
						{[...new Set(tags)]
							.filter(e => e)
							.map(tag => (
								<Badge key={getRandomId()} bg='primary.400' color='white'>
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
								colorScheme='primary'
								leftIcon={<FaRegComments />}
								size='sm'
								variant='ghost'
								onClick={openComments}
							>
								{comments?.length} {comments?.length === 1 ? 'Comment' : 'Comments'}
							</Button>
							<Button
								colorScheme='primary'
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
							{userEmail && (
								<Button
									colorScheme='primary'
									disabled={!user?.result}
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
							{(isPostCreator || isAdmin) && (
								<Button
									colorScheme='primary'
									leftIcon={<FaPen />}
									minWidth='88px'
									size='sm'
									variant='outline'
									onClick={handleEdit}
								>
									Edit
								</Button>
							)}
							{(isPostCreator || isAdmin) && (
								<Button
									bg='red_500_200'
									colorScheme='primary'
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

			{selectedFile?.url && (
				<AspectRatio
					maxH='80vh'
					maxW={{
						sm: '100%',
						md: '100%',
						lg: '100%',
						xl: '500px',
					}}
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
	)
}

export default memo(Post)
