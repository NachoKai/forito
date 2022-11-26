import { useState } from 'react'

export const usePrivacy = (postData, setPostData, post) => {
	const [privacy, setPrivacy] = useState(post?.privacy)

	const handlePrivacy = privacy => {
		setPostData({ ...postData, privacy })
		setPrivacy(privacy)
	}

	return { privacy, setPrivacy, handlePrivacy }
}
