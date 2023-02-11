import { Button, Flex, HStack, Image, Stack } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import ImageUploading from 'react-images-uploading'

import { showError } from '../../utils/showError'

const VALID_IMAGE_TYPES = ['jpg', 'jpeg', 'gif', 'png']
const VALID_IMAGE_SIZE = 1024 * 1024 * 2.1

export const ImageUpload = ({ handleRemoveImage, images, onImageUpload, postData }) => {
	return (
		<ImageUploading
			acceptType={VALID_IMAGE_TYPES}
			dataURLKey='data_url'
			maxFileSize={VALID_IMAGE_SIZE}
			maxNumber={1}
			value={images}
			onChange={onImageUpload}
			onError={() =>
				showError('Something went wrong when trying to upload image. Please try again.')
			}
		>
			{({ imageList, onImageUpload, onImageUpdate, isDragging, dragProps, errors }) => (
				<Stack className='upload__image-wrapper' spacing='2'>
					{errors && (
						<Stack m='4px 0' spacing='2'>
							{errors.maxNumber && (
								<Flex color='red.400' fontWeight='bold' mb='4px'>
									Number of selected images exceed maxNumber.
								</Flex>
							)}
							{errors.acceptType && (
								<Flex color='red.400' fontWeight='bold' mb='4px'>
									Your selected file type is not allow.
								</Flex>
							)}
							{errors.maxFileSize && (
								<Flex color='red.400' fontWeight='bold' mb='4px'>
									Selected file size exceed max file size.
								</Flex>
							)}
							{errors.resolution && (
								<Flex color='red.400' fontWeight='bold' mb='4px'>
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
						<HStack key={index} className='image-item' spacing='2'>
							<Image
								alt=''
								h='100px'
								objectFit='contain'
								src={image?.data_url}
								w='100px'
							/>
							<Stack align='center' direction='column' justify='center' spacing={2}>
								<Button
									className='button'
									variant='outline'
									onClick={() => onImageUpdate(index)}
								>
									Update
								</Button>
								<Button
									className='button'
									colorScheme='red'
									variant='outline'
									onClick={handleRemoveImage}
								>
									Remove
								</Button>
							</Stack>
						</HStack>
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
