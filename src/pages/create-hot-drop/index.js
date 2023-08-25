import LayoutView from '@/components/layout'
import { Box, Button, Center, CircularProgress, Divider, Flex, Image, Input, InputGroup, InputRightElement, SimpleGrid, Text, VStack, useToast } from '@chakra-ui/react'
import React, { useCallback, useContext, useEffect, useState } from 'react';
import avatar from '@/assets/images/avatar.png'
import ProfileInput from '@/components/form/ProfileInput';
import Auth from '@/hoc/Auth';
import { CheckIcon, CloseIcon, DeleteIcon } from '@chakra-ui/icons';
import { useFormik } from 'formik';
import { GlobalContext } from '@/context/Provider';
import { BiCamera, BiPencil } from 'react-icons/bi';
import { useMutation, useQuery } from 'react-query';
import { useDropzone } from 'react-dropzone';
import { authenticateUser } from '@/context/actions/auth';
import { createCategoryApi, getCategoriesApi } from '@/apis/category';
import { useRouter } from 'next/router';
import ProfileSelect from '@/components/form/ProfileSelect';
import { createForum } from '@/apis/forum';
import FormTextarea from '@/components/form/FormTextarea';

const CreateHotDrop = () => {
  const toast = useToast()
  const router = useRouter()
  const { authState } = useContext(GlobalContext)
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
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    }
  }, [fileRejections, acceptedFiles]);

  const { data } = useQuery(["getCategories"], getCategoriesApi);
  const categories = data?.data?.data

  const { isLoading, mutate } = useMutation(createForum, {
    onSuccess: (res) => {
      toast({
        title: "Topic created",
        description: `You have successfully created a forum article`,
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
      return router.push('/hot-drops')
    },
    onError: (err) => {
      toast({
        title: `"Oops...`,
        description: `${err.response?.data?.message || 'Something went wrong, try again'}`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    },
  })

  const formik = useFormik({
    initialValues: {
      image: '',
      title: '',
      content: '',
      readTime: '',
      category: ''
    },
    onSubmit: (values) => {
      console.log('values', values)
      const formData = new FormData()
      formData.append('file', values?.image)
      formData.append('title', values?.title)
      formData.append('content', values?.content)
      formData.append('readTime', `${values?.readTime} mins`)
      formData.append('category', values?.category)
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
          <Text fontSize={{ base: '20px', md: '38px' }} fontWeight={700}>Create Forum Article</Text>
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
                <Text fontSize={{ base: '16px', md: '24px' }} fontWeight={600} color='#4D515E'>Title</Text>
                <Text fontWeight={400} fontSize={{ base: '14px', md: '19px' }}>Title of article</Text>
              </VStack>
              <Box>
                <ProfileInput
                  value={formik.values.title}
                  error={formik.errors.title}
                  onChange={formik.handleChange('title')}
                  w='full'
                  label={'Title'}
                />
              </Box>
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: '10px', md: '20px' }} justifyContent={'center'}>
              <VStack spacing={'4px'} align={'stretch'} w='full'>
                <Text fontSize={{ base: '16px', md: '24px' }} fontWeight={600} color='#4D515E'>Content</Text>
                <Text fontWeight={400} fontSize={{ base: '14px', md: '19px' }}>Write a content for this topic</Text>
              </VStack>
              <FormTextarea
                value={formik.values.content}
                error={formik.errors.content}
                onChange={formik.handleChange('content')}
                w='full'
                placeholder={'Content'}
              />
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: '10px', md: '20px' }} justifyContent={'center'}>
              <VStack spacing={'4px'} align={'stretch'} w='full'>
                <Text fontSize={{ base: '16px', md: '24px' }} fontWeight={600} color='#4D515E'>Category</Text>
                <Text fontWeight={400} fontSize={{ base: '14px', md: '19px' }}>Select a category for this topic</Text>
              </VStack>
              <ProfileSelect
                options={(categories?.map(cat => cat?.name) || [])}
                value={formik.values.category}
                error={formik.errors.category}
                onChange={formik.handleChange('category')}
                w='full'
                label={'Category'}
              />
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: '10px', md: '20px' }} justifyContent={'center'}>
              <VStack spacing={'4px'} align={'stretch'} w='full'>
                <Text fontSize={{ base: '16px', md: '24px' }} fontWeight={600} color='#4D515E'>Read time</Text>
                <Text fontWeight={400} fontSize={{ base: '14px', md: '19px' }}>Enter how long it will take users to read this article</Text>
              </VStack>

              <InputGroup py='6px' border='1px' borderRadius={'4px'} w='90%'>
                <Input
                  type='number'
                  value={formik.values.readTime}
                  error={formik.errors.readTime}
                  onChange={formik.handleChange('readTime')}
                  w='full' border={'none'}
                  _focus={{ border: 'none', outline: 'none' }}
                  placeholder="Read time"
                />
                <InputRightElement
                  h='full' w='50px' px={"14px"}
                  borderLeft={"1px solid #999"}
                >
                  <Text
                    cursor={'pointer'}
                    color={'#2B2D42'}
                    fontSize={'16px'}
                    fontWeight={600}
                  >Mins</Text>
                </InputRightElement>
              </InputGroup>

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

export default Auth(CreateHotDrop)