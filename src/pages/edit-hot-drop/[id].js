import LayoutView from '@/components/layout'
import { Box, Button, Center, CircularProgress, Divider, Flex, GridItem, Image, Input, InputGroup, InputRightElement, ListItem, SimpleGrid, Skeleton, Text, UnorderedList, VStack, useToast } from '@chakra-ui/react'
import React, { useCallback, useContext, useEffect, useState } from 'react';
import avatar from '@/assets/images/avatar.png'
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
import { createForum, fetchMyForums, getForum, updateForum } from '@/apis/forum';
import FormTextarea from '@/components/form/FormTextarea';
import FormInput from '@/components/form/FormInput';
import FormSelect from '@/components/form/FromSelect';
import HotDropDetail from '@/components/card/HotDropsCardDetails';
import EmptyState from '@/components/empty-state';

const EditHotDrop = () => {
  const toast = useToast()
  const router = useRouter()
  const { authState } = useContext(GlobalContext)
  const user = authState?.user;
  const [copyImage, setCopyImage] = useState(null)
  const forumId = router.query.id
  const { data: forumData } = useQuery(["getForum", forumId], () => getForum(forumId));
  const forumsObj = forumData?.data?.data;
  const { data: forumsData, isLoading: myforumLoading, } = useQuery(["fetchMyForums"], fetchMyForums);
  const forums = forumsData?.data?.data;
  const { data } = useQuery(["getCategories"], getCategoriesApi);
  const categories = data?.data?.data


  useEffect(() => {
    formik.setValues({
      // image: forumsObj?.image || '',
      title: forumsObj?.title || '',
      content: forumsObj?.content || '',
      category: forumsObj?.category || ''
    })
  }, [forumsObj])



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


  const { isLoading, mutate } = useMutation((formData) => updateForum(formData, forumId), {
    onSuccess: (res) => {
      toast({
        title: "Hotdrop edited",
        description: `You have successfully edited your hotdrop, but awaits admin approval`,
        status: "success",
        duration: 5000,
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
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    },
  })

  const formik = useFormik({
    initialValues: {
      // image: forumsObj?.image || '',
      title: forumsObj?.title || '',
      content: forumsObj?.content || '',
      category: forumsObj?.category || ''
    },
    onSubmit: (values) => {
      const formData = new FormData()
      formData.append('file', values?.image)
      formData.append('title', values?.title)
      formData.append('content', values?.content)
      formData.append('category', values?.category)
      mutate(formData)
    }
  })

  return (
    <LayoutView>
      <Box px={{ base: '20px', md: '70px' }}>
        <Box
          color='#4D515E'
          mb={{ base: '40px', md: '90px' }}
          p={{ base: '30px', md: '70px' }}
          borderRadius={{ base: '12px', md: '24px' }} bg='white'
        >
          <Text fontSize={{ base: '20px', md: '38px' }} fontWeight={500}>Create an hotdrop</Text>
          <Text fontSize={{ base: '25px', md: '20px' }} fontWeight={400}>Ready to thread the needle of innovation? Drop into our Textile Forum today and let your ideas and expertise become part of our ever-evolving fabric</Text>
          <Text fontSize={{ base: '20px', md: '20px' }} fontWeight={500} mt='40px'>Cover Photo *</Text>
          <Text fontSize={{ base: '25px', md: '15px' }} fontWeight={400}>Chose an Image that correspond with  your intended topic</Text>

          <Flex direction={'column'} justify='center' gap={{ base: '15px', md: '24px' }} my={{ base: '15px', md: '30px' }} p={{ base: '15px', md: '35px' }}>
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
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: '10px', md: '20px' }} justifyContent={'center'}>
              <VStack spacing={'4px'} align={'stretch'} w='full'>
                <Text fontSize={{ base: '16px', md: '24px' }} fontWeight={600} >Title Category *</Text>
                <Text fontWeight={400} fontSize={{ base: '14px', md: '19px' }}>Choose or create a title category</Text>
              </VStack>
              <GridItem colSpan={2}>
                <FormSelect
                  options={(categories?.map(cat => cat?.name) || [])}
                  value={formik.values.category}
                  error={formik.errors.category}
                  onChange={formik.handleChange('category')}
                  w='full'
                />
              </GridItem>
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: '10px', md: '20px' }} justifyContent={'center'}>
              <VStack spacing={'4px'} align={'stretch'} w='full'>
                <Text fontSize={{ base: '16px', md: '24px' }} fontWeight={600} >Drop Topic *</Text>
                <Text fontWeight={400} fontSize={{ base: '14px', md: '19px' }}>Choose or create a title category</Text>
              </VStack>
              <GridItem colSpan={2}>
                <Box>
                  <FormInput
                    value={formik.values.title}
                    error={formik.errors.title}
                    onChange={formik.handleChange('title')}
                    w='full'
                  />
                </Box>
              </GridItem>
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: '10px', md: '20px' }} justifyContent={'center'}>
              <VStack spacing={'4px'} align={'stretch'} w='full'>
                <Text fontSize={{ base: '16px', md: '24px' }} fontWeight={600} >Drop Content *</Text>
                <Text fontWeight={400} fontSize={{ base: '14px', md: '19px' }}>
                  Create engaging and well crafted article for the community to engage with.
                  NB: All articles are subject to verification before it is finally published.
                </Text>
                <Box>
                  <Text fontSize={{ base: '12px', md: '16px' }} fontWeight={400} >
                    Tips:
                    <UnorderedList>
                      <ListItem>Avoid usage of vulgar words</ListItem>
                      <ListItem>Keep grammar articulate and correct</ListItem>
                      <ListItem>Keep content in line with platform’s purpose</ListItem>
                      <ListItem>Do not directly advertise any product</ListItem>
                    </UnorderedList>
                  </Text>
                </Box>
              </VStack>
              <GridItem colSpan={2}>
                <FormTextarea
                  h='500px'
                  value={formik.values.content}
                  error={formik.errors.content}
                  onChange={formik.handleChange('content')}
                  w='full'
                />
              </GridItem>
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
            >Update</Button>
          </Flex>

          <Divider mt='100px' mb='60px' />


          <Text mb='30px' fontSize={'40px'} fontWeight={500} color='#4D515E'>Engaged Drops</Text>
          <Skeleton isLoaded={!myforumLoading}>
            <SimpleGrid my={{ base: '20px', md: '40px' }} columns={{ base: '2', md: '3' }} columnGap={{ base: '10px', md: '26px' }} rowGap={{ base: '15px', md: '56px' }}>
              {forums?.map((card, i) => (
                <HotDropDetail
                  isPending
                  user={card?.creator?.fullname}
                  subTitle={card?.content}
                  onClickCard={() => router.push(`/hot-drop/${card?._id}`)}
                  time={card?.createdAt && new Date(card?.createdAt).toDateString()}
                  timeToRead={card?.readTime}
                  category={card?.category}
                  id={i} key={i}
                  image={card?.image}
                  title={card?.title}
                // person={card?.person}
                />
              ))}
            </SimpleGrid>
            {!forums?.length && (
              <EmptyState height={'200px'} text={'No forum article by me yet'} />
            )}
          </Skeleton>


        </Box>
      </Box>
    </LayoutView>
  )
}

export default Auth(EditHotDrop)