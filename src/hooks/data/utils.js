export const retry = (count, { response }) => {
	if (isAuthorizationError(response) || isUnexistingUrlError(response)) return false

	return count < 3
}

const isUnexistingUrlError = response => response && [404].includes(response.status)
const isAuthorizationError = response => response && [401, 403].includes(response.status)
