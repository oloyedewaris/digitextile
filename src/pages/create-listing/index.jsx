import LayoutView from '@/components/layout'
import { Box, Center, Divider, Flex, GridItem, Image, ListItem, UnorderedList, SimpleGrid, Text, VStack, Input, InputLeftAddon, InputGroup, RadioGroup, HStack, Radio, Textarea, InputRightElement, Button, useToast, useDisclosure, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, ModalHeader, ModalFooter, Select } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react';
import { BiCamera, BiPlayCircle } from 'react-icons/bi';
import searchIcon from '@/assets/images/search-icon.png'
import Auth from '@/hoc/Auth';
import { useFormik } from 'formik';
import { useDropzone } from "react-dropzone";
import { CloseIcon, DeleteIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import FormInput from '@/components/form/FormInput';
import FormTextarea from '@/components/form/FormTextarea';
import { attachImageToProduct, createProductApi } from '@/apis/product';
import { getCategoriesApi } from '@/apis/category';
import { useMutation, useQuery } from 'react-query';
import { useRouter } from 'next/router';

const CreateListing = () => {
  const toast = useToast()
  const router = useRouter()
  const [files, setFiles] = useState([]);
  const [originalfiles, setOriginalFiles] = useState([]);
  const [tagName, setTagName] = useState('');
  const [sectionName, setSectionName] = useState('');
  const sectionModal = useDisclosure();

  const { data } = useQuery(["getCategories"], getCategoriesApi);

  const { isLoading: productCreating, mutate } = useMutation(createProductApi, {
    onSuccess: (res) => {
      mutateImages(res.data?.data?._id)
    },
    onError: (err) => {
      toast({
        title: `Oops...`,
        description: `${err.response?.data?.message || 'Something went wrong, try again'}`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    },
  })


  const { isLoading: uploadingImages, mutate: mutateImages } = useMutation(
    (id) => {
      const formData = new FormData();

      for (let i = 0; i < originalfiles.length; i++) {
        formData.append('files', originalfiles[i])
      }

      return attachImageToProduct(id, formData)
    },
    {
      onSuccess: (res) => {
        toast({
          title: "Listing created",
          description: `Listing successfully created`,
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
        router.push('/store')
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


  const fetchedCategories = data?.data?.data

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      type: "",
      tags: [],
      price: '',
      quantity: '',
      personalization: {},
      variation: [],
      collaborationPartners: [],
      sections: [],
      categories: []
    },
    onSubmit: (values) => {

      const categoriesIds = formik.values.categories.map(category => (fetchedCategories.find(cat => cat.name === category))._id)
      const valuesToUse = {
        ...values,
        categories: categoriesIds,
      }
      mutate(valuesToUse)
    }
  })

  const encodeFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const addFiles = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      if (files.length <= 3) {
        setOriginalFiles((prevValue) => [
          ...prevValue,
          file
        ])
        return encodeFileToBase64(file).then((res) => {
          setFiles((prevValue) => [
            ...prevValue,
            Object.assign({ image: res }, file, {
              preview: URL.createObjectURL(file),
            }),
          ]);
        })
      } else {
        toast({
          title: "Sorry...",
          description: `You can only upload 4 images`,
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
      }
    });
  })

  const removeFile = (index) => {
    const copy = [...files];
    for (let i = 0; i < copy.length; i++) {
      if (i == index) {
        copy.splice(i, 1);
        i = copy.length;
      }
    }
    setFiles(copy);
    const copyOriginal = [...originalfiles];
    for (let i = 0; i < copyOriginal.length; i++) {
      if (i == index) {
        copyOriginal.splice(i, 1);
        i = copyOriginal.length;
      }
    }
    setOriginalFiles(copyOriginal);
  };

  const { getRootProps, getInputProps, isDragActive, acceptedFiles, fileRejections } = useDropzone({
    accept: { "image/*": [], },
    maxSize: 2 * 1024 * 1024,
    multiple: true,
    onDrop: addFiles
  });

  useEffect(() => {
    if (fileRejections.length) {
      toast({
        title: "Hmm...",
        description: `${fileRejections[0].errors[0].code}: file is larger than 2MB`,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    }
  }, [fileRejections, acceptedFiles]);

  const addTags = () => {
    if (formik.values.tags?.length >= 6)
      return toast({
        title: "Hmm...",
        description: `You can only add 6 tags`,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });

    if (!tagName)
      return toast({
        title: "Hmm...",
        description: `Enter a tag name`,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });

    formik.setFieldValue('tags', [...formik.values.tags, tagName])
    setTagName('')
  }

  const removeTag = (index) => {
    const copy = [...formik.values.tags];
    for (let i = 0; i < copy.length; i++) {
      if (i == index) {
        copy.splice(i, 1);
        i = copy.length;
      }
    }
    formik.setFieldValue('tags', copy);
  };


  const addSections = () => {
    if (formik.values.sections.length >= 6)
      return toast({
        title: "Hmm...",
        description: `You can only add 6 tags`,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });

    if (!sectionName)
      return toast({
        title: "Hmm...",
        description: `Enter a section name`,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });

    formik.setFieldValue('sections', [...formik.values.sections, sectionName])
    setSectionName('')
    sectionModal.onClose()
  }

  const removeSection = (index) => {
    const copy = [...formik.values.sections];
    for (let i = 0; i < copy.length; i++) {
      if (i == index) {
        copy.splice(i, 1);
        i = copy.length;
      }
    }
    formik.setFieldValue('sections', copy);
  };

  const removeCategory = (index) => {
    const copy = [...formik.values.categories];
    for (let i = 0; i < copy.length; i++) {
      if (i == index) {
        copy.splice(i, 1);
        i = copy.length;
      }
    }
    formik.setFieldValue('categories', copy);
  };


  return (
    <LayoutView darkFooter>
      <Box px={{ base: '20px', md: '70px' }}>
        <Box
          color='#9F9898'
          mb={{ base: '40px', md: '90px' }}
          p={{ base: '30px', md: '70px' }}
          borderRadius={{ base: '12px', md: '24px' }} bg='white'
        >
          <Text fontSize={{ base: '20px', md: '38px' }} fontWeight={500}>Create a listing</Text>
          <Text fontSize={{ base: '12px', md: '19px' }} fontWeight={400} mt={{ base: '12px', md: '16px' }}>
            Add some photos and details about your listing. Fill out what you can for now. You’ll be able to edit this later
          </Text>
          <Divider w='full' mt={{ base: '12px', md: '23px' }} mb={{ base: '20px', md: '40px' }} />
          <VStack align={'stretch'} spacing={{ base: '25px', md: '35px' }}>
            <SimpleGrid columns={{ base: 1, md: 7 }} gap={{ base: '12px', md: '20px' }} justifyContent={'center'}>
              <GridItem colSpan={{ base: 1, md: 7 }}>
                <VStack spacing={'4px'} align={'stretch'} w='full'>
                  <Text fontSize={{ base: '16px', md: '24px' }} fontWeight={600} color='#4D515E'>Photos *</Text>
                  <Text fontWeight={400} fontSize={{ base: '14px', md: '19px' }}>Add as many as you can so consumers can see more details</Text>
                </VStack>
              </GridItem>
              <GridItem colSpan={{ base: 1, md: 2 }}>
                <Box>
                  <Text fontSize={{ base: '12px', md: '16px' }} fontWeight={400} color='#4D515E'>
                    Tips:
                    <UnorderedList>
                      <ListItem>Use Natural light and no flash</ListItem>
                      <ListItem>Show sample item being held, worn or used</ListItem>
                      <ListItem>Show sample results for services</ListItem>
                      <ListItem>Shoot against a plain or simple background</ListItem>
                      <ListItem>Add photos of different variations</ListItem>
                    </UnorderedList>
                  </Text>
                </Box>
              </GridItem>
              <GridItem colSpan={{ base: 1, md: 5 }}>
                <Flex w='full' gap='25px'>
                  {files.map((file, index) => (
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
                      bgImage={file.image}
                    >
                      <Center bg='rgba(255, 255, 255, 0.8)' w='full' h='35%'>
                        <DeleteIcon
                          onClick={() => removeFile(index)}
                          cursor={'pointer'} color='#2B2D42'
                          fontSize={'22px'}
                        />
                      </Center>
                    </Flex>
                  ))}

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
                      <Text>Add a photo</Text>
                    )}
                  </Center>

                </Flex>
              </GridItem>
            </SimpleGrid>

            {/* <SimpleGrid columns={{ base: 1, md: 7 }} gap={{ base: '12px', md: '20px' }} justifyContent={'center'}>
              <GridItem colSpan={{ base: 1, md: 7 }}>
                <VStack spacing={'4px'} align={'stretch'} w='full'>
                  <Text fontSize={{ base: '16px', md: '24px' }} fontWeight={600} color='#4D515E'>
                    Video <Text as='span' color='#999' fontSize={{ base: '10px', md: '16px' }} fontWeight={400}>  Optional</Text>
                  </Text>
                  <Text fontWeight={400} fontSize={{ base: '14px', md: '19px' }}>
                    Bring your listing to life with a 5-15 secs video. Would not feature sound, so let your video do the talking
                  </Text>
                </VStack>
              </GridItem>
              <GridItem colSpan={{ base: 1, md: 2 }}>
                <Box>
                  <Text fontSize={{ base: '12px', md: '16px' }} fontWeight={400} color='#4D515E'>
                    Tips:
                    <UnorderedList>
                      <ListItem>Film product in use or modelled</ListItem>
                      <ListItem>Show result from previous work</ListItem>
                      <ListItem>Aim for a high resolution</ListItem>
                      <ListItem>Shoot against a plain or simple background</ListItem>
                    </UnorderedList>
                  </Text>
                </Box>
              </GridItem>

              <GridItem colSpan={{ base: 1, md: 5 }}>
                <Flex w='full' gap='32px'>
                  <Center
                    h={{ base: '100px', md: '140px' }}
                    w={{ base: '100px', md: '140px' }}
                    borderRadius={'4px'}
                    border='1px solid #C9C5C5'
                    flexDirection={'column'}
                  >
                    <BiPlayCircle size={35} />
                    <Text>Add a video</Text>
                  </Center>
                </Flex>
              </GridItem>
            </SimpleGrid> */}

            <Divider w='full' my={{ base: '20px', md: '40px' }} />

            <SimpleGrid columns={{ base: 1, md: 7 }} gap={{ base: '25px', md: '40px' }} justifyContent={'center'}>
              <GridItem colSpan={{ base: 1, md: 7 }}>
                <VStack spacing={'4px'} align={'stretch'} w='full'>
                  <Text fontSize={{ base: '16px', md: '24px' }} fontWeight={600} color='#4D515E'>
                    Listing details
                  </Text>
                  <Text fontWeight={400} fontSize={{ base: '14px', md: '19px' }}>
                    Tell the world all about your listing and why they’ll love it
                  </Text>
                </VStack>
              </GridItem>
              <GridItem colSpan={{ base: 1, md: 2 }}>
                <Box>
                  <Text fontSize={{ base: '16px', md: '20px' }} fontWeight={500} color='#4D515E'>
                    Title *
                  </Text>
                  <Text>
                    Include keywords that will help buyers find your listing
                  </Text>
                </Box>
              </GridItem>
              <GridItem colSpan={{ base: 1, md: 5 }}>
                <FormInput
                  error={formik.errors.title}
                  value={formik.values.title}
                  onChange={formik.handleChange('title')}
                  border={'1px solid #999'}
                  w='full'
                  placeholder={'Enter product title'}
                />
              </GridItem>

              <GridItem colSpan={{ base: 1, md: 2 }}>
                <Box>
                  <Text fontSize={{ base: '16px', md: '20px' }} fontWeight={500} color='#4D515E'>
                    Category *
                  </Text>
                  <Text>
                    Type a two- or three-word description of your listing to get category suggestions that will help more buyers find it.
                  </Text>
                </Box>
              </GridItem>
              <GridItem colSpan={{ base: 1, md: 5 }}>
                <InputGroup py='6px'
                  border='1px' borderRadius={'4px'} w='full' pl='15px'>
                  <InputLeftAddon
                    bg={'transparent'}
                    p={"0px"}
                    border={"none"}
                  >
                    <Image alt='next_image' src={searchIcon.src} />
                  </InputLeftAddon>
                  <Select
                    border={'none'}
                    _focus={{ border: 'none' }}
                    onChange={(e) => formik.setFieldValue('categories', [...formik.values.categories, e.target.value])}
                  >
                    {fetchedCategories?.map(cat => (
                      <option name={cat?.name}>{cat?.name}</option>
                    ))}
                  </Select>
                </InputGroup>
                <Flex mt='12px' align='center' gap='15px'>
                  {formik.values.categories.map((cat, index) => (
                    <Center gap='10px' border='1px solid #E4DFDA' w='fit-content' py='8px' px='14px' borderRadius={'8px'}>
                      {cat}
                      <CloseIcon
                        cursor={'pointer'}
                        onClick={() => removeCategory(index)}
                        fontSize={'12px'}
                      />
                    </Center>
                  ))}
                </Flex>
              </GridItem>


              <GridItem colSpan={{ base: 1, md: 2 }}>
                <Box>
                  <Text fontSize={{ base: '16px', md: '20px' }} fontWeight={500} color='#4D515E'>
                    Type *
                  </Text>
                </Box>
              </GridItem>
              <GridItem colSpan={{ base: 1, md: 5 }}>
                <RadioGroup w='full' value={formik.values.type} onChange={formik.handleChange('type')}>
                  <Flex w='full' justify={'space-between'} px={{ base: '10px', md: '30px' }}>
                    <Radio value='product'>
                      <Text fontSize={{ base: '13px', md: '18px' }} fontWeight={500} color='#4D515E'>
                        Product
                      </Text>
                      <Text>A tangible item that you sell.</Text>
                    </Radio>
                    <Radio value='service'>
                      <Text fontSize={{ base: '13px', md: '18px' }} fontWeight={500} color='#4D515E'>
                        Service
                      </Text>
                      <Text>A service you offer.</Text>
                    </Radio>
                  </Flex>
                </RadioGroup>
              </GridItem>

              <GridItem colSpan={{ base: 1, md: 2 }}>
                <Box>
                  <Text fontSize={{ base: '16px', md: '20px' }} fontWeight={500} color='#4D515E'>
                    About this listing *
                  </Text>
                  <Text>
                    Give details about this product.
                  </Text>
                  <Text mt='4px'>
                    Tip:
                    Start with a brief overview that describes your item’s finest features.
                    Buyers will only see the first few lines of your description at first, so make it count!
                  </Text>
                </Box>
              </GridItem>
              <GridItem colSpan={{ base: 1, md: 5 }}>
                <FormTextarea
                  error={formik.errors.description}
                  value={formik.values.description}
                  onChange={formik.handleChange('description')}
                  h='full'
                  w='full'
                />
              </GridItem>

              <GridItem colSpan={{ base: 1, md: 2 }}>
                <Box>
                  <Text fontSize={{ base: '16px', md: '20px' }} fontWeight={500} color='#4D515E'>
                    Section<Text as='span' color='#999' fontSize={{ base: '10px', md: '16px' }} fontWeight={400}>  Optional</Text>
                  </Text>
                </Box>
              </GridItem>
              <GridItem colSpan={{ base: 1, md: 5 }}>
                <Flex mb='8px' align='center' gap='25px'>
                  {formik.values.sections.map((tag, index) => (
                    <Center gap='10px' border='1px solid #E4DFDA' w='fit-content' py='16px' px='50px' >
                      {tag}
                      <CloseIcon
                        cursor={'pointer'}
                        onClick={() => removeSection(index)}
                        fontSize={'12px'}
                      />
                    </Center>
                  ))}
                </Flex>

                <Text fontSize={{ base: '14px', md: '20px' }} fontWeight={400} color='#4D515E'>
                  Group related listings into Sections to help buyers browse (e.g., Bracelets, Shoes).
                </Text>
                <Text
                  cursor='pointer' mt='12px'
                  onClick={sectionModal.onOpen}
                  fontSize={'16px'} fontWeight={400}
                  color='#4D515E' textDecoration={'underline'}
                >Add section</Text>
              </GridItem>


              <GridItem colSpan={{ base: 1, md: 2 }}>
                <Box>
                  <Text fontSize={{ base: '16px', md: '20px' }} fontWeight={500} color='#4D515E'>
                    Tags<Text as='span' color='#999' fontSize={{ base: '10px', md: '16px' }} fontWeight={400}>  Optional</Text>
                  </Text>
                  <Text>
                    Give details about this product.
                  </Text>
                  <Text mt='4px'>
                    What words might someone use to search for your listing? Use all 10 tags to get found.
                  </Text>
                </Box>
              </GridItem>
              <GridItem colSpan={{ base: 1, md: 5 }}>
                <Flex align='center' gap='20px'>
                  <InputGroup py='6px' border='1px' borderRadius={'4px'} w='90%'>
                    <Input
                      value={tagName}
                      onChange={(e) => setTagName(e.target.value)}
                      _focus={{ border: 'none', outline: 'none' }}
                      border={'none'}
                      placeholder="Shape, colour, style..."
                    />
                    <InputRightElement
                      h='full'
                      w='50px'
                      px={"14px"}
                      borderLeft={"1px solid #999"}
                    >
                      <Text
                        onClick={addTags}
                        cursor={'pointer'}
                        color={'#2B2D42'}
                        fontSize={'16px'}
                        fontWeight={600}
                      >Add</Text>
                    </InputRightElement>
                  </InputGroup>
                  <Text fontSize={{ base: '12px', md: '20px' }} display={'inline'} fontWeight={400}>{6 - formik.values.tags.length} left</Text>
                </Flex>
                <Flex mt='12px' align='center' gap='15px'>
                  {formik.values.tags.map((tag, index) => (
                    <Center gap='10px' bg='#E4DFDA' w='fit-content' py='6px' px='12px' borderRadius={'full'}>
                      {tag}
                      <CloseIcon
                        cursor={'pointer'}
                        onClick={() => removeTag(index)}
                        fontSize={'12px'}
                      />
                    </Center>
                  ))}
                </Flex>
              </GridItem>
            </SimpleGrid>

            <Divider w='full' my={{ base: '20px', md: '40px' }} />

            <SimpleGrid columns={{ base: 1, md: 7 }} gap={{ base: '10px', md: '40px' }} justifyContent={'center'}>
              <GridItem colSpan={{ base: 1, md: 7 }}>
                <VStack spacing={'4px'} align={'stretch'} w='full'>
                  <Text fontSize={{ base: '16px', md: '24px' }} fontWeight={600} color='#4D515E'>
                    Inventory and pricing
                  </Text>
                </VStack>
              </GridItem>
              <GridItem colSpan={{ base: 1, md: 2 }}>
                <Box>
                  <Text fontSize={{ base: '16px', md: '20px' }} fontWeight={500} color='#4D515E'>
                    Price *
                  </Text>
                  <Text>
                    Remember to factor in the costs of materials, labor, and other business expenses.
                  </Text>
                </Box>
              </GridItem>
              <GridItem colSpan={{ base: 1, md: 5 }}>
                <InputGroup py='6px'
                  border='1px' borderRadius={'4px'} w='full' pl='15px'>
                  <InputLeftAddon
                    bg={'transparent'}
                    p={"0px"}
                    border={"none"}
                  >
                    N
                  </InputLeftAddon>
                  <Input
                    type={'number'}
                    min='0'
                    value={formik.values.price}
                    onChange={formik.handleChange('price')}
                    _focus={{ border: 'none', outline: 'none' }}
                    border={formik.errors.price ? '1px solid red' : 'none'}
                  // w='full'
                  />
                </InputGroup>
              </GridItem>
              <GridItem colSpan={{ base: 1, md: 2 }}>
                <Box>
                  <Text fontSize={{ base: '16px', md: '20px' }} fontWeight={500} color='#4D515E'>
                    Quantity *
                  </Text>
                  <Text>
                    For quantities greater than ten, this listing will renew automatically until it sells out.
                    You’ll be charged a NGN 500  listing fee each time.
                  </Text>
                </Box>
              </GridItem>
              <GridItem colSpan={{ base: 1, md: 5 }}>
                <FormInput
                  type={'number'}
                  min='0'
                  value={formik.values.quantity}
                  error={formik.errors.quantity}
                  onChange={formik.handleChange('quantity')}
                  border='1px solid #999'
                  borderRadius={'4px'} w='full'
                  py='6px'
                />
              </GridItem>
            </SimpleGrid>
          </VStack>
          <Divider mt={{ base: '20px', md: '40px' }} w='full' />
          <Flex mt={{ base: '20px', md: '40px' }} direction={{ base: 'column', md: 'row' }} justify={'space-between'} align={'center'} gap={{ base: '10px', md: '120px' }}>
            <Flex align='center' gap='32px'>
              {/* <Button bg='transparent' border=' 1px solid #999' px='24px' py='16px' borderRadius={'4px'}>Cancel</Button> */}
              <Text color='#4D515E' fontSize={{ base: '15px', md: '20px' }} fontWeight={400}>
                This listing isn't active yet. It will be available to shoppers once you
                <Text as='span' fontWeight={600}> publish</Text> it. <Text as='span' fontWeight={600}>Reset</Text> to start again.
              </Text>
            </Flex>
            <Flex align='center' gap='32px'>
              <Button
                onClick={formik.resetForm}
                bg='transparent' border=' 1px solid #999'
                px='24px' py='16px' borderRadius={'4px'}
              >Reset</Button>
              <Button
                disabled={productCreating || uploadingImages}
                isLoading={productCreating || uploadingImages}
                onClick={formik.handleSubmit}
                bg='#2B2D42' px='24px'
                py='16px' borderRadius={'4px'}
                color='white'
              >Publish</Button>
            </Flex>
          </Flex>
        </Box>
      </Box>

      <Modal isCentered isOpen={sectionModal.isOpen} onClose={sectionModal.onClose}>
        <ModalOverlay />
        <ModalContent px='20px' py='18px'>
          <ModalHeader>Add your first section</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize={'20px'} fontWeight={500} color='#4D515E'>Section title</Text>
            <Text>You can add future products to this section or create new</Text>
            <FormInput
              value={sectionName}
              onChange={(e) => setSectionName(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Flex justify={'flex-end'} align='center' gap='22px'>
              <Button
                onClick={sectionModal.onClose}
                bg='transparent' border=' 1px solid #999'
                px='24px' py='16px' borderRadius={'4px'}
              >Cancel</Button>
              <Button
                onClick={addSections}
                bg='#2B2D42' px='24px'
                py='16px' borderRadius={'4px'}
                color='white'
              >Save</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </LayoutView>
  )
}

export default Auth(CreateListing)