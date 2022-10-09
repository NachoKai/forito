import { Button, Stack, Text } from '@chakra-ui/react'
import Linkify from 'linkify-react'
import PropTypes from 'prop-types'
import { FaEraser } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import { checkIsAdmin } from '../utils/checkIsAdmin.ts'
import { getUserLocalStorage } from '../utils/getUserLocalStorage.ts'

export const Comment = ({ comment, deleteComment, postId }) => {
	const user = getUserLocalStorage()
	const userEmail = user?.result?.email
	const isAdmin = checkIsAdmin(userEmail)

	return (
		<Stack align='center' direction='row' justify='space-between'>
			<Text whiteSpace='pre-wrap'>
				<Link to={`/creator/${comment?.userId}`}>
					<strong>{comment?.name}: </strong>
				</Link>
				<Linkify>{comment?.comment}</Linkify>
			</Text>
			{Boolean(isAdmin) && (
				<Button
					bg='red_500_200'
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
					onClick={() => deleteComment(postId, comment?.commentId)}
				>
					Delete
				</Button>
			)}
		</Stack>
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
