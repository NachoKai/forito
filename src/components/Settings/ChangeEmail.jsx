import {
	Button,
	FormControl,
	FormHelperText,
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

export const ChangeEmail = () => {
	const navigate = useNavigate()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const initialRef = useRef(null)
	const finalRef = useRef(null)
	const [email, setEmail] = useState('')
	const [emailRepeat, setEmailRepeat] = useState('')
	const { updateUserEmail } = useAuthStore()
	const emailRegex =
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

	const handleSubmit = async e => {
		if (email !== emailRepeat || !emailRegex.test(email)) return
		e.preventDefault()
		e.stopPropagation()

		try {
			const user = getUserLocalStorage()
			const userId = user?.result?.googleId || user?.result?._id

			await updateUserEmail(userId, email?.replace(/-/g, '/'))
			navigate(0)
		} catch (err) {
			console.error(err)
		} finally {
			setEmail('')
			setEmailRepeat('')
			onClose()
		}
	}

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
							<FormLabel>New email</FormLabel>
							<Input
								ref={initialRef}
								errorBorderColor='red.300'
								isInvalid={emailRepeat && email !== emailRepeat && emailRegex.test(email)}
								maxLength='35'
								minLength='7'
								name='new-email'
								placeholder='New email'
								type='email'
								value={email}
								onChange={e => setEmail(e.target.value)}
							/>
							{email && !emailRegex.test(email) && (
								<FormHelperText
									color='red.400'
									fontWeight='bold'
									mb='4px'
									whiteSpace='nowrap'
								>
									Email not valid
								</FormHelperText>
							)}
						</FormControl>

						<FormControl mt={4}>
							<FormLabel>Repeat new email</FormLabel>
							<Input
								errorBorderColor='red.300'
								isInvalid={
									emailRepeat && email !== emailRepeat && emailRegex.test(emailRepeat)
								}
								maxLength='35'
								minLength='7'
								name='repeat-new-email'
								placeholder='Repeat new email'
								type='email'
								value={emailRepeat}
								onChange={e => setEmailRepeat(e.target.value)}
							/>
							{emailRepeat && email !== emailRepeat && (
								<FormHelperText
									color='red.400'
									fontWeight='bold'
									mb='4px'
									whiteSpace='nowrap'
								>
									Emails don&apos;t match
								</FormHelperText>
							)}
							{emailRepeat && !emailRegex.test(emailRepeat) && (
								<FormHelperText
									color='red.400'
									fontWeight='bold'
									mb='4px'
									whiteSpace='nowrap'
								>
									Email not valid
								</FormHelperText>
							)}
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button
							className='button'
							colorScheme='primary'
							disabled={!email || email !== emailRepeat || !emailRegex.test(email)}
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
