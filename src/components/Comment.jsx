import { Text } from '@chakra-ui/react'
import Linkify from 'linkify-react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export const Comment = ({ comment }) => {
	return (
		<Text whiteSpace='pre-wrap'>
			<Link to={`/creator/${comment?.userId}`}>
				<strong>{comment?.name}: </strong>
			</Link>
			<Linkify>{comment?.comment}</Linkify>
		</Text>
	)
}

Comment.propTypes = {
	comment: PropTypes.shape({
		userId: PropTypes.string,
		_id: PropTypes.string,
		name: PropTypes.string,
		comment: PropTypes.string,
	}),
}
