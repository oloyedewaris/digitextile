import LayoutView from '@/components/layout'
import { Box, Button, Center, CircularProgress, Divider, Flex, Image, SimpleGrid, Text, VStack, useToast } from '@chakra-ui/react'
import React, { useCallback, useContext, useEffect, useState } from 'react';
import avatar from '@/assets/images/avatar.png'
import ProfileInput from '@/components/form/ProfileInput';
import ProfileSelect from '@/components/form/ProfileSelect';
import Auth from '@/hoc/Auth';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { useFormik } from 'formik';
import statesData from '@/utils/states.json'
import { GlobalContext } from '@/context/Provider';
import { BiPencil } from 'react-icons/bi';
import FormInput from '@/components/form/FormInput';
import { updateUserProfileApi, updateUserProfileImageApi } from '@/apis/user';
import { useMutation } from 'react-query';
import { useDropzone } from 'react-dropzone';
import { authenticateUser } from '@/context/actions/auth';

const Profile = () => {
  const toast = useToast()
  const { authState, authDispatch } = useContext(GlobalContext)
  const [languageName, setLanguageName] = useState('');
  const [editingName, setEditingName] = useState(false);
  const [DOB, setDOB] = useState({});
  const user = authState?.user;

  const addFile = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const formData = new FormData()
      formData.append('image', file)
      mutateImage(formData)
    });
  })


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


  const { isLoading, mutate } = useMutation(updateUserProfileApi, {
    onSuccess: (res) => {
      return toast({
        title: "Profile updated",
        description: `You have successfully updated your profile`,
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
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

  const { isLoading: updatingProfileImage, mutate: mutateImage } = useMutation(updateUserProfileImageApi, {
    onSuccess: (res) => {
      authenticateUser(res.data)(authDispatch)
      return toast({
        title: "Profile image updated",
        description: `You have successfully updated your profile`,
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
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
      phone: user?.phone || "",
      fullname: user?.fullname || "",
      email: user?.email || "",
      state: user?.state || "",
      city: user?.city || "",
      address: user?.address || "",
      languages: user?.languages || [],
      dateOfBirth: user?.dateOfBirth || "",
      gender: user?.gender || "",
      bio: user?.bio || "",
      businessTag: user?.businessTag || "",
      username: user?.username || "",
      skills: []
    },
    onSubmit: (values) => {
      const monthIndex = Object.keys(monthsData).findIndex(val => val === DOB.month)
      const valuesToUse = {
        ...values,
        dateOfBirth: `${monthIndex + 1}/${DOB.day}/${DOB.year}`
      }

      mutate(valuesToUse)
    }
  })

  const monthsData = {
    'January': 31,
    'February': 29,
    'March': 31,
    'April': 30,
    'May': 31,
    'June': 30,
    'July': 31,
    'August': 31,
    'September': 30,
    'October': 31,
    'November': 30,
    'December': 31,
  }

  const addLanguages = () => {
    if (formik.values.languages.length >= 6)
      return toast({
        title: "Hmm...",
        description: `You can only add 6 languages`,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });

    if (!languageName)
      return toast({
        title: "Hmm...",
        description: `Enter a tag name`,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });

    formik.setFieldValue('languages', [...formik.values.languages, languageName])
    setLanguageName('')
  }

  const removeLanguage = (index) => {
    const copy = [...formik.values.languages];
    for (let i = 0; i < copy.length; i++) {
      if (i == index) {
        copy.splice(i, 1);
        i = copy.length;
      }
    }
    formik.setFieldValue('languages', copy);
  };

  const now = new Date().getUTCFullYear();

  return (
    <LayoutView>
      <Box px={{ base: '20px', md: '70px' }}>
        <Box
          color='#9F9898'
          mb={{ base: '40px', md: '90px' }}
          p={{ base: '30px', md: '70px' }}
          borderRadius={{ base: '12px', md: '24px' }} bg='white'
        >
          <Text fontSize={{ base: '20px', md: '38px' }} fontWeight={700}>My Profile</Text>
          <Text fontSize={{ base: '17px', md: '29px' }} fontWeight={600} mt={{ base: '20px', md: '60px' }}>Personalize</Text>
          <Divider w='full' />
          <Flex align='center' gap={{ base: '15px', md: '24px' }} my={{ base: '15px', md: '35px' }}>
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
                <>
                  {updatingProfileImage ? (
                    <CircularProgress isIndeterminate size="44px" />
                  ) : (
                    <Image
                      position={'absolute'}
                      right='0'
                      bottom={0}
                      borderRadius={'full'}
                      src={user?.image || avatar.src}
                      w={{ base: '60px', md: '96px' }}
                      h={{ base: '60px', md: '96px' }}
                    />
                  )}
                </>
              )}
            </Center>

            <Flex align='center' gap='10px'>
              {editingName ? (
                <FormInput
                  value={formik.values.fullname}
                  error={formik.errors.fullname}
                  onChange={formik.handleChange('fullname')}
                />
              ) : (
                <Text color='#1C1D2C' fontWeight={700} fontSize={{ base: '15px', md: '29px' }}>{formik.values.fullname}</Text>
              )}
              {editingName ? (
                <CheckIcon color='#1565C0' size={25} cursor='pointer' onClick={() => setEditingName(!editingName)} />
              ) : (
                <BiPencil color='#1565C0' size={25} cursor='pointer' onClick={() => setEditingName(!editingName)} />
              )}
            </Flex>
          </Flex>
          <VStack align={'stretch'} spacing={{ base: '15px', md: '35px' }}>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: '10px', md: '20px' }} justifyContent={'center'}>
              <VStack spacing={'4px'} align={'stretch'} w='full'>
                <Text fontSize={{ base: '16px', md: '24px' }} fontWeight={600} color='#4D515E'>Date of Birth</Text>
                <Text fontWeight={400} fontSize={{ base: '14px', md: '19px' }}>Let’s make your day one to remember together</Text>
              </VStack>
              <Flex w='full' gap='12px'>
                <Box w={'50%'}>
                  <ProfileSelect
                    options={Object.keys(monthsData)}
                    onChange={(e) => setDOB({ ...DOB, month: e.target.value })}
                    w='full'
                    value={DOB.month || ''}
                    label={'Month'}
                  />
                </Box>
                <Box w={'25%'}>
                  <ProfileSelect
                    w='full'
                    options={Array.from({ length: monthsData[DOB?.month] || 30 }, (_, index) => index + 1)}
                    onChange={(e) => setDOB({ ...DOB, day: e.target.value })}
                    value={DOB.day || ''}
                    label={'Day'}
                  />
                </Box>
                <Box w={'25%'}>
                  <ProfileSelect
                    w='full'
                    options={Array(now - (now - 80)).fill('').map((v, idx) => now - idx)}
                    onChange={(e) => setDOB({ ...DOB, year: e.target.value })}
                    value={DOB.year || ''}
                    label={'Year'}
                  />
                </Box>
              </Flex>
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: '10px', md: '20px' }} justifyContent={'center'}>
              <VStack spacing={'4px'} align={'stretch'} w='full'>
                <Text fontSize={{ base: '16px', md: '24px' }} fontWeight={600} color='#4D515E'>Language</Text>
                <Text fontWeight={400} fontSize={{ base: '14px', md: '19px' }}>What languages are you fluent in</Text>
              </VStack>
              <Box>
                <Flex align='center' gap='20px'>
                  <ProfileSelect
                    value={languageName}
                    onChange={(e) => setLanguageName(e.target.value)}
                    w='full'
                    options={['English', 'Yoruba', 'Igbo', 'Hausa', 'Pidgin']}
                    label={'Languages'}
                  />
                  <Text
                    onClick={addLanguages}
                    cursor={'pointer'}
                    color={'#2B2D42'}
                    fontSize={'16px'}
                    fontWeight={600}
                  >Add</Text>
                </Flex>
                <Flex mt='12px' align='center' gap='15px'>
                  {formik.values.languages.map((tag, index) => (
                    <Center gap='10px' bg='#E4DFDA' w='fit-content' py='6px' px='12px' borderRadius={'full'}>
                      {tag}
                      <CloseIcon
                        cursor={'pointer'}
                        onClick={() => removeLanguage(index)}
                        fontSize={'12px'}
                      />
                    </Center>
                  ))}
                </Flex>
              </Box>
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: '10px', md: '20px' }} justifyContent={'center'}>
              <VStack spacing={'4px'} align={'stretch'} w='full'>
                <Text fontSize={{ base: '16px', md: '24px' }} fontWeight={600} color='#4D515E'>Gender</Text>
                <Text fontWeight={400} fontSize={{ base: '14px', md: '19px' }}>What is your gender from birth</Text>
              </VStack>
              <ProfileSelect
                options={['Male', 'Female']}
                value={formik.values.gender}
                error={formik.errors.gender}
                onChange={formik.handleChange('gender')}
                w='full'
                label={'Gender'}
              />
            </SimpleGrid>
          </VStack>

          <Text mt={{ base: '30px', md: '60px' }} fontSize={'29px'} fontWeight={600}>Contact Info</Text>
          <Divider w={'full'} />

          <VStack align={'stretch'} spacing={{ base: '15px', md: '35px' }} mt={{ base: '20px', md: '35px' }}>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: '10px', md: '20px' }} justifyContent={'center'}>
              <VStack spacing={'4px'} align={'stretch'} w='full'>
                <Text fontSize={{ base: '16px', md: '24px' }} fontWeight={600} color='#4D515E'>State of Residence</Text>
                <Text fontWeight={400} fontSize={{ base: '14px', md: '19px' }}>Where do you live currently</Text>
              </VStack>
              <Flex w='full' gap='12px'>
                <Box w={'50%'}>
                  <ProfileSelect
                    value={formik.values.state}
                    error={formik.errors.state}
                    onChange={formik.handleChange('state')}
                    options={statesData}
                    w='full'
                    placeholder={'State'}
                  />
                </Box>
                <Box w={'50%'}>
                  <ProfileSelect
                    value={formik.values.city}
                    error={formik.errors.city}
                    onChange={formik.handleChange('city')}
                    options={statesData}
                    w='full'
                    placeholder={'City'}
                  />
                </Box>
              </Flex>
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: '10px', md: '20px' }} justifyContent={'center'}>
              <VStack spacing={'4px'} align={'stretch'} w='full'>
                <Text fontSize={{ base: '16px', md: '24px' }} fontWeight={600} color='#4D515E'>Residential Address</Text>
                <Text fontWeight={400} fontSize={{ base: '14px', md: '19px' }}>Help us serve you better based on your location</Text>
              </VStack>
              <ProfileInput
                w='full'
                value={formik.values.address}
                error={formik.errors.address}
                onChange={formik.handleChange('address')}
                label={'Address'}
              />
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: '10px', md: '20px' }} justifyContent={'center'}>
              <VStack spacing={'4px'} align={'stretch'} w='full'>
                <Text fontSize={{ base: '16px', md: '24px' }} fontWeight={600} color='#4D515E'>Phone Number</Text>
                <Text fontWeight={400} fontSize={{ base: '14px', md: '19px' }}>What languages are you fluent in</Text>
              </VStack>
              <ProfileInput
                w='full'
                type='tel'
                value={formik.values.phone}
                error={formik.errors.phone}
                onChange={formik.handleChange('phone')}
                label={'Phone Number'}
              />
            </SimpleGrid>
          </VStack>

          <Text mt={{ base: '30px', md: '60px' }} fontSize={'29px'} fontWeight={600}>Verified Information</Text>
          <Divider w={'full'} />

          <VStack align={'stretch'} spacing={{ base: '15px', md: '35px' }} mt={{ base: '20px', md: '35px' }}>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: '10px', md: '20px' }} justifyContent={'center'}>
              <VStack spacing={'4px'} align={'stretch'} w='full'>
                <Text fontSize={{ base: '16px', md: '24px' }} fontWeight={600} color='#4D515E'>Email</Text>
                <Text fontWeight={400} fontSize={{ base: '14px', md: '19px' }}>Your Email</Text>
              </VStack>
              <Flex w='full' gap='12px'>
                <Box w={'full'}>
                  <ProfileInput
                    value={formik.values.email}
                    error={formik.errors.email}
                    onChange={formik.handleChange('email')}
                    w='full'
                    label={'Email'}
                  />
                </Box>
              </Flex>
            </SimpleGrid>
          </VStack>


          <Text mt={{ base: '30px', md: '60px' }} fontSize={'29px'} fontWeight={600}>Security</Text>
          <Divider w={'full'} />

          <VStack align={'stretch'} spacing={{ base: '15px', md: '35px' }} mt={{ base: '20px', md: '35px' }}>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: '10px', md: '20px' }} justifyContent={'center'}>
              <VStack spacing={'4px'} align={'stretch'} w='full'>
                <Text fontSize={{ base: '16px', md: '24px' }} fontWeight={600} color='#4D515E'>Password</Text>
                <Text fontWeight={400} fontSize={{ base: '14px', md: '19px' }}>Change your password to a new one</Text>
              </VStack>
              <Flex w='full' gap='12px' height={'full'} align={'flex-end'}>
                <Text fontSize={{ base: '14px', md: '19px' }} fontWeight={400} textDecoration={'underline'} color='#1565C0'>CHANGE PASSWORD</Text>
              </Flex>
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
            >Save</Button>
          </Flex>
        </Box>
      </Box>
    </LayoutView>
  )
}

export default Auth(Profile)