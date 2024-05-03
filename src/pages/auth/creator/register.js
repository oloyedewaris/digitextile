import { Box, Checkbox, CircularProgress, Divider, Flex, Text, useToast } from '@chakra-ui/react'
import React from 'react';
import AuthContainer from '../sections/authCon'
import FormInput from '@/components/form/FormInput';
import Link from 'next/link';
import Button from '@/components/button';
import { FaGoogle } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { useFormik } from 'formik';
import FormInputPassword from '@/components/form/FormInputPassword';
import * as Yup from 'yup';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { registerUserApi } from '@/apis/auth';

const RegisterCreator = () => {
  const toast = useToast()
  const router = useRouter()

  const { isLoading, isError, error, mutate } = useMutation((values) => registerUserApi({ ...values, role: "creator" }), {
    onSuccess: (res) => {
      localStorage.setItem('userId', res.data?.data?._id)
      router.push('/auth/creator/complete')
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
  })

  const formSchema = Yup.object().shape({
    fullname: Yup.string()
      .min(3, 'name too short')
      .required('Full name is required'),
    email: Yup.string()
      .email('invalid email')
      .required('Email required'),
    password: Yup.string()
      .min(8, 'password must be at least 8 characters!')
      .required('Password required')
  });

  const formik = useFormik({
    validationSchema: formSchema,
    initialValues: {
      fullname: '',
      email: '',
      password: '',
      terms: false,
      role: "creator",
    },
    onSubmit: values => {
      if (!formik.values.terms)
        return toast({
          title: `"Oops...`,
          description: `Please agree to the terms and conditions`,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      mutate(values)
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
            <Text>STEP 01/03</Text>
            <Text>Profile Info</Text>
          </Box>
        </Flex>
        <Box w={{ base: '90%', md: '70%' }} mx='auto' mt='27px'>
          <Box w='full' textAlign={{ base: 'center', md: 'left' }}>
            <Text fontSize={'30px'} fontWeight={700} >Register Creator Account!</Text>
            <Text mt='12px' fontSize={'18px'}>
              Fashion and textile has never been this close. You can sign up as a creator anytime.
            </Text>
          </Box>
          <Divider mt='12px' mb='24px' w='full' />
          <FormInput
            h='50px'
            mb='20px'
            isRequired
            value={formik.values.fullname}
            error={formik.errors.fullname}
            onChange={formik.handleChange('fullname')}
            label={'Your fullname'}
            id='fullname'
            placeholder={'Enter your fullname'}
          />
          <FormInput
            h='50px'
            mb='20px'
            isRequired
            value={formik.values.email}
            error={formik.errors.email}
            onChange={formik.handleChange('email')}
            type={'email'}
            label={'Email address'}
            id='email'
            placeholder={'Enter email address'}
          />
          <FormInputPassword
            h='50px'
            // mb='20px'
            isRequired
            value={formik.values.password}
            error={formik.errors.password}
            onChange={formik.handleChange('password')}
            label={'Create Password '}
            id='password'
            placeholder={'Enter Password '}
          />
          <Checkbox mt='23px' isChecked={formik.values.terms} onChange={formik.handleChange('terms')}>
            <Text
              fontSize={'18px'}
              fontWeight={500}
              display={"inline"}
              color='#A2A6AB'
            >
              I agree to
              <Link href={"/"}>
                <Text color={"#2B2D42"} display={"inline"}> terms & conditions</Text>
              </Link>
            </Text>
          </Checkbox>
          <Button
            onClick={formik.handleSubmit}
            borderRadius='full' bg='#2B2D42'
            w='full' h='55px' mt='55px' color='white'
          >
            {isLoading ? (
              <CircularProgress isIndeterminate size="24px" color="teal" />
            ) : (
              ' Register Account'
            )}
          </Button>
          <Divider my='30px' />
          {/* <Button
            // onClick={() => router.push('/auth/creator/complete')}
            borderRadius='full' bg='transparent'
            w='full' h='55px' color='black' shadow='md'
          >
            <Flex justify={'space-between'} align={'center'} w='80%' mx='auto'>
              <FaGoogle size={20} />
              <Text> Register Account</Text>
              <Box w='25px' />
            </Flex>
          </Button> */}
        </Box>

      </Flex >
    </AuthContainer >
  )
}

export default RegisterCreator