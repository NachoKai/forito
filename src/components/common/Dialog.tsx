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

export interface DialogProps {
	title: string
	message: string
	button: string
	action: () => void
	isDialogOpen: boolean
	setIsDialogOpen: { off: () => void }
}

export const Dialog = ({
	title,
	message,
	button,
	action,
	isDialogOpen,
	setIsDialogOpen,
}: DialogProps) => {
	const cancelRef = useRef<HTMLButtonElement>(null)

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
			<AlertDialogOverlay bg='blackAlpha.300'>
				<AlertDialogContent boxShadow='none' className='container'>
					<AlertDialogHeader fontSize='lg' fontWeight='bold'>
						{title}
					</AlertDialogHeader>
					<AlertDialogBody>{message}</AlertDialogBody>
					<AlertDialogFooter>
						<Button ref={cancelRef} className='button' onClick={setIsDialogOpen.off}>
							Cancel
						</Button>
						<Button className='button' colorScheme='red' ml={3} onClick={onAccept}>
							{button}
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	)
}
