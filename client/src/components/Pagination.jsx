import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Pagination, PaginationItem } from "@material-ui/lab"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { Stack, useColorModeValue } from "@chakra-ui/react"

import { getPosts } from "../redux/posts"
import { createBg } from "../theme"

const Paginate = ({ page }) => {
	const dispatch = useDispatch()
	const { numberOfPages } = useSelector(state => state.posts)

	useEffect(() => {
		if (page) dispatch(getPosts(page))
	}, [dispatch, page])

	return (
		<Container
			bg={createBg("primary", 100, 900)}
			borderRadius="lg"
			color={useColorModeValue("black", "white")}
		>
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

const Container = styled(Stack)`
	a {
		color: ${p => p.color};
	}
`
