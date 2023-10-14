import { Box, CircularProgress, Divider, Flex, Text, useToast } from '@chakra-ui/react'
import React, { useContext } from 'react'
import AuthContainer from './sections/authCon'
import FormInput from '@/components/form/FormInput';
import Button from '@/components/button';
import { FaGoogle } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';
import { useFormik } from 'formik';
import FormInputPassword from '@/components/form/FormInputPassword';
import * as Yup from 'yup';
import { GlobalContext } from '@/context/Provider';
import { loginUser } from '@/context/actions/auth';
import { resetPassword } from '@/apis/auth';
import Link from 'next/link';

const Login = () => {
  const toast = useToast()
  const router = useRouter()
  const { authDispatch } = useContext(GlobalContext)

  const resetPasswordMutation = useMutation(
    (data) => resetPassword(data),
    {
      onSuccess: (res) => {
        router.push('/auth/login')
        return toast({
          title: "Link sent",
          description: `Check your email address for the reset password link`,
          status: "success",
          duration: 5000,
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
    }
  )

  const handleResend = () => {
    if (!formik.values.email)
      return toast({
        description: `Enter your email in the input`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    resetPasswordMutation.mutate()
  }


  const formSchema = Yup.object().shape({
    email: Yup.string()
      .email('invalid email')
      .required('Email required'),
  });

  const formik = useFormik({
    validationSchema: formSchema,
    initialValues: {
      email: '',
    },
    onSubmit: values => {
      resetPasswordMutation.mutate(values)
    }
  })

  return (
    <AuthContainer>
      <Flex px={{ base: '10px', md: '80px' }} py={{ base: '8px', md: '64px' }} direction={'column'} justify={'space-between'} align={'stretch'}>
        <Text color='#A2A6AB' fontSize={'18px'} alignSelf={'flex-end'} >
          Don't have an account?
          <Text cursor={'pointer'} onClick={() => router.push('/auth')} color='#EF233C' as={'span'}> Sign Up</Text>
        </Text>
        <Box w={{ base: '90%', md: '70%' }} mx='auto' mt='27px'>
          <Box w='full' textAlign={{ base: 'center', md: 'left' }}>
            <Text fontSize={'30px'} fontWeight={700} >Forgot your account password!</Text>
          </Box>
          <Divider mt='12px' mb='24px' w='full' />
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
          <Link href={'/auth/login'}>
            <Text textAlign={'right'} color='green' mt={{ base: '10px', md: '30px' }}>Remember password?</Text>
          </Link>
          <Button
            onClick={formik.handleSubmit}
            borderRadius='full' bg='#2B2D42'
            w='full' h={{ base: '40px', md: '55px' }} mt={{ base: '10px', md: '45px' }} color='white'
          >
            {resetPasswordMutation.isLoading ? (
              <CircularProgress isIndeterminate size="24px" color="teal" />
            ) : (
              'Reset'
            )}
          </Button>
        </Box>

      </Flex >
    </AuthContainer >
  )
}

export default Login