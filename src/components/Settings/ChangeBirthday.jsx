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

export const ChangeBirthday = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const initialRef = useRef(null)
	const finalRef = useRef(null)

	return (
		<>
			<Button className='button' onClick={onOpen}>
				Change birthday
			</Button>

			<Modal
				finalFocusRef={finalRef}
				initialFocusRef={initialRef}
				isOpen={isOpen}
				onClose={onClose}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Change Birthday</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl>
							<FormLabel>Birthday</FormLabel>
							<Input
								ref={initialRef}
								isRequired
								name='birthday'
								placeholder='Select Date'
								size='md'
								tooltip='Required'
								type='date'
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
