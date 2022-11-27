import {
	Button,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from '@chakra-ui/react'
import { useRef } from 'react'

export const ChangePassword = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const initialRef = useRef(null)
	const finalRef = useRef(null)

	return (
		<>
			<Button className='button' onClick={onOpen}>
				Change password
			</Button>

			<Modal
				finalFocusRef={finalRef}
				initialFocusRef={initialRef}
				isOpen={isOpen}
				onClose={onClose}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Change Password</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl>
							<FormLabel>Current password</FormLabel>
							<Input
								ref={initialRef}
								isRequired
								maxLength='35'
								minLength='6'
								name='current-password'
								placeholder='Current password'
								tooltip='Required'
							/>
						</FormControl>

						<FormControl mt={4}>
							<FormLabel>New password</FormLabel>
							<Input
								isRequired
								maxLength='35'
								minLength='6'
								name='new-password'
								placeholder='New password'
								tooltip='Required'
							/>
						</FormControl>

						<FormControl mt={4}>
							<FormLabel>Repeat new password</FormLabel>
							<Input
								isRequired
								maxLength='35'
								minLength='6'
								name='repeat-new-password'
								placeholder='Repeat new password'
								tooltip='Required'
							/>
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button className='button' colorScheme='primary' mr={3}>
							Save
						</Button>
						<Button className='button' onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}
