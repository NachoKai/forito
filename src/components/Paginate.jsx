import {
	Pagination,
	PaginationContainer,
	PaginationPage,
	PaginationPageGroup,
	usePagination,
} from '@ajna/pagination'
import { Stack } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { getPosts } from '../redux/posts'
import getThemeColor from '../utils/getThemeColor.ts'

const Paginate = ({ page }) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { count, numberOfPages } = useSelector(state => state.posts)

	const { pages, currentPage, setCurrentPage } = usePagination({
		total: count,
		limits: {
			outer: 2,
			inner: 2,
		},
		initialState: {
			pageSize: 8,
			currentPage: 1,
		},
	})

	const handlePageChange = nextPage => {
		setCurrentPage(nextPage)
	}

	useEffect(() => {
		dispatch(getPosts(page))
	}, [dispatch, page])

	return (
		<Container>
			{numberOfPages > 1 && (
				<Pagination
					currentPage={currentPage}
					pagesCount={numberOfPages}
					onPageChange={handlePageChange}
				>
					<PaginationContainer>
						<PaginationPageGroup>
							{pages.map(page => (
								<PaginationPage
									key={page}
									_current={{
										bg: () => `${getThemeColor()}.700`,
									}}
									bg={() => `${getThemeColor()}.200`}
									h={8}
									page={page}
									w={8}
									onClick={() => navigate(`/posts?page=${page}`)}
								/>
							))}
						</PaginationPageGroup>
					</PaginationContainer>
				</Pagination>
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
