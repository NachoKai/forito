import { Divider, Stack, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { FaGithub } from "react-icons/fa"

import { createBg, createColor } from "../theme"

const Footer = () => {
	return (
		<Stack
			bg={createBg("primary", 100, 900)}
			color={createColor("primary", 600, 100)}
			p="8"
			spacing="8"
		>
			<Stack direction="row" justify="space-between">
				<Stack direction="row" spacing="8">
					<Text fontWeight="bold">
						<Link to="/">Home</Link>
					</Text>
					<Text fontWeight="bold">
						<Link to="/about">About</Link>
					</Text>
				</Stack>
				<Stack direction="row">
					<Link
						fontSize="xl"
						target="_blank"
						to={{ pathname: "https://github.com/NachoKai/forito" }}
					>
						<Text fontSize="xl">
							<FaGithub />
						</Text>
					</Link>
				</Stack>
			</Stack>

			<Divider colorScheme="primary" />

			<Stack
				direction={{ sm: "column", md: "column", lg: "row", xl: "row" }}
				justify="space-between"
			>
				<Text fontSize="sm">
					&#169; {new Date().getFullYear()} Forito. All rights reserved.
				</Text>
				<Text fontSize="sm">Made with &#10084; by Nacho Caiafa</Text>
			</Stack>
		</Stack>
	)
}

export default Footer
