import { createStandaloneToast } from '@chakra-ui/toast'

export const showSuccess = (message: string) => {
	const { toast } = createStandaloneToast()

	if (!toast.isActive(message)) {
		return toast({
			title: 'Success',
			description: message,
			status: 'success',
			duration: 3000,
			isClosable: true,
			position: 'bottom-right',
			variant: 'left-accent',
		})
	}
}
