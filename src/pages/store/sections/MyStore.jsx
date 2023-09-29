import { Box, Center, CircularProgress, Divider, Flex, HStack, Image, Input, InputGroup, InputLeftAddon, SimpleGrid, Skeleton, Spinner, Text, VStack, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useCallback, useContext, useEffect } from 'react';
import Button from '@/components/button';
import { BiPlus } from 'react-icons/bi';
import FormSelect from '@/components/form/FromSelect';
import searchIcon from '@/assets/images/search-icon.png'
import MyListingCard from '@/components/card/MyListingCard';
import Link from 'next/link';
import { useMutation, useQuery } from 'react-query';
import { getUserProductApi } from '@/apis/user';
import EmptyState from '@/components/empty-state';
import { GlobalContext } from '@/context/Provider';
import { FilterCategory, FilterDate, FilterSection } from '@/components/elements';
import coverImg from '@/assets/images/store-bg.png';
import avatar from '@/assets/images/avatar.png';
import verified from '@/assets/svgs/verified.svg'
import { formatAmount } from '@/utils/formatAmount';
import infoBtn from '@/assets/svgs/info-button.svg';
import { RiStarSFill } from 'react-icons/ri';
import { fetchStore, fetchStoreProducts, updateStoreImages } from '@/apis/store';
import CreateModal from './CreateStoreModal';
import { useDropzone } from 'react-dropzone';

const MyStore = () => {
  const { authState: { user } } = useContext(GlobalContext)
  const storeQuery = useQuery(['fetchStore'], fetchStore)
  const createModal = useDisclosure()
  const toast = useToast()

  const storeArr = storeQuery?.data?.data?.data;
  const currStore = storeArr?.length && storeArr[0];

  const { data, isLoading } = useQuery(["fetchStoreProducts"], () => currStore && fetchStoreProducts(currStore._id));

  const storeImagesMutation = useMutation(
    (formData) => updateStoreImages(currStore?._id, formData),
    {
      onSuccess: (res) => {
        return toast({
          title: "Image updated",
          description: `You have successfully updated your store profile`,
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

  const addProfileFile = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const formData = new FormData()
      formData.append('image', file)
      storeImagesMutation.mutate(formData)
    });
  })

  const addCoverFile = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const formData = new FormData()
      formData.append('coverImage', file)
      storeImagesMutation.mutate(formData)
    });
  })


  const profileImage = useDropzone({
    accept: { "image/*": [], },
    maxSize: 2 * 1024 * 1024,
    multiple: false,
    onDrop: addProfileFile
  });

  const coverImage = useDropzone({
    accept: { "image/*": [], },
    maxSize: 2 * 1024 * 1024,
    multiple: false,
    onDrop: addCoverFile
  });


  useEffect(() => {
    if (profileImage?.fileRejections.length) {
      toast({
        title: "Hmm...",
        description: `${profileImage?.fileRejections[0].errors[0].code}: file is larger than 2MB`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  }, [profileImage?.fileRejections, profileImage?.acceptedFiles]);

  useEffect(() => {
    if (coverImage?.fileRejections.length) {
      toast({
        title: "Hmm...",
        description: `${coverImage?.fileRejections[0].errors[0].code}: file is larger than 2MB`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  }, [coverImage?.fileRejections, coverImage?.acceptedFiles]);



  return (
    <Box>
      <Flex py={{ base: '9px', md: '27px' }} px={{ base: '10px', md: '40px' }} justify={'space-between'} align={'center'}>
        <Text fontSize={{ base: '20px', md: '32px' }} fontWeight={700}>My Store</Text>
        <Text color='#1C1D2C' fontSize={{ base: '12px', md: '16px' }} fontWeight={500}>Welcome,  {user?.fullname}</Text>
      </Flex>
      <Divider w='full' />

      {storeQuery.isLoading ? (
        <Center w='full' h='40vh'>
          <Spinner />
        </Center>
      ) : (!storeArr?.length) ? (
        <Center w='full' h='40vh' gap='20px' flexDirection={'column'}>
          <Text fontWeight={500} fontSize={'20px'}>You have no store yet</Text>
          <Button onClick={createModal.onOpen}>Create a store</Button>
        </Center>
      ) : (
        <Box px={{ base: '20px', md: '40px' }} pt={{ base: '5px', md: '10px' }}>
          <Center
            w='full' h='200px'
            borderTopRightRadius={'8px'}
            borderTopLeftRadius={'8px'}
            bg={'rgba(28, 29, 44, 0.80)'}
            bgImage={currStore?.coverImage}
            bgSize={'cover'}
            bgPosition={'center'}
            {...coverImage?.getRootProps({ className: "dropzone" })}
          >
            <input {...coverImage?.getInputProps()} />
            {coverImage?.isDragActive ? (
              <Text>Drop the files here</Text>
            ) : (
              <>
                {storeImagesMutation.isLoading && (
                  <CircularProgress isIndeterminate size="44px" />
                )}
              </>
            )}
          </Center>
          <Center
            mb={{ base: '20px', md: '40px' }}
            mx='auto' mt='-60px' w='120px'
            h='120px' bg={'rgba(28, 29, 44, 0.80)'}
            bgImage={currStore?.image}
            bgSize={'contain'}
            bgPosition={'center'}
            borderRadius={'full'} border='1px solid #fff'
            flexDirection={'column'}
            {...profileImage?.getRootProps({ className: "dropzone" })}
          >

            <input {...profileImage?.getInputProps()} />
            {profileImage?.isDragActive ? (
              <Text>Drop the files here</Text>
            ) : (
              <>
                {storeImagesMutation.isLoading ? (
                  <CircularProgress isIndeterminate size="44px" />
                ) : (
                  <>
                    <BiPlus size={20} color='#fff' />
                    <Text color='#fff' fontSize={'14px'} fontWeight={500}>Insert logo</Text>
                  </>
                )}
              </>
            )}
          </Center>

          <Flex align={'center'} w='full' justify={'space-between'} mb={{ base: '20px', md: '40px' }}>
            <Flex w='40%' align={'center'} h='95px' gap='15px'>
              <Image src={avatar.src} borderRadius={'8px'} w='90px' h='90px' />
              <Flex direction='column' h='full' justify='space-between'>
                <Box>
                  <Text mb='4px' fontWeight={500} fontSize={'18px'} color='#212922'>
                    {currStore?.name}
                  </Text>
                  <Text fontWeight={400} fontSize={'13px'} color='#212922' noOfLines={2}>
                    {user?.bio}
                  </Text>
                </Box>
                <HStack spacing={'3px'} align={'center'} gap='2px' divider={<Divider orientation='vertical' h='5px' />}>
                  <Flex align={'center'}>
                    <Image src={verified.src} />
                    <Text fontWeight={400} fontSize={'13px'} color='#212922'>Verified Seller</Text>
                  </Flex>
                  <HStack align={'center'} gap='-2px' onClick={reviewModal.onOpen}>
                    <RiStarSFill />
                    <RiStarSFill />
                    <RiStarSFill />
                  </HStack>
                </HStack>
              </Flex>
            </Flex>

            <Flex w='40%' direction='column' h='full' justify='center'>
              <Text fontWeight={500} fontSize={'18px'} color='#212922'>
                You are a Verified Seller!
              </Text>
              <Text fontWeight={400} fontSize={'13px'} color='#212922' noOfLines={2}>
                User are now able to transact with you more conveniently. Watch out for Verified Customers
              </Text>
              <HStack spacing={'3px'} align={'center'}>
                <Image src={infoBtn.src} />
                <Text fontWeight={400} fontSize={'10px'} color='#1565C0'>Safety tips</Text>
              </HStack>
            </Flex>
          </Flex>
          <InputGroup border='1px' borderRadius={'full'} w='full' pr='15px'>
            <Input
              _focus={{ border: 'none', outline: 'none' }}
              border={'none'}
              placeholder="Search your listings"
            // w='full'
            />
            <InputLeftAddon
              bg={'transparent'}
              p={"0px"}
              border={"none"}
            >
              <Image alt='next_image' src={searchIcon.src} />
            </InputLeftAddon>
          </InputGroup>

          <Flex my={{ base: '20px', md: '40px' }} gap={{ base: '10px' }} align={{ base: 'flex-start', md: 'center' }} direction={{ base: 'column', md: 'row' }} justify={'space-between'}>
            <Flex gap={{ base: '6px', md: '16px' }}>
              <FilterCategory />
              <FilterSection />
              <FilterDate />
            </Flex>
            <Link href='/create-listing'>
              <Button
                leftIcon={<BiPlus />}
                borderRadius='full' bg='#2B2D42'
                color='white'
              >
                Add Listing
              </Button>
            </Link>
          </Flex>

          <Skeleton isLoaded={!isLoading}>
            <SimpleGrid columns={{ base: '2', md: '3' }} columnGap={{ base: '10px', md: '10px' }} rowGap={{ base: '15px', md: '30px' }}>
              {data?.data?.data?.map((product, i) => (
                <MyListingCard
                  id={product._id}
                  key={i}
                  images={product.images}
                  title={product.title}
                  subTitle={product.description}
                  price={`N${formatAmount(product.price)}`}
                  persons={product.persons || []}
                />
              ))}
            </SimpleGrid>
            {!data?.data?.data?.length && (
              <EmptyState text={'No user listing yet'} />
            )}
          </Skeleton>
        </Box>
      )}

      <CreateModal modal={createModal} />
    </Box>
  )
}

export default MyStore