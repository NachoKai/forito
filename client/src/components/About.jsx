import { Button, Flex, Stack, Text } from "@chakra-ui/react"
import { FaGithub, FaHandSpock } from "react-icons/fa"
import { Link } from "react-router-dom"

const About = () => {
	return (
		<Flex
			flexGrow
			align="center"
			direction="column"
			h="100%"
			justify="flex-start"
			minHeight="100vh"
			p="8"
		>
			<Stack spacing="4">
				<Flex justify="center">
					<Text color="primary.400" fontSize="6xl">
						<FaHandSpock />
					</Text>
				</Flex>
				<Text color="primary.400" fontSize="6xl">
					Hi, I&apos;m Nacho!
				</Text>
				<Text color="primary.400" fontSize="3xl">
					And this is Forito✨
				</Text>
				<Link
					fontSize="xl"
					rel="noreferrer"
					target="_blank"
					to={{ pathname: "https://github.com/NachoKai/forito" }}
				>
					<Button
						colorScheme="primary"
						leftIcon={<FaGithub />}
						variant="outline"
						w="100%"
					>
						Github
					</Button>
				</Link>
			</Stack>
		</Flex>
	)
}

export default About
