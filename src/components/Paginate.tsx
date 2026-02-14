import { Button, Stack, Text } from '@chakra-ui/react'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { usePostsStore } from '../state/postsStore'

interface PaginateProps {
	currentPage: number
	numberOfPages: number
}

export const Paginate = ({ currentPage, numberOfPages }: PaginateProps) => {
	const navigate = useNavigate()
	const { setCurrentPage } = usePostsStore()

	const handlePageChange = useCallback(
		(page: number) => {
			navigate(`/posts?page=${page}`)
			window.scrollTo(0, 0)
			setCurrentPage(page)
		},
		[navigate, setCurrentPage]
	)

	const handlePreviousPage = useCallback(
		() => handlePageChange(currentPage - 1),
		[handlePageChange, currentPage]
	)

	const handleCurrentPage = useCallback(
		() => handlePageChange(currentPage),
		[handlePageChange, currentPage]
	)

	const handleNextPage = useCallback(
		() => handlePageChange(currentPage + 1),
		[handlePageChange, currentPage]
	)

	return (
		<Stack align='center' direction='row' justify='center'>
			{currentPage > 2 ? (
				<Button
					className='button'
					color='primary_900_100'
					h={10}
					variant='ghost'
					onClick={() => handlePageChange(1)}
				>
					{'<<'}
				</Button>
			) : null}

			{currentPage > 1 ? (
				<Button
					className='button'
					color='primary_900_100'
					h={10}
					variant='ghost'
					onClick={handlePreviousPage}
				>
					{'Previous'}
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
				onClick={handleCurrentPage}
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
					onClick={handleNextPage}
				>
					{'Next'}
				</Button>
			) : null}

			{currentPage < numberOfPages ? (
				<Button
					className='button'
					color='primary_900_100'
					h={10}
					variant='ghost'
					onClick={() => handlePageChange(numberOfPages)}
				>
					{'>>'}
				</Button>
			) : null}
		</Stack>
	)
}
