import { useState } from 'react'

export const usePrivacy = (postData, setPostData) => {
	const [privacy, setPrivacy] = useState(postData?.privacy)

	const handlePrivacy = privacy => {
		setPostData({ ...postData, privacy })
		setPrivacy(privacy)
	}

	return { privacy, setPrivacy, handlePrivacy }
}
