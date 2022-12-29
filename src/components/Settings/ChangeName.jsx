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

import { getUserLocalStorage } from '../../utils/getUserLocalStorage'
import { useUpdateUserName } from '../../hooks/data/auth'
import ErrorPage from '../ErrorPage'
import { Loading } from '../common/Loading'

export const ChangeName = () => {
	const navigate = useNavigate()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const initialRef = useRef(null)
	const finalRef = useRef(null)
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const { mutateAsync: updateUserName, isLoading, isError, error } = useUpdateUserName()

	const handleSubmit = async e => {
		e.preventDefault()
		e.stopPropagation()

		try {
			const user = getUserLocalStorage()
			const userId = user?.result?.googleId || user?.result?._id

			await updateUserName({ userId, firstName, lastName })
			navigate(0)
		} catch (err) {
			console.error(err)
		} finally {
			setFirstName('')
			setLastName('')
			onClose()
		}
	}

	if (isError) return <ErrorPage error={error} />
	if (isLoading) return <Loading />

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
								value={firstName?.trim()}
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
								value={lastName?.trim()}
								onChange={e => setLastName(e.target.value)}
							/>
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button
							className='button'
							colorScheme='primary'
							disabled={!firstName}
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
