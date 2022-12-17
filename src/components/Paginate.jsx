import {
	Pagination,
	PaginationContainer,
	PaginationNext,
	PaginationPage,
	PaginationPrevious,
} from '@ajna/pagination'
import { Stack, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { usePostsStore } from '../state/postsStore'
import { getThemeColor } from '../utils/getThemeColor'

export const Paginate = ({ currentPage, numberOfPages }) => {
	const navigate = useNavigate()
	const { setCurrentPage } = usePostsStore()

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
					<PaginationContainer align='center' justify='center'>
						{currentPage > 1 ? (
							<PaginationPrevious
								className='button'
								color='primary_900_100'
								h={10}
								variant='ghost'
								onClick={() => navigate(`/posts?page=${currentPage - 1}`)}
							>
								{'< Previous'}
							</PaginationPrevious>
						) : null}

						<PaginationPage
							key={currentPage}
							_current={{
								bg: () => `${getThemeColor()}.700`,
								color: () => `${getThemeColor()}.100`,
							}}
							bg='primary_100_900'
							className='pagination'
							color='primary_900_100'
							h={10}
							m='8px'
							page={currentPage}
							variant='ghost'
							w={10}
							onClick={() => navigate(`/posts?page=${currentPage}`)}
						/>

						{numberOfPages > 1 ? (
							<Text color='primary_900_100' m='8px'>
								of {numberOfPages}
							</Text>
						) : null}

						{currentPage < numberOfPages ? (
							<PaginationNext
								className='button'
								color='primary_900_100'
								h={10}
								variant='ghost'
								onClick={() => navigate(`/posts?page=${currentPage + 1}`)}
							>
								{'Next >'}
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
}
