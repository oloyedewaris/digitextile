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
import { loginUserApi, resendVerification } from '@/apis/auth';
import Link from 'next/link';

const Login = () => {
  const toast = useToast()
  const router = useRouter()
  const { authDispatch } = useContext(GlobalContext)

  const { isLoading, isError, error, mutate } = useMutation(loginUserApi, {
    onSuccess: (res) => {
      localStorage.setItem('userId', res.data?.data?.user?._id)
      loginUser(res.data.data)(authDispatch)
      const userRole = res.data.data?.user?.role;
      if (userRole === 'admin')
        router.push('/admin')
      else if (userRole === 'creator')
        router.push('/store')
      else
        router.push('/dashboard')
      return toast({
        title: "Login",
        description: `Login successfully`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    },
    onError: (err) => {
      toast({

        description: `${err.response?.data?.message || 'Something went wrong, try again'}`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    },
  })

  const sendMailMutation = useMutation(
    () => resendVerification(formik.values.email),
    {
      onSuccess: (res) => {
        return toast({
          title: "Link sent",
          description: `Check your email address for the verification link`,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      },
      onError: (err) => {
        toast({

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
    sendMailMutation.mutate()
  }


  const formSchema = Yup.object().shape({
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
      email: '',
      password: '',
    },
    onSubmit: values => {
      mutate(values)
      // router.push('/auth/creator/complete')
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
            <Text fontSize={'30px'} fontWeight={700} >Login To Your Account!</Text>
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
          <FormInputPassword
            h='50px'
            // mb='20px'
            isRequired
            value={formik.values.password}
            error={formik.errors.password}
            onChange={formik.handleChange('password')}
            label={'Enter Password '}
            id='password'
            placeholder={'Enter Password '}
          />
          <Link href={'/auth/forgot-password'}>
            <Text textAlign={'right'} color='green' mt={{ base: '10px', md: '30px' }}>Forgot password?</Text>
          </Link>
          <Button
            onClick={formik.handleSubmit}
            borderRadius='full' bg='#2B2D42'
            w='full' h={{ base: '40px', md: '55px' }} mt={{ base: '10px', md: '45px' }} color='white'
          >
            {isLoading ? (
              <CircularProgress isIndeterminate size="24px" color="teal" />
            ) : (
              ' Login'
            )}
          </Button>
          <Text textAlign={'center'} my={{ base: '10px', md: '30px' }}>Didn't get verification link?
            {sendMailMutation.isLoading ? (
              <CircularProgress isIndeterminate size="24px" color="teal" />
            ) : (
              <span onClick={handleResend} style={{ color: 'green', cursor: 'pointer' }}> Send again</span>
            )}
          </Text>
          {/* <Divider my='30px' />
          <Button
            onClick={() => router.push('/auth/creator/complete')}
            borderRadius='full' bg='transparent'
            w='full' h='55px' color='black' shadow='md'
          >
            <Flex justify={'space-between'} align={'center'} w='80%' mx='auto'>
              <FaGoogle size={20} />
              <Text> Login</Text>
              <Box w='25px' />
            </Flex>
          </Button> */}
        </Box>

      </Flex >
    </AuthContainer >
  )
}

export default Login