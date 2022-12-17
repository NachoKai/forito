import { Button, Stack, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { usePostsStore } from '../state/postsStore'

export const Paginate = ({ currentPage, numberOfPages }) => {
	const navigate = useNavigate()
	const { setCurrentPage } = usePostsStore()

	const handlePageChange = useCallback(
		page => {
			navigate(`/posts?page=${page}`)
			window.scrollTo(0, 0)
			setCurrentPage(page)
		},
		[navigate, setCurrentPage]
	)

	return (
		<Stack align='center' direction='row' justify='center'>
			{currentPage > 1 ? (
				<Button
					className='button'
					color='primary_900_100'
					h={10}
					variant='ghost'
					onClick={() => handlePageChange(currentPage - 1)}
				>
					{'< Previous'}
				</Button>
			) : null}

			<Button
				bg='primary_100_900'
				className='container'
				color='primary_900_100'
				h={10}
				m='8px'
				variant='ghost'
				w={10}
				onClick={() => handlePageChange(currentPage)}
			>
				{currentPage}
			</Button>

			{numberOfPages > 1 ? (
				<Text color='primary_900_100' m='8px'>
					of {numberOfPages}
				</Text>
			) : null}

			{currentPage < numberOfPages ? (
				<Button
					className='button'
					color='primary_900_100'
					h={10}
					variant='ghost'
					onClick={() => handlePageChange(currentPage + 1)}
				>
					{'Next >'}
				</Button>
			) : null}
		</Stack>
	)
}

Paginate.propTypes = {
	currentPage: PropTypes.number,
	numberOfPages: PropTypes.number,
}
