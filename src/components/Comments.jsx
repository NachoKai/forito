import { Button, HStack, Stack, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { useCallback, useState } from 'react'
import { FaExclamationCircle } from 'react-icons/fa'
import { v4 as uuid } from 'uuid'

import { useAddNotification } from '../hooks/data/auth'
import { useAddComment, useDeleteComment } from '../hooks/data/posts'
import { CreateGradColor } from '../theme'
import { isEmpty } from '../utils/isEmpty'
import { Comment } from './Comment'
import { FormTextArea } from './common/FormTextArea'

export const Comments = ({ postComments, postId, user, creator, isPostCreator }) => {
	const userId = user?.result?.googleId || user?.result?._id
	const [comment, setComment] = useState('')
	const [comments, setComments] = useState(postComments)
	const isInputEmpty = isEmpty(comment)
	const { mutateAsync: addComment } = useAddComment()
	const { mutateAsync: deleteComment } = useDeleteComment()
	const { mutateAsync: addNotification } = useAddNotification()
	const userName = user?.result?.name

	const handleAddComment = useCallback(async () => {
		try {
			const commentContent = {
				userId,
				name: user?.result?.name,
				comment,
				commentId: uuid(),
			}

			await addComment({ id: postId, value: commentContent })
			setComments([...comments, commentContent])
			setComment('')

			if (!isPostCreator) {
				await addNotification({
					userId: creator,
					notification: {
						_id: uuid(),
						postId,
						read: false,
						username: userName,
						type: 'comment',
						createdAt: new Date().toISOString(),
					},
				})
			}
		} catch (err) {
			console.error(err)
			throw err
		}
	}, [
		userId,
		user?.result?.name,
		comment,
		addComment,
		postId,
		comments,
		isPostCreator,
		addNotification,
		creator,
		userName,
	])

	const handleClear = () => setComment('')

	return (
		<Stack direction={{ sm: 'column', md: 'column', lg: 'row', xl: 'row' }} spacing='8'>
			<Stack overflow='auto' spacing='4' w='100%'>
				{comments?.length ? (
					comments?.map(comment => (
						<Comment
							key={comment.commentId}
							comment={comment}
							deleteComment={deleteComment}
							postId={postId}
						/>
					))
				) : (
					<Text color='gray.500'>No comments yet</Text>
				)}
			</Stack>

			{user?.result?.name ? (
				<Stack
					bgGradient={CreateGradColor('primary', 100, 50, 900, 600, '135deg')}
					borderRadius='24px'
					className='container'
					maxH='230px'
					p={{ sm: '6', md: '8', lg: '8', xl: '8' }}
					spacing='4'
					w='100%'
				>
					<FormTextArea
						label='Write a comment'
						maxLength='500'
						name='comment'
						value={comment}
						onChange={e => setComment(e.target.value)}
					/>
					<HStack spacing='4'>
						<Button
							className={isInputEmpty ? '' : 'button'}
							flexGrow='1'
							isDisabled={isInputEmpty}
							onClick={handleAddComment}
						>
							Comment
						</Button>
						<Button
							className={isInputEmpty ? '' : 'button'}
							flexGrow='1'
							isDisabled={isInputEmpty}
							variant='outline'
							onClick={handleClear}
						>
							Clear
						</Button>
					</HStack>
				</Stack>
			) : (
				<Stack
					align='center'
					color='primary_600_100'
					minW='320px'
					p={{ sm: '6', md: '8', lg: '8', xl: '8' }}
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

Comments.propTypes = {
	postComments: PropTypes.arrayOf(
		PropTypes.shape({
			userId: PropTypes.string,
			name: PropTypes.string,
			comment: PropTypes.string,
			_id: PropTypes.string,
		})
	),
	postId: PropTypes.string,
	user: PropTypes.shape({
		result: PropTypes.shape({
			googleId: PropTypes.string,
			name: PropTypes.string,
			_id: PropTypes.string,
		}),
	}),
	isPostCreator: PropTypes.bool,
	creator: PropTypes.string,
}
