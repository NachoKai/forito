import ImageUploading from 'react-images-uploading'
import { Button, Flex, Image, Stack } from '@chakra-ui/react'
import PropTypes from 'prop-types'

import { showError } from '../../utils/showError.ts'

export const ImageUpload = ({ handleRemoveImage, images, onImageUpload, postData }) => {
	return (
		<ImageUploading
			acceptType={['jpg', 'jpeg', 'gif', 'png']}
			dataURLKey='data_url'
			maxFileSize={1024 * 1024 * 2.1}
			maxNumber={1}
			value={images}
			onChange={onImageUpload}
			onError={() =>
				showError('Something went wrong when trying to upload image. Please try again.')
			}
		>
			{({ imageList, onImageUpload, onImageUpdate, isDragging, dragProps, errors }) => (
				<Stack className='upload__image-wrapper' spacing='2'>
					{Boolean(errors) && (
						<Stack m='4px 0' spacing='2'>
							{Boolean(errors.maxNumber) && (
								<Flex color='red.400' fontWeight='bold' marginBottom='4px'>
									Number of selected images exceed maxNumber.
								</Flex>
							)}
							{Boolean(errors.acceptType) && (
								<Flex color='red.400' fontWeight='bold' marginBottom='4px'>
									Your selected file type is not allow.
								</Flex>
							)}
							{Boolean(errors.maxFileSize) && (
								<Flex color='red.400' fontWeight='bold' marginBottom='4px'>
									Selected file size exceed max file size.
								</Flex>
							)}
							{Boolean(errors.resolution) && (
								<Flex color='red.400' fontWeight='bold' marginBottom='4px'>
									Selected file is not match your desired resolution.
								</Flex>
							)}
						</Stack>
					)}
					{(!postData?.selectedFile?.url || !images?.length) && (
						<Stack
							borderColor={isDragging ? 'gray_700_200' : 'primary_600_100'}
							borderRadius='16px'
							borderStyle='dashed'
							borderWidth='2px'
						>
							<Button
								bg={isDragging ? 'gray_200_700' : undefined}
								borderRadius='16px'
								color={isDragging ? 'gray_700_200' : 'primary_600_100'}
								variant='ghost'
								onClick={onImageUpload}
								{...dragProps}
								p={{ sm: '6', md: '8', lg: '8', xl: '8' }}
							>
								Click or drag & drop image here
							</Button>
						</Stack>
					)}
					{imageList?.map((image, index) => (
						<Stack key={index} className='image-item' direction='row' spacing='2'>
							<Image
								alt=''
								h='100px'
								objectFit='contain'
								src={image?.data_url}
								w='100px'
							/>
							<Flex align='center' direction='column' justify='center'>
								<Button variant='ghost' onClick={() => onImageUpdate(index)}>
									Update
								</Button>
								<Button variant='ghost' onClick={handleRemoveImage}>
									Remove
								</Button>
							</Flex>
						</Stack>
					))}
				</Stack>
			)}
		</ImageUploading>
	)
}

ImageUpload.propTypes = {
	handleRemoveImage: PropTypes.func,
	images: PropTypes.array,
	onImageUpload: PropTypes.func,
	onImageUpdate: PropTypes.func,
	postData: PropTypes.object,
}
