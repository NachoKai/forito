import { Divider, Stack, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { FaGithub } from "react-icons/fa"

import { CreateBg, CreateColor } from "../theme"

const Footer = () => {
	return (
		<Stack
			bg={CreateBg("primary", 100, 900)}
			color={CreateColor("primary", 800, 100)}
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
						rel="noreferrer"
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
				<Text fontSize="sm">
					Made with &#10084; by{" "}
					<Link
						rel="noreferrer"
						target="_blank"
						to={{ pathname: "https://github.com/NachoKai/" }}
					>
						Nacho Caiafa
					</Link>
				</Text>
			</Stack>
		</Stack>
	)
}

export default Footer
