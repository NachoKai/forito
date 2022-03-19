import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination, PaginationItem } from '@material-ui/lab'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Stack, useColorModeValue } from '@chakra-ui/react'
import PropTypes from 'prop-types'

import { getPosts } from '../redux/posts'

const Paginate = ({ page }) => {
	const dispatch = useDispatch()
	const { numberOfPages } = useSelector(state => state.posts)
	const containerColor = useColorModeValue('black', 'white')

	useEffect(() => page && dispatch(getPosts(page)), [dispatch, page])

	return (
		<Container
			bg='primary_100_900'
			borderRadius='lg'
			boxShadow='md'
			color={containerColor}
		>
			{numberOfPages > 1 && (
				<Pagination
					hideNextButton
					hidePrevButton
					count={numberOfPages}
					defaultPage={1}
					page={Number(page) || 1}
					renderItem={item => (
						<PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
					)}
					shape='rounded'
				/>
			)}
		</Container>
	)
}

export default Paginate

const Container = styled(Stack)`
	a {
		color: ${p => p.color};
	}
`

Paginate.propTypes = {
	page: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}
