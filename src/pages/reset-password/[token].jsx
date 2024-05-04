import { Box, CircularProgress, Divider, Flex, Text, useToast } from '@chakra-ui/react'
import React from 'react'
import Button from '@/components/button';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { useFormik } from 'formik';
import FormInputPassword from '@/components/form/FormInputPassword';
import * as Yup from 'yup';
import { updatePassword } from '@/apis/auth';
import Link from 'next/link';
import AuthContainer from '../auth/sections/authCon';

const Login = () => {
  const toast = useToast()
  const router = useRouter()

  const resetPasswordMutation = useMutation(
    (data) => updatePassword(data),
    {
      onSuccess: (res) => {
        router.push('/auth/login')
        return toast({
          title: "Password Changed",
          description: `You can now login with your new password`,
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


  const formSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, 'password should be at leats 8 characters')
      .required('password required'),
  });

  const formik = useFormik({
    validationSchema: formSchema,
    initialValues: {
      password: '',
    },
    onSubmit: values => {
      const token = router.query.token
      if (!token)
        return toast({
          description: `Token not available`,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      resetPasswordMutation.mutate({ token, password: values.password })
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
            <Text fontSize={'30px'} fontWeight={700} >Change account password!</Text>
          </Box>
          <Divider mt='12px' mb='24px' w='full' />
          <FormInputPassword
            h='50px'
            mb='20px'
            isRequired
            value={formik.values.password}
            error={formik.errors.password}
            onChange={formik.handleChange('password')}
            type={'password'}
            label={'Password'}
            id='password'
            placeholder={'Enter new password'}
          />
          <Button
            onClick={formik.handleSubmit}
            borderRadius='full' bg='#2B2D42'
            w='full' h={{ base: '40px', md: '55px' }} mt={{ base: '10px', md: '45px' }} color='white'
          >
            {resetPasswordMutation.isLoading ? (
              <CircularProgress isIndeterminate size="24px" color="teal" />
            ) : (
              'Change'
            )}
          </Button>
        </Box>

      </Flex >
    </AuthContainer>
  )
}

export default Login