import { Link } from 'react-router-dom'
import { Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const Comment = ({ comment }) => {
	return (
		<Text>
			<Link to={`/creator/${comment.userId}`}>
				<strong>{comment.name}: </strong>
			</Link>
			{comment.comment}
		</Text>
	)
}

export default Comment

Comment.propTypes = {
	comment: PropTypes.shape({
		userId: PropTypes.string,
		_id: PropTypes.string,
		name: PropTypes.string,
		comment: PropTypes.string,
	}),
}
