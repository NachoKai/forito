import { Button, Flex, Text } from "@chakra-ui/react"
import { FaGithub, FaHandSpock } from "react-icons/fa"
import { Link } from "react-router-dom"

const About = () => {
	return (
		<Flex flexGrow align="center" direction="column" h="100%" justify="center" p="8">
			<Text color="primary.400" fontSize="6xl">
				<FaHandSpock />
			</Text>
			<Text color="primary.400" fontSize="6xl">
				Hi, I&apos;m Nacho!
			</Text>
			<Text color="primary.400" fontSize="3xl">
				And this is Forito✨
			</Text>
			<Button colorScheme="primary" leftIcon={<FaGithub />} variant="outline">
				<Link
					fontSize="xl"
					target="_blank"
					to={{ pathname: "https://github.com/NachoKai/forito" }}
				>
					Github
				</Link>
			</Button>
		</Flex>
	)
}

export default About
