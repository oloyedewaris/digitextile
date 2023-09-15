import { Box, Center, Checkbox, CircularProgress, Divider, Flex, Image, Text, useToast } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react';
import AuthContainer from '../sections/authCon'
import FormInput from '@/components/form/FormInput';
import Button from '@/components/button';
import { FaGoogle } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { registerCac } from '@/apis/auth';
import { BiCamera } from 'react-icons/bi';
import { useDropzone } from 'react-dropzone';

const RegisterCAC = () => {
  const toast = useToast()
  const router = useRouter()
  const valuesGotten = router.query
  const [copyFile, setCopyFile] = useState(null)

  const addFile = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    formik.setFieldValue('file', file)
    return encodeFileToBase64(file)
      .then((res) => setCopyFile(Object.assign({ image: res }, file, { preview: URL.createObjectURL(file), })))
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
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  }, [fileRejections, acceptedFiles]);


  const { isLoading, mutate } = useMutation(registerCac,
    {
      onSuccess: (res) => {
        router.push('/auth/login')
        return toast({
          title: "Saved created",
          description: `You are almost there!!, check your email address to complete the process`,
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
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      },
    })


  const formSchema = Yup.object().shape({
    cacNumber: Yup.string()
      .min(3, 'CAC Number number not complete')
      .required('CAC Number number is required'),
  });

  const formik = useFormik({
    validationSchema: formSchema,
    initialValues: {
      cacNumber: '',
      file: null
    },
    onSubmit: values => {
      const formData = new FormData()
      formData.append('file', values.file)
      formData.append('cacNumber', Number(values.cacNumber))
      formData.append('name', values.name)
      formData.append('address', values.address)
      mutate(formData)
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
              For the purpose of verification, your cacNumber details are required.
            </Text>
          </Box>
          <Divider mt='12px' mb='24px' w='full' />

          <FormInput
            h='50px'
            mb='20px'
            type={'number'}
            isRequired
            value={formik.values.cacNumber}
            error={formik.errors.cacNumber}
            onChange={formik.handleChange('cacNumber')}
            label={'Corporate Affairs Commission number (CAC)'}
            id='cacNumber'
            placeholder={'Enter number'}
          />
          <Text mb='30px' color='#A2A6AB'>Upload your Corporate Affairs Commission number (CAC) certificate </Text>
          <Center
            mx='auto'
            m={{ base: '15px', md: '35px' }}
            w={{ base: '60px', md: '96px' }}
            h={{ base: '60px', md: '96px' }}
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
                    <Text>Upload file</Text>
                  )}
                </Center>
              </Flex>
            )}
          </Center>
          {copyFile && <Image
            mt='50px'
            // bgPosition={'center'}
            // bgSize={'contain'}
            h={{ base: '250px', md: '390px' }}
            w={{ base: '250px', md: '390px' }}
            borderRadius={'4px'}
            src={copyFile?.image}
          />}

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
            onClick={() => router.push('/auth/login')}
            borderRadius='full' bg='transparent'
            w='full' h='55px' color='black' shadow='md'
          >
            <Flex justify={'space-between'} align={'center'} w='80%' mx='auto'>
              <Text>Skip for later</Text>
            </Flex>
          </Button>
        </Box>

      </Flex >
    </AuthContainer >
  )
}

export default RegisterCAC