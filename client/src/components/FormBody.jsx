import { DrawerBody, Stack } from '@chakra-ui/react'
import PropTypes from 'prop-types'

import FormInput from './common/FormInput'
import FormTextArea from './common/FormTextArea'
import ImageUpload from './ImageUpload'
import PrivacySelector from './PrivacySelector'

const FormBody = ({
	areValidTags,
	handleChange,
	handlePrivacy,
	handleRemoveImage,
	images,
	onImageUpload,
	postData,
	privacy,
	setPostData,
}) => {
	return (
		<DrawerBody>
			<form noValidate autoComplete='off' style={{ width: '100%' }}>
				<Stack spacing='4'>
					<FormInput
						isRequired
						dataCy='form-title'
						label='Title'
						maxLength='105'
						name='title'
						tooltip='Required'
						value={postData?.title}
						onChange={handleChange}
					/>

					<FormTextArea
						isRequired
						dataCy='form-message'
						label='Message'
						maxLength='27440'
						name='message'
						tooltip='Required'
						value={postData?.message}
						onChange={handleChange}
					/>

					<FormInput
						dataCy='form-tags'
						helper='Separated by commas.'
						isInvalid={areValidTags}
						label='Tags'
						maxLength='55'
						name='tags'
						validation={areValidTags && 'Insert only letters and numbers.'}
						value={[...new Set(postData?.tags)]}
						onChange={e => {
							setPostData({
								...postData,
								tags: e.target.value.toLowerCase().trim().split(','),
							})
						}}
					/>

					<FormInput
						child={
							<ImageUpload
								handleRemoveImage={handleRemoveImage}
								images={images}
								postData={postData}
								onImageUpload={onImageUpload}
							/>
						}
						helper='Max: 2mb. Formats: jpg, jpeg, png, gif.'
						label='Upload image'
					/>

					<FormInput
						isRequired
						child={<PrivacySelector handlePrivacy={handlePrivacy} privacy={privacy} />}
						label='Privacy'
						name='privacy'
						tooltip='Private Posts will only be visible to their creator'
					/>
				</Stack>
			</form>
		</DrawerBody>
	)
}

export default FormBody

FormBody.propTypes = {
	areValidTags: PropTypes.bool,
	handleChange: PropTypes.func,
	handlePrivacy: PropTypes.func,
	handleRemoveImage: PropTypes.func,
	images: PropTypes.array,
	onImageUpload: PropTypes.func,
	postData: PropTypes.object,
	privacy: PropTypes.string,
	setPostData: PropTypes.func,
}
