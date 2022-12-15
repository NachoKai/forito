import { Button, HStack, Text } from '@chakra-ui/react'
import Linkify from 'linkify-react'
import PropTypes from 'prop-types'
import { FaEraser } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import { checkIsAdmin } from '../utils/checkIsAdmin'
import { getUserLocalStorage } from '../utils/getUserLocalStorage'

export const Comment = ({ comment, deleteComment, postId }) => {
	const user = getUserLocalStorage()
	const userEmail = user?.result?.email
	const isAdmin = checkIsAdmin(userEmail)

	return (
		<HStack align='center' justify='space-between'>
			<Text whiteSpace='pre-wrap'>
				<Link to={`/creator/${comment?.userId}`}>
					<strong>{comment?.name}: </strong>
				</Link>
				<Linkify>{comment?.comment}</Linkify>
			</Text>
			{Boolean(isAdmin) && (
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
					onClick={() => deleteComment({ id: postId, commentId: comment?.commentId })}
				>
					Delete
				</Button>
			)}
		</HStack>
	)
}

Comment.propTypes = {
	comment: PropTypes.shape({
		userId: PropTypes.string,
		_id: PropTypes.string,
		name: PropTypes.string,
		comment: PropTypes.string,
		commentId: PropTypes.string,
	}),
	deleteComment: PropTypes.func,
	postId: PropTypes.string,
}
