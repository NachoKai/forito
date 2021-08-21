import { Flex, Link, Text } from "@chakra-ui/react"

const About = () => {
	return (
		<Flex flexGrow align="center" direction="column" h="50%" justify="center" p="8">
			<Text color="primary.400" fontSize="6xl">
				Hi, I&apos;m Nacho!
			</Text>
			<Text color="primary.400" fontSize="3xl">
				This is forito
			</Text>
			<Link color="primary.400" fontSize="3xl" to="https://github.com/NachoKai/forito">
				Github
			</Link>
		</Flex>
	)
}

export default About
