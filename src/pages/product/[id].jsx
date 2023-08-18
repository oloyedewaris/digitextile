import React, { useContext } from 'react'
import ImageGallery from 'react-image-gallery';
import { Box, Center, Flex, HStack, Image, Skeleton, Text, useToast } from '@chakra-ui/react';
import LayoutView from '@/components/layout';
import { ChevronRightIcon } from '@chakra-ui/icons';
import person1 from '@/assets/images/person/person1.png'
import person2 from '@/assets/images/person/person2.png'
import Button from '@/components/button';
import { BiHeart } from 'react-icons/bi';
import { deleteProductApi, getProductApi } from '@/apis/product';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';
import Auth from '@/hoc/Auth';
import Link from 'next/link';
import edit from '@/assets/svgs/edit-listing.svg'
import { GlobalContext } from '@/context/Provider';

const Product = () => {
  const router = useRouter()
  const toast = useToast()
  const productId = router.query.id
  const { authState } = useContext(GlobalContext);
  const user = authState.user
  const { data, isError, error, isLoading, refetch, } = useQuery(["getProductApi", productId], () => getProductApi(productId));

  const { isLoading: deleting, mutate } = useMutation((formData) => deleteProductApi(productId, formData), {
    onSuccess: (res) => {
      toast({
        title: `Deleted`,
        description: `Product deleted`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      router.push('/dashboard')
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

  const product = data?.data?.data;

  console.log('product', product)

  const imagesToUse = product?.images?.map(image => ({
    original: image,
    thumbnail: image,
  }));

  const renderGallery = () => (
    <>
      {imagesToUse?.length ? (
        <>
          <Box display={{ base: 'none', md: 'block' }}>
            <ImageGallery
              renderItem={(image) => (
                <Image
                  borderRadius={{ base: 'md', md: 'xl' }}
                  bgPosition={'center'}
                  bgSize={"cover"}
                  w='full'
                  maxW='490px'
                  h={{ base: 'auto', md: "490px" }}
                  src={image.original}
                />
              )}
              renderThumbInner={(image) => (
                <Image
                  borderRadius={{ base: 'sm', md: 'md' }}
                  bgPosition={'center'}
                  bgSize={"cover"}
                  h={{ base: '40px', md: "80px" }}
                  w={{ base: '40px', md: "80px" }}
                  src={image.thumbnail}
                />
              )}
              showIndex={false}
              thumbnailPosition='left'
              showNav={false}
              showPlayButton={false}
              showFullscreenButton={false}
              showBullets={true}
              items={imagesToUse}
            />
          </Box>
          <Box display={{ base: 'block', md: 'none' }}>
            <ImageGallery
              renderItem={(image) => (
                <Image
                  borderRadius={{ base: 'md', md: 'xl' }}
                  bgPosition={'center'}
                  bgSize={"cover"}
                  w='full'
                  // maxW='200px'
                  h="350px"
                  src={image.original}
                />
              )}
              renderThumbInner={(image) => (
                <Image
                  borderRadius={{ base: 'sm', md: 'md' }}
                  bgPosition={'center'}
                  bgSize={"cover"}
                  h={{ base: '40px', md: "80px" }}
                  w={{ base: '40px', md: "80px" }}
                  src={image.thumbnail}
                />
              )}
              showIndex={false}
              showNav={false}
              showPlayButton={false}
              showFullscreenButton={false}
              showBullets={true}
              items={imagesToUse}
            />
          </Box>
        </>
      ) : (
        <Text textAlign={'center'} h='full' verticalAlign={'center'} fontWeight={500}>No product images</Text>
      )}
    </>
  )


  return (
    <LayoutView>
      <Box px={{ base: '20px', md: '70px' }}>
        <Skeleton isLoaded={product}>
          <Box mb={{ base: '40px', md: '90px' }} p={{ base: '30px', md: '70px' }} borderRadius={{ base: '12px', md: '24px' }} bg='white'>
            <Flex align={'center'} fontSize={{ base: '12px', md: '15px' }} mb={{ base: '14px', md: '28px' }} gap={{ base: '4px', md: '10px' }} color='rgba(28, 29, 44, 0.48)'>
              <Text>Home</Text>
              <ChevronRightIcon fontSize={{ base: 20, md: 25 }} />
              <Text>{product?.sections[0]}</Text>
              <ChevronRightIcon fontSize={{ base: 20, md: 25 }} />
              <Text color='#1C1D2C'>Diva Fabrics</Text>
            </Flex>
            <Flex direction={{ base: 'column', md: 'row' }} gap='35px'>
              <Box w={{ base: 'full', md: '60%' }}>
                {renderGallery()}
              </Box>
              <Box w={{ base: 'full', md: '40%' }}>
                <Flex gap='5px' align='center'>
                  <HStack p='8px' position='relative'>
                    {/* {persons.map((person, i) => (
                      <Box key={i} position='relative' left={`-${i * 15}px`}>
                        <Image src={person} />
                      </Box>
                    ))} */}
                  </HStack>
                  <Text fontSize={{ base: '15px', md: '20px' }}>
                    {product?.tags.map((tag, i) => (
                      <Text key={i} as='span' color='#EF233C'>@{tag}, </Text>
                    ))}
                  </Text>
                </Flex>
                <Text fontSize={{ base: '20px', md: '28px' }} fontWeight={600} mt={{ base: '15px', md: '20px' }}>{product?.title}</Text>
                <Text fontSize={{ base: '18px', md: '24px' }} fontWeight={500} mt={{ base: '13px', md: '8px' }}>{product?.price} NGN</Text>
                <Text my={{ base: '12px', md: '24px' }}>
                  {product?.description}
                </Text>
                <Button
                  borderRadius='full' bg='#2B2D42'
                  w='full' h='55px' mt='55px' color='white'
                >Message Creator</Button>
                <Flex color='#A2A6AB' mt='43px' gap='8px' align='center' w='full' justify={'center'}>
                  <BiHeart size={20} />
                  <Text fontSize={'14px'}>Add to Wishlist</Text>
                </Flex>
                {user?._id === product?.seller?._id && (
                  <Link href={`/edit-listing/${productId}`}>
                    <Center gap='10px' border={'0.812px solid #2B2D42'} mt={{ base: '20px', md: '35px' }} px='11px' py='12px' borderRadius={'full'}>
                      <Text fontWeight={500}>Edit product</Text>
                      <Image src={edit.src} />
                    </Center>
                  </Link>
                )}
                {user?._id === product?.seller?._id && (
                  <Button
                    isLoading={deleting}
                    onClick={mutate}
                    borderRadius='full' bg='#EF233C'
                    w='full' h='55px' mt={{ base: '17px', md: '35px' }} color='white'
                  >Delete Product</Button>
                )}
              </Box>
            </Flex>
          </Box>
        </Skeleton>
      </Box>
    </LayoutView>
  )
}

export default Auth(Product)