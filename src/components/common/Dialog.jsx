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

export const Dialog = ({
	title,
	message,
	button,
	action,
	isDialogOpen,
	setIsDialogOpen,
}) => {
	const cancelRef = useRef()

	const onAccept = () => {
		action()
		setIsDialogOpen.off()
	}

	return (
		<AlertDialog
			isOpen={isDialogOpen}
			leastDestructiveRef={cancelRef}
			onClose={setIsDialogOpen.off}
		>
			<AlertDialogOverlay backdropFilter='blur(10px)' bg='blackAlpha.300'>
				<AlertDialogContent>
					<AlertDialogHeader fontSize='lg' fontWeight='bold'>
						{title}
					</AlertDialogHeader>
					<AlertDialogBody>{message}</AlertDialogBody>
					<AlertDialogFooter>
						<Button ref={cancelRef} onClick={setIsDialogOpen.off}>
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

Dialog.propTypes = {
	title: PropTypes.string,
	message: PropTypes.string,
	button: PropTypes.string,
	action: PropTypes.func,
	isDialogOpen: PropTypes.bool,
	setIsDialogOpen: PropTypes.object,
}
