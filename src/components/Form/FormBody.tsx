import { DrawerBody, Stack } from '@chakra-ui/react'
import { ChangeEvent } from 'react'
import styled from '@emotion/styled'

import { FormInput } from '../common/FormInput'
import { FormTextArea } from '../common/FormTextArea'
import { ImageUpload } from './ImageUpload'
import { PrivacySelector } from './PrivacySelector'

interface FormBodyProps {
	areValidTags: boolean
	handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
	handlePrivacy: (privacy: string) => void
	handleRemoveImage: () => void
	images: any[]
	onImageUpload: (imageList: any[]) => void
	postData: any
	privacy: string
	setPostData: (data: any) => void
}

export const FormBody = ({
	areValidTags,
	handleChange,
	handlePrivacy,
	handleRemoveImage,
	images,
	onImageUpload,
	postData,
	privacy,
	setPostData,
}: FormBodyProps) => {
	return (
		<DrawerBody>
			<Form noValidate autoComplete='off'>
				<Stack spacing='4'>
					<FormInput
						isRequired
						dataCy='form-title'
						label='Title'
						maxLength={105}
						name='title'
						tooltip='Required'
						value={postData?.title}
						onChange={handleChange}
					/>

					<FormTextArea
						isRequired
						dataCy='form-message'
						label='Message'
						maxLength={27440}
						name='message'
						tooltip='Required'
						value={postData?.message}
						onChange={handleChange}
					/>

					<FormInput
						dataCy='form-tags'
						helper='Separated by commas.'
						isInvalid={!areValidTags}
						label='Tags'
						maxLength={55}
						name='tags'
						validation={!areValidTags && 'Insert only letters and numbers.'}
						value={[...new Set(postData?.tags)].join(',')}
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
					{images.length ? (
						<FormInput
							dataCy='form-alt'
							helper='You can add an "alt text" to your photos to make them accessible to more people, such as people who are blind or visually impaired.'
							label='Image description'
							maxLength={105}
							name='alt'
							value={postData?.alt}
							onChange={handleChange}
						/>
					) : null}

					<FormInput
						isRequired
						child={<PrivacySelector handlePrivacy={handlePrivacy} privacy={privacy} />}
						label='Privacy'
						name='privacy'
						tooltip='Private Posts will only be visible to their creator'
					/>
				</Stack>
			</Form>
		</DrawerBody>
	)
}

const Form = styled.form`
	width: 100%;
`
