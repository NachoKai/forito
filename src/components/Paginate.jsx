import {
	Pagination,
	PaginationContainer,
	PaginationNext,
	PaginationPage,
	PaginationPageGroup,
	PaginationPrevious,
	PaginationSeparator,
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

export const Paginate = ({ currentPage, numberOfPages, count }) => {
	const navigate = useNavigate()
	const { setCurrentPage } = usePostsStore()

	const { pages } = usePagination({
		total: count,
		limits: {
			outer: 3,
			inner: 3,
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
						{currentPage > 1 ? (
							<PaginationPrevious
								_current={{
									bg: () => `${getThemeColor()}.700`,
									color: () => `${getThemeColor()}.100`,
								}}
								bg='primary_100_900'
								className='pagination'
								color='primary_900_100'
								h={10}
								w={10}
								onClick={() => navigate(`/posts?page=${currentPage - 1}`)}
							>
								{'<'}
							</PaginationPrevious>
						) : null}

						<PaginationPageGroup
							separator={
								<PaginationSeparator
									isDisabled
									bg='primary_100_900'
									className='pagination'
									color='primary_900_100'
									h={10}
									w={10}
								/>
							}
						>
							{pages.map(page => (
								<PaginationPage
									key={page}
									_current={{
										bg: () => `${getThemeColor()}.700`,
										color: () => `${getThemeColor()}.100`,
									}}
									bg='primary_100_900'
									className='pagination'
									color='primary_900_100'
									h={10}
									page={page}
									w={10}
									onClick={() => navigate(`/posts?page=${page}`)}
								/>
							))}
						</PaginationPageGroup>

						{currentPage < numberOfPages ? (
							<PaginationNext
								_current={{
									bg: () => `${getThemeColor()}.700`,
									color: () => `${getThemeColor()}.100`,
								}}
								bg='primary_100_900'
								className='pagination'
								color='primary_900_100'
								h={10}
								w={10}
								onClick={() => navigate(`/posts?page=${currentPage + 1}`)}
							>
								{'>'}
							</PaginationNext>
						) : null}
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
	currentPage: PropTypes.number,
	numberOfPages: PropTypes.number,
	count: PropTypes.number,
}
