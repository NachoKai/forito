import { Button, HStack, Text } from '@chakra-ui/react'
import Linkify from 'linkify-react'
import { FaEraser } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import { CommentI } from '../types'
import { checkIsAdmin } from '../utils/checkIsAdmin'
import { getUserLocalStorage } from '../utils/getUserLocalStorage'

interface CommentProps {
	comment: CommentI
	deleteComment: (params: { id: string; commentId: string }) => void
	postId: string
}

export const Comment = ({ comment, deleteComment, postId }: CommentProps) => {
	const user = getUserLocalStorage()
	const userEmail = user?.result?.email
	const isAdmin = checkIsAdmin(userEmail)

	const handleDeleteComment = () => {
		deleteComment({ id: postId, commentId: comment?.commentId })
	}

	return (
		<HStack align='center' justify='space-between'>
			<Text whiteSpace='pre-wrap'>
				<Link to={`/creator/${comment?.userId}`}>
					<strong>{comment?.name}: </strong>
				</Link>
				<Linkify>{comment?.comment}</Linkify>
			</Text>
			{isAdmin && (
				<Button
					colorScheme='red'
					display={{
						sm: 'none',
						md: 'none',
						lg: 'flex',
						xl: 'flex',
					}}
					leftIcon={<FaEraser />}
					maxW='88px'
					size='xs'
					variant='solid'
					onClick={handleDeleteComment}
				>
					Delete
				</Button>
			)}
		</HStack>
	)
}
