import { createStandaloneToast } from '@chakra-ui/toast'

export const showError = (message: string) => {
	const { toast } = createStandaloneToast()

	if (!toast.isActive(message)) {
		return toast({
			title: 'Error',
			description: message,
			status: 'error',
			duration: 3000,
			isClosable: true,
			position: 'bottom-right',
			variant: 'left-accent',
		})
	}
}
