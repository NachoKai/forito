import PropTypes from 'prop-types'

import { ChakraTagInput } from './ChakraTagInput'

export const ChipInput = ({ tags, setTags }) => {
	const handleTagsChange = (event, tags) => {
		setTags([...new Set(tags)])
	}

	return <ChakraTagInput tags={tags} w='100%' onTagsChange={handleTagsChange} />
}

ChipInput.propTypes = {
	tags: PropTypes.arrayOf(PropTypes.string),
	setTags: PropTypes.func,
}
