import { Box, Center, CircularProgress, Divider, Flex, Text, useToast, Image } from '@chakra-ui/react'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import AuthContainer from '../sections/authCon'
import FormInput from '@/components/form/FormInput';
import Button from '@/components/button';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { BiCamera, BiLock } from 'react-icons/bi';
import FormSelect from '@/components/form/FromSelect';
import countries from '@/utils/countries.json'
import { completeRegApi } from '@/apis/auth';
import FormInputPhone from '@/components/form/FormInputPhone';
import SelectSearch from 'react-select';
import { useDropzone } from 'react-dropzone';

const CompleteRegistration = () => {
  const toast = useToast()
  const router = useRouter()
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



  const { isLoading, mutate } = useMutation(completeRegApi, {
    onSuccess: (res) => {
      router.push('/auth/creator/registerCAC')
      return toast({
        title: "Changes Saved",
        description: `Kindly go ahead and complete your business registration`,
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
        duration: 5000,
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
      file: null,
      phone: '',
      address: '',
      country: '',
      businessName: '',
      businessAddress: '',
      identificationType: '',
      identificationNumber: '',
    },
    onSubmit: values => {
      const formData = new FormData()
      formData.append('phone', `+234${values.phone}`)
      formData.append('address', values.address)
      formData.append('country', values.country)
      formData.append('businessName', values.businessName)
      formData.append('businessAddress', values.businessAddress)
      formData.append('identificationType', values.identificationType)
      formData.append('identificationNumber', values.identificationNumber)
      formData.append('identificationDocument', values.file)
      formData.append('role', 'creator')
      formData.append('file', values.file)
      return mutate(formData)
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
          <FormInputPhone
            code='+234'
            h='50px'
            mb='20px'
            isRequired
            value={formik.values.phone}
            error={formik.errors.phone}
            onChange={formik.handleChange('phone')}
            label={'Your phone number (without the begining "0")'}
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

          <SelectSearch
            className='height_50'
            isSearchable
            options={countries}
            // mb='20px'
            isRequired
            value={formik.values.country}
            error={formik.errors.country}
            onChange={option => formik.handleChange('country')(option.value)}
            label={'Please select'}
            id='country'
            placeholder={formik.values.country || 'Country of residence'}

          />

          {/* <FormSelect
            options={countries}
            mb='20px'
            h='50px'
            isRequired
            value={formik.values.country}
            error={formik.errors.country}
            onChange={formik.handleChange('country')}
            label={'Please select'}
            id='country'
            placeholder={'Country of residence'}
          /> */}

          <FormInput
            h='50px'
            mb='20px'
            isRequired
            value={formik.values.businessName}
            error={formik.errors.businessName}
            onChange={formik.handleChange('businessName')}
            label={'Your Business Name'}
            id='businessName'
            placeholder={'Enter business name'}
          />
          <FormInput
            h='50px'
            mb='20px'
            isRequired
            value={formik.values.businessAddress}
            error={formik.errors.businessAddress}
            onChange={formik.handleChange('businessAddress')}
            label={'Business Address'}
            id='businessAddress'
            placeholder={'Enter business address'}
          />
          <FormSelect
            options={['NIN', "Driver’s License", "Voter’s Card", 'International Passport']}
            h='50px'
            mb='20px'
            isRequired
            value={formik.values.identificationType}
            error={formik.errors.identificationType}
            onChange={formik.handleChange('identificationType')}
            label={'Please select'}
            id='identificationType'
            placeholder={'Please choose means of verification'}
          />
          <FormInput
            h='50px'
            mb='20px'
            isRequired
            // type='number'
            value={formik.values.identificationNumber}
            error={formik.errors.identificationNumber}
            onChange={formik.handleChange('identificationNumber')}
            label={'Identification number'}
            id='identificationNumber'
            placeholder={'Enter identification number'}
          />
          <Text mb='30px' color='#A2A6AB'>Upload your identification document </Text>
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