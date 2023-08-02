// import { Box, Checkbox, Divider, Flex, Text } from '@chakra-ui/react'
// import React, { useState } from 'react'
// import AuthContainer from './sections/authCon'
// import FormInput from '@/components/form/FormInput';
// import Link from 'next/link';
// import { RiArrowLeftFill } from 'react-icons/ri';
// import Button from '@/components/button';
// import { FaGoogle } from 'react-icons/fa';
// import { useRouter } from 'next/router';

// const RegisterCreator = () => {
//   // const [isChecked, setChecked] = useState(true)
//   const router = useRouter()

//   return (
//     <AuthContainer>
//       <Flex px='80px' py='64px' direction={'column'} justify={'space-between'} align={'stretch'}>
//         <Text color='#A2A6AB' fontSize={'18px'} alignSelf={'flex-end'} >
//           Don't have an account?
//           <Text cursor={'pointer'} onClick={() => router.push('/auth')} color='#EF233C' as={'span'}> Sign Up</Text>
//         </Text>
//         <Box w='70%' mx='auto' mt='27px'>
//           <Box w='full' mb='24px'>
//             <Text fontSize={'30px'} fontWeight={700} >Login To Your Account!</Text>
//           </Box>
//           <FormInput
//             h='50px'
//             mb='20px'
//             isRequired
//             label={'Email address'}
//             placeholder={'Enter email address'}
//           />
//           <FormInput
//             h='50px'
//             // mb='20px'
//             isRequired
//             label={'Your Password '}
//             placeholder={'Enter Password '}
//           />
//           <Button borderRadius='full' bg='#2B2D42' w='full' h='55px' mt='55px' color='white'>
//             Login
//           </Button>
//           <Divider my='30px' />
//           <Button borderRadius='full' bg='transparent' w='full' h='55px' color='black' shadow='md'>
//             <Flex justify={'space-between'} align={'center'} w='80%' mx='auto'>
//               <FaGoogle size={20} />
//               <Text>Continue with Google</Text>
//               <Box w='25px' />
//             </Flex>
//           </Button>
//         </Box>

//       </Flex>
//     </AuthContainer >
//   )
// }

// export default RegisterCreator






import { Box, CircularProgress, Divider, Flex, Text, useToast } from '@chakra-ui/react'
import React, { useContext } from 'react'
import AuthContainer from './sections/authCon'
import FormInput from '@/components/form/FormInput';
import Button from '@/components/button';
import { FaGoogle } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { useFormik } from 'formik';
import FormInputPassword from '@/components/form/FormInputPassword';
import * as Yup from 'yup';
import { GlobalContext } from '@/context/Provider';
import { loginUser } from '@/context/actions/auth';
import { loginUserApi } from '@/apis/auth';

const Login = () => {
  const toast = useToast()
  const router = useRouter()
  const { authDispatch } = useContext(GlobalContext)

  const { isLoading, isError, error, mutate } = useMutation(loginUserApi, {
    onSuccess: (res) => {
      localStorage.setItem('userId', res.data?.data?.user?._id)
      loginUser(res.data.data)(authDispatch)
      router.push('/dashboard')
      return toast({
        title: "Login",
        description: `Login successfully`,
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
            label={'Create Password '}
            id='password'
            placeholder={'Enter Password '}
          />
          <Button
            onClick={formik.handleSubmit}
            borderRadius='full' bg='#2B2D42'
            w='full' h='55px' mt='55px' color='white'
          >
            {isLoading ? (
              <CircularProgress isIndeterminate size="24px" color="teal" />
            ) : (
              ' Login'
            )}
          </Button>
          <Divider my='30px' />
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
          </Button>
        </Box>

      </Flex >
    </AuthContainer >
  )
}

export default Login