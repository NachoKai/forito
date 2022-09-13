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
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { usePostsStore } from '../state/postsStore'
import getThemeColor from '../utils/getThemeColor.ts'

const Paginate = ({ page }) => {
	const navigate = useNavigate()
	const { count, numberOfPages } = usePostsStore(state => state.posts)
	const getPosts = usePostsStore(state => state.getPosts)
	const POSTS_LIMIT = 6

	const { pages, currentPage, setCurrentPage } = usePagination({
		total: count,
		limits: {
			outer: 2,
			inner: 2,
		},
		initialState: {
			pageSize: POSTS_LIMIT,
			currentPage: 1,
		},
	})

	const handlePageChange = nextPage => {
		setCurrentPage(nextPage)
	}

	useEffect(() => {
		getPosts(page)
	}, [getPosts, page])

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
										color: () => `${getThemeColor()}.100`,
									}}
									bg='primary_100_900'
									color='primary_900_100'
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
	page: PropTypes.number,
}
