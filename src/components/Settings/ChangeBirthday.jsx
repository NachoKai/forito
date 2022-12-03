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
import { useNavigate } from 'react-router-dom'

import { useAuthStore } from '../../state/authStore'
import { getUserLocalStorage } from '../../utils/getUserLocalStorage'

export const ChangeBirthday = () => {
	const navigate = useNavigate()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const initialRef = useRef(null)
	const finalRef = useRef(null)
	const [birthday, setBirthday] = useState('')
	const { updateUserBirthday } = useAuthStore()

	const handleSubmit = async e => {
		e.preventDefault()
		e.stopPropagation()

		try {
			const user = getUserLocalStorage()
			const userId = user?.result?.googleId || user?.result?._id

			await updateUserBirthday(userId, birthday?.replace(/-/g, '/'))
			navigate(0)
		} catch (err) {
			console.error(err)
		} finally {
			setBirthday('')
			onClose()
		}
	}

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
								value={birthday}
								onChange={e => setBirthday(e.target.value)}
							/>
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button
							className='button'
							colorScheme='primary'
							disabled={!birthday}
							mr={3}
							onClick={handleSubmit}
						>
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
