import { toast } from "react-toastify"

const showSuccess = message => {
	return toast.success(message, {
		position: "bottom-right",
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	})
}

export default showSuccess
