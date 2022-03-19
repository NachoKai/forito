import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Stack, Text } from '@chakra-ui/react'
import { FaExclamationCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { getRandomId } from '../utils/getRandomId'
import FormTextArea from './common/FormTextArea'
import { getUser } from '../utils/getUser'
import { addComment } from '../redux/posts'
import { CreateGradColor } from '../theme'
import { checkEmpty } from '../utils/checkEmpty'
import getUserId from '../utils/getUserId'

const Comments = ({ post }) => {
	const dispatch = useDispatch()
	const user = getUser()
	const userId = getUserId(user)
	const commentsRef = useRef(null)
	const [comments, setComments] = useState([])
	const [comment, setComment] = useState('')

	const handleComment = useCallback(async () => {
		const commentContent = { id: userId, name: user?.result?.name, comment }
		const newComments = await dispatch(addComment(commentContent, post?._id))

		setComments(newComments)
		setComment('')
		commentsRef.current.scrollIntoView({ behavior: 'smooth' })
	}, [comment, dispatch, post?._id, user?.result?.name, userId])

	const handleClear = () => setComment('')

	useEffect(() => {
		setComments(post?.comments)
	}, [post])

	return (
		<Stack direction={{ sm: 'column', md: 'column', lg: 'row', xl: 'row' }} spacing='4'>
			<Stack maxHeight='230px' overflow='auto' spacing='4' width='100%'>
				{comments?.map(comment => (
					<Text key={getRandomId()}>
						<Link to={`/creator/${comment.id}`}>
							<strong>{comment.name}: </strong>
						</Link>
						{comment.comment}
					</Text>
				))}
				<div ref={commentsRef} />
			</Stack>

			{user?.result?.name ? (
				<Stack
					bgGradient={CreateGradColor('primary', 100, 50, 900, 600, '135deg')}
					borderRadius='lg'
					boxShadow='md'
					p={{
						sm: '6',
						md: '8',
						lg: '8',
						xl: '8',
					}}
					spacing='4'
					width='100%'
				>
					<FormTextArea
						label='Write a comment'
						maxLength='500'
						name='comment'
						value={comment}
						onChange={e => setComment(e.target.value)}
					/>
					<Stack direction='row' spacing='4'>
						<Button
							boxShadow='blue'
							colorScheme='primary'
							disabled={!checkEmpty(comment)}
							flexGrow='1'
							onClick={handleComment}
						>
							Comment
						</Button>
						<Button
							colorScheme='primary'
							flexGrow='1'
							variant='outline'
							onClick={handleClear}
						>
							Clear
						</Button>
					</Stack>
				</Stack>
			) : (
				<Stack
					align='center'
					color='primary_600_100'
					direction='column'
					minWidth='320px'
					p={{
						sm: '6',
						md: '8',
						lg: '8',
						xl: '8',
					}}
					spacing='4'
				>
					<Text fontSize='4xl' fontWeight='bold'>
						<FaExclamationCircle />
					</Text>
					<Text fontSize='lg' fontWeight='bold'>
						Please login to comment a Post.
					</Text>
				</Stack>
			)}
		</Stack>
	)
}

export default Comments

Comments.propTypes = {
	post: PropTypes.object.isRequired,
}
