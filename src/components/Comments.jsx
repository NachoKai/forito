import { Button, Stack, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { FaExclamationCircle } from 'react-icons/fa'

import { usePostsStore } from '../state/postsStore'
import { CreateGradColor } from '../theme.ts'
import { checkEmpty } from '../utils/checkEmpty.ts'
import { getThemeColor } from '../utils/getThemeColor.ts'
import { showError } from '../utils/showError.ts'
import { Comment } from './Comment'
import { FormTextArea } from './common/FormTextArea'

export const Comments = ({ user }) => {
	const { post, addComment } = usePostsStore()
	const postComments = post?.comments
	const postId = post?._id
	const userId = user?.result?.googleId || user?.result?._id
	const [comment, setComment] = useState('')
	const [comments, setComments] = useState(postComments)

	const handleComment = async () => {
		try {
			const commentContent = { userId, name: user?.result?.name, comment }

			await addComment(commentContent, postId)
			setComments([...comments, commentContent])
			setComment('')
		} catch (err) {
			console.error(err)
			showError('Something went wrong when trying to add comment. Please try again.')
		}
	}

	const handleClear = () => setComment('')

	return (
		<Stack>
			<Stack direction={{ sm: 'column', md: 'column', lg: 'row', xl: 'row' }} spacing='4'>
				<Stack overflow='auto' spacing='4' width='100%'>
					{comments?.length ? (
						comments?.map(comment => <Comment key={comment._id} comment={comment} />)
					) : (
						<Text color='gray.500'>No comments yet</Text>
					)}
				</Stack>

				{user?.result?.name ? (
					<Stack
						bgGradient={CreateGradColor('primary', 100, 50, 900, 600, '135deg')}
						borderRadius='24px'
						boxShadow='md'
						maxH='230px'
						p={{ sm: '6', md: '8', lg: '8', xl: '8' }}
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
								boxShadow={() => getThemeColor()}
								disabled={!checkEmpty(comment)}
								flexGrow='1'
								onClick={handleComment}
							>
								Comment
							</Button>
							<Button flexGrow='1' variant='outline' onClick={handleClear}>
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
	post: PropTypes.shape({
		comments: PropTypes.arrayOf(
			PropTypes.shape({
				userId: PropTypes.string,
				name: PropTypes.string,
				comment: PropTypes.string,
				_id: PropTypes.string,
			})
		),
		_id: PropTypes.string,
	}),
	user: PropTypes.shape({
		result: PropTypes.shape({
			googleId: PropTypes.string,
			name: PropTypes.string,
			_id: PropTypes.string,
		}),
	}),
}
