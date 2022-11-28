import {
	Pagination,
	PaginationContainer,
	PaginationPage,
	PaginationPageGroup,
	usePagination,
} from '@ajna/pagination'
import { Stack } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { usePostsStore } from '../state/postsStore'
import { getThemeColor } from '../utils/getThemeColor'

const POSTS_LIMIT = 6

export const Paginate = () => {
	const navigate = useNavigate()
	const { count, numberOfPages, setCurrentPage, currentPage } = usePostsStore()

	const { pages } = usePagination({
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

	const handlePageChange = useCallback(
		page => {
			window.scrollTo(0, 0)
			setCurrentPage(page)
		},
		[setCurrentPage]
	)

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
								<Stack
									key={page}
									_current={{
										bg: () => `${getThemeColor()}.700`,
										color: () => `${getThemeColor()}.100`,
									}}
									align='center'
									bg='primary_100_900'
									borderRadius={8}
									className='pagination'
									color='primary_900_100'
									cursor='pointer'
									h={8}
									justify='center'
									w={8}
								>
									<PaginationPage
										key={page}
										_current={{
											bg: () => `${getThemeColor()}.700`,
											color: () => `${getThemeColor()}.100`,
										}}
										align='center'
										borderRadius={8}
										cursor='pointer'
										h={8}
										justify='center'
										page={page}
										style={{
											width: '100%',
											height: '100%',
											fontWeight: 600,
										}}
										w={8}
										onClick={() => navigate(`/posts?page=${page}`)}
									/>
								</Stack>
							))}
						</PaginationPageGroup>
					</PaginationContainer>
				</Pagination>
			)}
		</Container>
	)
}

const Container = styled(Stack)`
	a {
		color: ${p => p.color};
	}
`

Paginate.propTypes = {
	page: PropTypes.number,
}
