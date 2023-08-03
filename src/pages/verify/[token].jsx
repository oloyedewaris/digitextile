import { Center, CircularProgress, Text, useToast } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import AuthContainer from '../auth/sections/authCon'
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { verifyEmail } from '@/apis/auth';

const Verify = () => {
  const toast = useToast();
  const router = useRouter();
  const token = router.query?.token

  const { isLoading, isError, error, mutate } = useMutation(() => verifyEmail(token), {
    onSuccess: (res) => {
      router.push('/auth/login')
      return toast({
        title: "Verification complete",
        description: 'Account successfully verified, now login to access dashboard',
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

  useEffect(() => {
    if (token) {
      mutate()
    }
  }, [token])



  return (
    <Center>
      <Center w='full' h='60vh' gap='20px' flexDirection={'column'}>
        <CircularProgress _loading={isLoading} isIndeterminate size={'50px'} />
        <Text>Please wait why we are verifying your account</Text>
      </Center>
      {error && <Text color='red'>An error occurred{JSON.stringify(error)}</Text>}
    </Center>
  )
}

export default Verify