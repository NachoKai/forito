import { Button, HStack, Stack, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import React, { useCallback, useState } from 'react'
import { FaExclamationCircle } from 'react-icons/fa'
import { v4 as uuid } from 'uuid'

import { usePostsStore } from '../state/postsStore'
import { CreateGradColor } from '../theme'
import { checkEmpty } from '../utils/checkEmpty'
import { showError } from '../utils/showError'
import { Comment } from './Comment'
import { FormTextArea } from './common/FormTextArea'

export const Comments = ({ postComments, postId, user }) => {
	const { addComment, deleteComment } = usePostsStore()
	const userId = user?.result?.googleId || user?.result?._id
	const [comment, setComment] = useState('')
	const [comments, setComments] = useState(postComments)
	const isInputEmpty = checkEmpty(comment)

	const handleAddComment = useCallback(async () => {
		try {
			const commentContent = {
				userId,
				name: user?.result?.name,
				comment,
				commentId: uuid(),
			}

			await addComment(commentContent, postId)
			setComments([...comments, commentContent])
			setComment('')
		} catch (err) {
			console.error(err)
			showError('Something went wrong when trying to add comment. Please try again.')
		}
	}, [addComment, comment, comments, postId, user?.result?.name, userId])

	const handleClear = () => setComment('')

	return (
		<Stack>
			<Stack direction={{ sm: 'column', md: 'column', lg: 'row', xl: 'row' }} spacing='4'>
				<Stack overflow='auto' spacing='4' w='100%'>
					{comments?.length ? (
						comments?.map(comment => (
							<Comment
								key={comment._id}
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
								className={isInputEmpty ? 'button' : ''}
								disabled={!isInputEmpty}
								flexGrow='1'
								onClick={handleAddComment}
							>
								Comment
							</Button>
							<Button
								className={isInputEmpty ? 'button' : ''}
								disabled={!isInputEmpty}
								flexGrow='1'
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
}
