import { toast } from 'react-toastify'

export const showError = (message: string) =>
	toast.error(message, {
		position: 'bottom-right',
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	})
