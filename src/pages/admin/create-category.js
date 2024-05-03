import LayoutView from '@/components/layout'
import { Box, Button, Center, CircularProgress, Divider, Flex, Image, SimpleGrid, Text, VStack, useToast } from '@chakra-ui/react'
import React, { useCallback, useContext, useEffect, useState } from 'react';
import avatar from '@/assets/images/avatar.png'
import ProfileInput from '@/components/form/ProfileInput';
import Auth from '@/hoc/Auth';
import { CheckIcon, CloseIcon, DeleteIcon } from '@chakra-ui/icons';
import { useFormik } from 'formik';
import { GlobalContext } from '@/context/Provider';
import { BiCamera, BiPencil } from 'react-icons/bi';
import { useMutation } from 'react-query';
import { useDropzone } from 'react-dropzone';
import { authenticateUser } from '@/context/actions/auth';
import { createCategoryApi } from '@/apis/category';
import { useRouter } from 'next/router';

const Profile = () => {
	const toast = useToast()
	const router = useRouter()
	const { authState, authDispatch } = useContext(GlobalContext)
	const user = authState?.user;
	const [copyImage, setCopyImage] = useState(null)

	const addFile = useCallback((acceptedFiles) => {
		const file = acceptedFiles[0]
		formik.setFieldValue('image', file)
		return encodeFileToBase64(file)
			.then((res) => setCopyImage(Object.assign({ image: res }, file, { preview: URL.createObjectURL(file), })))
			.catch(err => { })
	})

	const encodeFileToBase64 = (file) => {
		return new Promise((resolve, reject) => {
			var reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});
	};


	const { getRootProps, getInputProps, isDragActive, acceptedFiles, fileRejections } = useDropzone({
		accept: { "image/*": [], },
		maxSize: 2 * 1024 * 1024,
		multiple: false,
		onDrop: addFile
	});

	useEffect(() => {
		if (fileRejections.length) {
			toast({
				title: "Hmm...",
				description: `${fileRejections[0].errors[0].code}: file is larger than 2MB`,
				status: "error",
				duration: 5000,
				isClosable: true,
				position: "top-right",
			});
		}
	}, [fileRejections, acceptedFiles]);


	const { isLoading, mutate } = useMutation(createCategoryApi, {
		onSuccess: (res) => {
			toast({
				title: "Category created",
				description: `You have successfully created a category`,
				status: "success",
				duration: 5000,
				isClosable: true,
				position: "top-right",
			});
			return router.push('/admin')
		},
		onError: (err) => {
			toast({
				title: `"Oops...`,
				description: `${err.response?.data?.message || 'Something went wrong, try again'}`,
				status: "error",
				duration: 5000,
				isClosable: true,
				position: "top-right",
			});
		},
	})

	const formik = useFormik({
		initialValues: {
			image: '',
			name: '',
			description: '',
		},
		onSubmit: (values) => {
			const formData = new FormData()
			formData.append('image', values?.image)
			formData.append('name', values?.name)
			formData.append('description', values?.description)
			console.log('values', values)
			mutate(formData)
		}
	})

	return (
		<LayoutView>
			<Box px={{ base: '20px', md: '70px' }}>
				<Box
					color='#9F9898'
					mb={{ base: '40px', md: '90px' }}
					p={{ base: '30px', md: '70px' }}
					borderRadius={{ base: '12px', md: '24px' }} bg='white'
				>
					<Text fontSize={{ base: '20px', md: '38px' }} fontWeight={700}>Create Category</Text>
					<Flex align='center' gap={{ base: '15px', md: '24px' }} my={{ base: '15px', md: '35px' }} p={{ base: '15px', md: '35px' }}>
						<Center
							w={{ base: '60px', md: '96px' }}
							h={{ base: '60px', md: '96px' }}
							position={'relative'}
							{...getRootProps({ className: "dropzone" })}
						>
							<input {...getInputProps()} />
							{isDragActive ? (
								<Text>Drop the files here</Text>
							) : (
								<Flex
									bgPosition={'center'}
									bgSize={'contain'}
									direction={'column'}
									justify={'flex-end'}
									align={'stretch'}
									h={{ base: '100px', md: '140px' }}
									w={{ base: '100px', md: '140px' }}
									borderRadius={'4px'}
									border='1px solid #C9C5C5'
									flexDirection={'column'}
									bgImage={copyImage?.image}
								>
									<Center
										h={{ base: '100px', md: '140px' }}
										w={{ base: '100px', md: '140px' }}
										borderRadius={'4px'}
										border='1px solid #C9C5C5'
										flexDirection={'column'}
										{...getRootProps({ className: "dropzone" })}
									>
										<input {...getInputProps()} />
										<BiCamera size={25} />
										{isDragActive ? (
											<Text>Drop the files here</Text>
										) : (
											<Text>Add a photo</Text>
										)}
									</Center>
								</Flex>
							)}
						</Center>

					</Flex>
					<VStack align={'stretch'} spacing={{ base: '15px', md: '35px' }}>
						<SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: '10px', md: '20px' }} justifyContent={'center'}>
							<VStack spacing={'4px'} align={'stretch'} w='full'>
								<Text fontSize={{ base: '16px', md: '24px' }} fontWeight={600} color='#4D515E'>Name</Text>
								<Text fontWeight={400} fontSize={{ base: '14px', md: '19px' }}>Name for this Category</Text>
							</VStack>
							<Box>
								<ProfileInput
									value={formik.values.name}
									error={formik.errors.name}
									onChange={formik.handleChange('name')}
									w='full'
									label={'Name'}
								/>
							</Box>
						</SimpleGrid>

						<SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: '10px', md: '20px' }} justifyContent={'center'}>
							<VStack spacing={'4px'} align={'stretch'} w='full'>
								<Text fontSize={{ base: '16px', md: '24px' }} fontWeight={600} color='#4D515E'>Description</Text>
								<Text fontWeight={400} fontSize={{ base: '14px', md: '19px' }}>Write a description for this category</Text>
							</VStack>
							<ProfileInput
								value={formik.values.description}
								error={formik.errors.description}
								onChange={formik.handleChange('description')}
								w='full'
								label={'Description'}
							/>
						</SimpleGrid>
					</VStack>


					<Flex mt='70px' justify={'space-between'} align={'center'}>
						<Button bg='transparent' border=' 1px solid #999' px='24px' py='16px' borderRadius={'4px'}>Cancel</Button>
						<Button
							disabled={isLoading}
							isLoading={isLoading}
							onClick={formik.handleSubmit}
							bg='#2B2D42' px='24px'
							py='16px' borderRadius={'4px'}
							color='white'
						>Create</Button>
					</Flex>
				</Box>
			</Box>
		</LayoutView>
	)
}

export default Auth(Profile)