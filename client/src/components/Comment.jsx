import { Link } from 'react-router-dom'
import { Text } from '@chakra-ui/react'

const Comment = ({ comment }) => {
	return (
		<Text>
			<Link to={`/creator/${comment.id}`}>
				<strong>{comment.name}: </strong>
			</Link>
			{comment.comment}
		</Text>
	)
}

export default Comment
