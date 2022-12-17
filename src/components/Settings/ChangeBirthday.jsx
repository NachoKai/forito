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
import { sub } from 'date-fns'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getUserLocalStorage } from '../../utils/getUserLocalStorage'
import { useUpdateUserBirthday } from '../../hooks/data/auth'
import { Loading } from '../common/Loading'
import ErrorPage from '../ErrorPage'

export const ChangeBirthday = () => {
	const navigate = useNavigate()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const initialRef = useRef(null)
	const finalRef = useRef(null)
	const [birthday, setBirthday] = useState('')
	const {
		mutateAsync: updateUserBirthday,
		isLoading,
		isError,
		error,
		isFetching,
	} = useUpdateUserBirthday()
	const now = new Date()
	const minDate = sub(now, { years: 100 }).toISOString().split('T')[0]
	const maxDate = sub(now, { years: 10 }).toISOString().split('T')[0]

	const handleSubmit = async e => {
		e.preventDefault()
		e.stopPropagation()

		try {
			const user = getUserLocalStorage()
			const userId = user?.result?.googleId || user?.result?._id

			await updateUserBirthday({ userId, birthday: birthday?.replace(/-/g, '/') })
			navigate(0)
		} catch (err) {
			console.error(err)
		} finally {
			setBirthday('')
			onClose()
		}
	}

	if (isError) return <ErrorPage error={error} />
	if (isLoading || isFetching) return <Loading />

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
								max={maxDate}
								min={minDate}
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
