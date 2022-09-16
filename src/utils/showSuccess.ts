import { toast } from 'react-toastify'

export const showSuccess = (message: string) =>
	toast.success(message, {
		position: 'bottom-right',
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	})
