import { Box, Checkbox, CircularProgress, Divider, Flex, Text, useToast } from '@chakra-ui/react'
import React from 'react';
import AuthContainer from '../sections/authCon'
import FormInput from '@/components/form/FormInput';
import Link from 'next/link';
import Button from '@/components/button';
import { FaGoogle } from 'react-icons/fa';
import { useRouter } from 'next/router';
import axiosInstance from '@/utils/axiosInstance';
import { useMutation } from 'react-query';
import { useFormik } from 'formik';
import FormInputPassword from '@/components/form/FormInputPassword';
import * as Yup from 'yup';
import { ChevronLeftIcon } from '@chakra-ui/icons';

const RegisterCAC = () => {
  const toast = useToast()
  const router = useRouter()

  const { isLoading, isError, error, mutate } = useMutation(registerUser, {
    onSuccess: (res) => {
      console.log('res.data', res.data)
      localStorage.setItem('userId', res.data._id)
      router.push('/auth/consumer/complete')
      return toast({
        title: "Account created",
        description: `Kindly go ahead and complete your registration`,
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
    retry: 2
  })

  async function registerUser(values) {
    const valuesToUse = { ...values, role: "consumer" }
    const res = await axiosInstance.post('/auth/register', valuesToUse)
    return (res)
  }

  const formSchema = Yup.object().shape({
    CAC: Yup.string()
      .min(11, 'CAC number not complete')
      .required('CAC number is required'),
  });

  const formik = useFormik({
    validationSchema: formSchema,
    initialValues: {
      CAC: '',
    },
    onSubmit: values => {
      // mutate(values)
      router.push('/auth/consumer/complete')
    }
  })

  return (
    <AuthContainer>
      <Flex px={{ base: '10px', md: '80px' }} py={{ base: '8px', md: '64px' }} direction={'column'} justify={'space-between'} align={'stretch'}>
        <Flex justify={'space-between'} align={'center'}>
          <Flex color='#A2A6AB' gap='8px' align='center' onClick={() => router.back()} cursor='pointer'>
            <ChevronLeftIcon fontSize={{ base: 25, md: 30 }} />
            <Text fontSize={'18px'} noOfLines={1}>Back</Text>
          </Flex>
          <Box color={'#8692A6'} fontSize={'16px'} fontWeight={600}>
            <Text>STEP 03/03</Text>
            <Text>Business Info.</Text>
          </Box>
        </Flex>
        <Box w={{ base: '90%', md: '70%' }} mx='auto' mt='27px'>
          <Box w='full' textAlign={{ base: 'center', md: 'left' }}>
            <Text fontSize={'30px'} fontWeight={700} >Complete Your Profile!</Text>
            <Text mt='12px' fontSize={'18px'}>
              For the purpose of verification, your CAC details are required.
            </Text>
          </Box>
          <Divider mt='12px' mb='24px' w='full' />
          <FormInput
            h='50px'
            mb='20px'
            isRequired
            value={formik.values.CAC}
            error={formik.errors.CAC}
            onChange={formik.handleChange('CAC')}
            label={'Corporate Affairs Commission number (CAC)'}
            id='CAC'
            placeholder={'ENter number'}
          />
          <Button
            onClick={formik.handleSubmit}
            borderRadius='full' bg='#2B2D42'
            w='full' h='55px' mt='55px' color='white'
          >
            {isLoading ? (
              <CircularProgress isIndeterminate size="24px" color="teal" />
            ) : (
              ' Save & Continue'
            )}
          </Button>
          <Divider my='30px' />
          <Button
            onClick={() => router.push('/auth/consumer/complete')}
            borderRadius='full' bg='transparent'
            w='full' h='55px' color='black' shadow='md'
          >
            <Flex justify={'space-between'} align={'center'} w='80%' mx='auto'>
              <FaGoogle size={20} />
              <Text>Register with CAC</Text>
              <Box w='25px' />
            </Flex>
          </Button>
        </Box>

      </Flex >
    </AuthContainer >
  )
}

export default RegisterCAC