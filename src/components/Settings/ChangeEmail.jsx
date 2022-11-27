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

export const ChangeEmail = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const initialRef = useRef(null)
	const finalRef = useRef(null)

	return (
		<>
			<Button className='button' onClick={onOpen}>
				Change email
			</Button>

			<Modal
				finalFocusRef={finalRef}
				initialFocusRef={initialRef}
				isOpen={isOpen}
				onClose={onClose}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Change Email</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl>
							<FormLabel>Email</FormLabel>
							<Input
								ref={initialRef}
								maxLength='35'
								minLength='7'
								name='email'
								placeholder='Email'
								type='email'
							/>
						</FormControl>

						<FormControl mt={4}>
							<FormLabel>Repeat email</FormLabel>
							<Input
								maxLength='35'
								minLength='7'
								name='repeat-email'
								placeholder='Repeat email'
								type='email'
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
