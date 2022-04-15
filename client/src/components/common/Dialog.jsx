import { useRef } from 'react'
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
} from '@chakra-ui/react'
import PropTypes from 'prop-types'

const Dialog = ({ title, message, button, action, isDialogOpen, setIsDialogOpen }) => {
	const cancelRef = useRef()

	const onCancel = () => setIsDialogOpen(false)

	const onAccept = () => {
		action()
		setIsDialogOpen(false)
	}

	return (
		<AlertDialog isOpen={isDialogOpen} leastDestructiveRef={cancelRef} onClose={onCancel}>
			<AlertDialogOverlay>
				<AlertDialogContent>
					<AlertDialogHeader fontSize='lg' fontWeight='bold'>
						{title}
					</AlertDialogHeader>
					<AlertDialogBody>{message}</AlertDialogBody>
					<AlertDialogFooter>
						<Button ref={cancelRef} onClick={onCancel}>
							Cancel
						</Button>
						<Button colorScheme='red' ml={3} onClick={onAccept}>
							{button}
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	)
}

export default Dialog

Dialog.propTypes = {
	title: PropTypes.string,
	message: PropTypes.string,
	button: PropTypes.string,
	action: PropTypes.func,
	isDialogOpen: PropTypes.bool,
	setIsDialogOpen: PropTypes.func,
}
