import React, { useContext, useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery';
import { Box, Center, Flex, HStack, Image, Input, InputGroup, InputLeftAddon, Skeleton, Text, Textarea, useToast } from '@chakra-ui/react';
import LayoutView from '@/components/layout';
import { ChevronRightIcon } from '@chakra-ui/icons';
import Button from '@/components/button';
import { addFavourite, checkFavourite, deleteFavourite, deleteProductApi, getProductApi } from '@/apis/product';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';
import Auth from '@/hoc/Auth';
import { GlobalContext } from '@/context/Provider';
import { RiHeart2Line, RiHeartFill } from 'react-icons/ri';
import { checkConversation, createConversation, sendMessage } from '@/apis/messaging';
import avatar from '@/assets/images/avatar.png';
import { priceString } from '@/utils/formatAmount';
import { BiSend } from 'react-icons/bi';

const Product = () => {
  const router = useRouter()
  const toast = useToast()
  const productId = router.query.id
  const { authState } = useContext(GlobalContext);
  const user = authState.user;
  const [conversation, setConversation] = useState(null);
  const [text, setText] = useState('');
  const [msgReady, setMsgReady] = useState(false);

  const { data } = useQuery(["getProductApi", productId], () => getProductApi(productId));
  const product = data?.data?.data;

  const { data: favData, refetch } = useQuery(["checkFavourite", productId], () => checkFavourite(productId));
  const status = favData?.data?.data;


  const { isLoading: deleting, mutate } = useMutation((formData) => deleteProductApi(productId, formData), {
    onSuccess: (res) => {
      toast({
        title: `Deleted`,
        description: `Listing deleted`,
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


  const addFavouriteMutation = useMutation(() => addFavourite(productId), {
    onSuccess: async () => {
      toast({
        title: "Listing added to favourite",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
      await refetch()
    },
    onError: () => {
      toast({
        title: "An error occurred",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    }
  })

  const deleteFavouriteMutation = useMutation(() => deleteFavourite(productId), {
    onSuccess: async () => {
      toast({
        title: "Listing removed from favourite",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
      await refetch()
    },
    onError: () => {
      toast({
        title: "An error occurred",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    }
  })

  const startNewUserConversationMutation = useMutation(
    () => createConversation({ recipientId: sellerId }),
    {
      onSuccess: res => {
        setConversation(res?.data?.data?.data)
      },
    }
  );

  const sendMessageMutation = useMutation(
    (data) => {
      if (!conversation?._id)
        return toast({
          title: `"Oops...`,
          description: `Message cannot be sent, go to creator's DM instead`,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      return sendMessage(conversation?._id, data)
    },
    {
      onSuccess: res => {
        setText('')
        setMsgReady(false)
        toast({
          title: `Sent`,
          description: `Message delivered to seller`,
          status: "success",
          duration: 6000,
          isClosable: true,
          position: "top-right",
        });
      },
      onError: err => {
        toast({
          title: `"Oops...`,
          description: `${err.response?.data?.message || 'Something went wrong, try again'}`,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      }
    }
  );


  const sellerId = product?.seller?._id
  const { data: checkData, isLoading: isChecking } = useQuery(["checkConversation", sellerId], () => sellerId && checkConversation(sellerId));


  useEffect(() => {
    if (sellerId && !isChecking) {
      if (!checkData?.data?.data) {
        startNewUserConversationMutation.mutate()
      } else {
        setConversation(checkData?.data?.data)
      }
    }
  }, [checkData?.data, sellerId, isChecking])




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
              <Text>{product?.seller?.fullname}</Text>
              <ChevronRightIcon fontSize={{ base: 20, md: 25 }} />
              <Text color='#1C1D2C'>{product?.title}</Text>
            </Flex>
            <Flex direction={{ base: 'column', md: 'row' }} gap='35px'>
              <Box w={{ base: 'full', md: '60%' }}>
                {renderGallery()}
              </Box>
              <Box w={{ base: 'full', md: '40%' }}>
                <Flex gap='5px' align='center' cursor={'pointer'} onClick={() => router.push(`/store/${product?.seller?._id}`)}>
                  <HStack p='8px' position='relative'>
                    {/* {persons.map((person, i) => ( */}
                    <Box position='relative'>
                      <Image w='50px' h='50px' borderRadius='full' src={product?.seller?.image || avatar.src} />
                    </Box>
                    {/* ))} */}
                  </HStack>
                  {/* <Text fontSize={{ base: '15px', md: '20px' }}>
                    {product?.tags.map((tag, i) => (
                      <Text key={i} as='span' color='#EF233C'>@{tag} </Text>
                    ))}
                  </Text> */}

                  <Text fontSize={{ base: '15px', md: '20px' }} as='span' color='#EF233C'>@{product?.seller?.fullname} </Text>
                </Flex>
                <Text fontSize={{ base: '20px', md: '28px' }} fontWeight={600} mt={{ base: '15px', md: '20px' }}>{product?.title}</Text>
                <Text fontSize={{ base: '18px', md: '24px' }} fontWeight={500} mt={{ base: '13px', md: '8px' }}>{priceString(product?.price)} NGN</Text>
                <Text fontSize={{ base: '16px', md: '20px' }} fontWeight={400} mt={{ base: '15px', md: '12px' }}>{`${product?.quantity} unit(s)`}</Text>
                <Text mt={{ base: '12px', md: '24px' }}>
                  {product?.description}
                </Text>
                <Flex color='#A2A6AB' mt='43px' gap='8px' align='center' w='full' justify={'center'}>
                  {status ? (
                    <Flex
                      cursor={'pointer'}
                      disabled={deleteFavouriteMutation.isLoading}
                      align='center' gap='7px'
                      onClick={deleteFavouriteMutation.mutate}
                    >
                      <RiHeartFill
                        color='#D90429'
                        size={20}
                      />
                      <Text fontSize={'14px'}>Remove from favourite</Text>
                    </Flex>
                  ) : (
                    <Flex
                      cursor={'pointer'}
                      disabled={addFavouriteMutation.isLoading}
                      align='center' gap='7px'
                      onClick={addFavouriteMutation.mutate}
                    >
                      <RiHeart2Line
                        size={20}
                      />
                      <Text fontSize={'14px'}>Add to favourite</Text>
                    </Flex>
                  )}
                </Flex>

                {product?.seller?._id !== user?._id && (
                  <Box>
                    <Button
                      mt='20px'
                      onClick={() => setMsgReady(!msgReady)}
                      // isLoading={sendMessageMutation.isLoading}
                      // disabled={sendMessageMutation.isLoading}
                      borderRadius='full' bg='#2B2D42'
                      w='full' h='55px' color='white'
                    >Message Creator</Button>

                    {msgReady && (
                      <form onSubmit={() => text && sendMessageMutation.mutate({ content: text, product: productId })}>
                        <InputGroup my='14px' py='10px' pr='15px' h='140px' borderRadius={'16px'} border='1px solid #B0ABAB' w='100%' mx='auto'>
                          <Textarea
                            _focus={{ border: 'none', outline: 'none' }}
                            // border={'none'}
                            // my='25px' w='full' p='16px'
                            h='100px'
                            resize={'none'}
                            // border={'1px solid #2B2D42'}
                            value={text}
                            onChange={e => setText(e.target.value)}
                            autoFocus
                            borderRadius={'full'}
                            border={'none'}
                            placeholder='Type your messages...'
                          />
                          <InputLeftAddon
                            bg={'transparent'}
                            p={"0px"}
                            border={"none"}
                            pt='95px'
                          >
                            <BiSend
                              cursor={'pointer'}
                              onClick={() => text && sendMessageMutation.mutate({ content: text, product: productId })}
                              color='#2B2D42' size='20'
                            />
                          </InputLeftAddon>
                        </InputGroup>
                      </form>
                    )}
                  </Box>
                )}

                <Text
                  textAlign={'center'}
                  color='#2B2D42' mt='12px'
                  cursor='pointer'
                  onClick={() => router.push(`/messages/${product?.seller?._id}`)}
                  fontSize={'14px'}
                >Chat creator instead</Text>
                {/* {user?._id === product?.seller?._id && (
                  <Link href={`/edit-listing/${productId}`}>
                    <Center gap='10px' border={'0.812px solid #2B2D42'} mt={{ base: '20px', md: '35px' }} px='11px' py='12px' borderRadius={'full'}>
                      <Text fontWeight={500}>Edit product</Text>
                      <Image src={edit.src} />
                    </Center>
                  </Link>
                )} */}
                {/* {user?._id === product?.seller?._id && (
                  <Button
                    isLoading={deleting}
                    onClick={mutate}
                    borderRadius='full' bg='#EF233C'
                    w='full' h='55px' mt={{ base: '17px', md: '35px' }} color='white'
                  >Delete Product</Button>
                )} */}
              </Box>
            </Flex>
          </Box>
        </Skeleton>
      </Box>
    </LayoutView>
  )
}

export default Auth(Product)