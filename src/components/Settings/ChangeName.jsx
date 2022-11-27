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
import { useRef, useState } from 'react'

export const ChangeName = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const initialRef = useRef(null)
	const finalRef = useRef(null)
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')

	return (
		<>
			<Button className='button' onClick={onOpen}>
				Change name
			</Button>

			<Modal
				finalFocusRef={finalRef}
				initialFocusRef={initialRef}
				isOpen={isOpen}
				onClose={onClose}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Change Name</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl>
							<FormLabel>First name</FormLabel>
							<Input
								ref={initialRef}
								isRequired
								maxLength='25'
								minLength='2'
								name='firstName'
								placeholder='First name'
								tooltip='Required'
								value={firstName}
								onChange={e => setFirstName(e.target.value)}
							/>
						</FormControl>

						<FormControl mt={4}>
							<FormLabel>Last name</FormLabel>
							<Input
								maxLength='25'
								minLength='2'
								name='lastName'
								placeholder='Last name'
								value={lastName}
								onChange={e => setLastName(e.target.value)}
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
