import { Box, CircularProgress, Divider, Flex, Text, useToast } from '@chakra-ui/react'
import React, { useContext } from 'react'
import AuthContainer from '../sections/authCon'
import FormInput from '@/components/form/FormInput';
import Button from '@/components/button';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { BiLock } from 'react-icons/bi';
import FormSelect from '@/components/form/FromSelect';
import countries from '@/utils/countries.json'
import { completeRegApi } from '@/apis/auth';

const CompleteRegistration = () => {
  const toast = useToast()
  const router = useRouter()

  const { isLoading, mutate } = useMutation((values) => completeRegApi({ ...values, role: "creator", cacNumber: 123 }), {
    onSuccess: (res) => {
      router.push('/auth/login')
      return toast({
        title: "Account created",
        description: `You are almost there!!, check your email address to complete the process`,
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
    phone: Yup.string()
      .min(10, 'phone too short')
      .required('Phone number is required'),
    address: Yup.string()
      .min(5, 'Address too short!')
      .required('Address is required'),
    country: Yup.string()
      .required('State is required')
  });

  const formik = useFormik({
    validationSchema: formSchema,
    initialValues: {
      phone: '',
      address: '',
      country: '',
    },
    onSubmit: values => {
      router.push({
        pathname: '/auth/creator/registerCAC',
        query: values
      })
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
            <Text>STEP 02/03</Text>
            <Text>Residency Info.</Text>
          </Box>
        </Flex>
        <Box w={{ base: '90%', md: '70%' }} mx='auto' mt='27px'>
          <Box w='full' textAlign={{ base: 'center', md: 'left' }}>
            <Text fontSize={'30px'} fontWeight={700} >Almost there!</Text>
            <Text mt='12px' fontSize={'18px'}>
              For the purpose of serving you better, your details are required.
            </Text>
          </Box>
          <Divider mt='12px' mb='24px' w='full' />
          <FormInput
            h='50px'
            mb='20px'
            isRequired
            value={formik.values.phone}
            error={formik.errors.phone}
            onChange={formik.handleChange('phone')}
            label={'Your phone number'}
            id='phone'
            placeholder={'Phone number'}
          />
          <FormInput
            h='50px'
            mb='20px'
            isRequired
            value={formik.values.address}
            error={formik.errors.address}
            onChange={formik.handleChange('address')}
            type={'address'}
            label={'Address'}
            id='address'
            placeholder={'Your address'}
          />
          <FormSelect
            options={countries}
            h='50px'
            // mb='20px'
            isRequired
            value={formik.values.country}
            error={formik.errors.country}
            onChange={formik.handleChange('country')}
            label={'Please select'}
            id='country'
            placeholder={'Country of residence'}
          />
          <Button
            onClick={formik.handleSubmit}
            borderRadius='full' bg='#2B2D42'
            w='full' h='55px' mt='55px' color='white'
          >
            {isLoading ? (
              <CircularProgress isIndeterminate size="24px" color="teal" />
            ) : (
              'Save & Continue'
            )}
          </Button>
          <Flex color='#A2A6AB' mt='43px' gap='8px' align='center' w='full' justify={'center'}>
            <BiLock size={20} />
            <Text fontSize={'14px'}>Your Info is safely secured</Text>
          </Flex>
        </Box>

      </Flex >
    </AuthContainer >
  )
}

export default CompleteRegistration