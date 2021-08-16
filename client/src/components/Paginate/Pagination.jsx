import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Pagination, PaginationItem } from "@material-ui/lab"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { Flex, useColorModeValue } from "@chakra-ui/react"

import { getPosts } from "../../redux/posts"

const Paginate = ({ page }) => {
	const { numberOfPages } = useSelector(state => state.posts)
	const dispatch = useDispatch()
	const bg = useColorModeValue("primary.100", "primary.900")
	const color = useColorModeValue("black", "white")

	useEffect(() => {
		if (page) dispatch(getPosts(page))
	}, [dispatch, page])

	return (
		<Container bg={bg} borderRadius="lg" color={color}>
			{numberOfPages > 1 && (
				<Pagination
					count={numberOfPages}
					page={Number(page) || 1}
					renderItem={item => (
						<PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
					)}
					shape="rounded"
				/>
			)}
		</Container>
	)
}

export default Paginate

const Container = styled(Flex)`
	a {
		color: ${p => p.color};
	}
`
