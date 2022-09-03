import { Text } from '@chakra-ui/react'
import Linkify from 'linkify-react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Comment = ({ comment }) => {
	return (
		<Container>
			<Link to={`/creator/${comment?.userId}`}>
				<strong>{comment?.name}: </strong>
			</Link>
			<Linkify tagName='span'>{comment?.comment}</Linkify>
		</Container>
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

const Container = styled(Text)`
  white-space: pre-wrap;
	span a {
		text-decoration: underline;
    &:hover {
      font-weight: bold;
	}
`
