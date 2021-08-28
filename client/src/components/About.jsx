import { Button, Stack, Text } from "@chakra-ui/react"
import { FaGithub, FaHandSpock } from "react-icons/fa"
import { Link } from "react-router-dom"

const About = () => {
	return (
		<Stack flexGrow align="center" h="50%" spacing="4">
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
		</Stack>
	)
}

export default About
