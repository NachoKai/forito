import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination, PaginationItem } from '@material-ui/lab'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Stack, useColorModeValue } from '@chakra-ui/react'

import { getPosts } from '../redux/posts'
import { CreateBg } from '../theme'

const Paginate = ({ page }) => {
	const dispatch = useDispatch()
	const { numberOfPages } = useSelector(state => state.posts)

	useEffect(() => {
		if (page) dispatch(getPosts(page))
	}, [dispatch, page])

	return (
		<Container
			bg={CreateBg('primary', 50, 800)}
			borderRadius='lg'
			boxShadow='base'
			color={useColorModeValue('black', 'white')}
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
