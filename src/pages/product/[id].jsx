import React, { useContext, useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery';
import { Box, Center, Flex, HStack, Image, Input, InputGroup, InputLeftAddon, Skeleton, Spinner, Text, Textarea, VStack, useToast } from '@chakra-ui/react';
import LayoutView from '@/components/layout';
import { ChevronRightIcon } from '@chakra-ui/icons';
import Button from '@/components/button';
import { addFavourite, checkFavourite, deleteFavourite, deleteProductApi, getProductApi, increaseProductViewsApi } from '@/apis/product';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';
import Auth from '@/hoc/Auth';
import { GlobalContext } from '@/context/Provider';
import { RiHeart2Line, RiHeartFill, RiStarFill, RiStarLine } from 'react-icons/ri';
import { checkConversation, createConversation, sendMessage } from '@/apis/messaging';
import avatar from '@/assets/images/avatar.png';
import { priceString } from '@/utils/formatAmount';
import { BiSend } from 'react-icons/bi';
import { createReviewApi, getProductReview } from '@/apis/reviews';
import ReactTimeAgo from 'react-time-ago';

const Product = () => {
  const router = useRouter()
  const toast = useToast()
  const productId = router.query.id
  const { authState } = useContext(GlobalContext);
  const user = authState.user;
  const [text, setText] = useState('');
  const [msgReady, setMsgReady] = useState(false);
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(0)

  const { data } = useQuery(["getProductApi", productId], () => getProductApi(productId));
  const product = data?.data?.data;
  const { data: increaseProductViewsData } = useQuery(["increaseProductViewsApi", productId], () => increaseProductViewsApi(productId));
  const views = increaseProductViewsData?.data?.data;

  const { data: reviewsData, refetch: refetchReview } = useQuery(["getProductReview", productId], () => getProductReview(productId));
  const reviews = reviewsData?.data?.data;

  const sellerId = product?.seller?._id
  const { data: conversationData, isLoading: isChecking } = useQuery(["checkConversation", sellerId], () => sellerId && checkConversation(sellerId));

  const { data: favData, refetch } = useQuery(["checkFavourite", productId], () => checkFavourite(productId));
  const status = favData?.data?.data;


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
    createConversation,
    {
      onSuccess: async res => {
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

          description: `${err.response?.data?.message || 'Something went wrong, try again'}`,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      }
    }
  );

  const createReview = useMutation(
    () => createReviewApi({
      "content": comment,
      "rating": rating,
      "product": product?._id
    }), {
    onSuccess: async () => {
      setRating(0)
      setComment('')
      toast({
        title: "Review submited",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
      await refetchReview();
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

  const sendMessageMutation = useMutation(
    (data) => {
      if (!conversationData?.data?.data?._id)
        return toast({

          description: `Message cannot be sent, go to creator's DM instead`,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      return sendMessage(conversationData?.data?.data?._id, data)
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

          description: `${err.response?.data?.message || 'Something went wrong, try again'}`,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      }
    }
  );

  const handleSendMessage = () => {
    if (text && !isChecking) {
      if (!conversationData?.data?.data) {
        startNewUserConversationMutation.mutate({
          recipientId: sellerId,
          content: text,
          produdct: product?._id
        })
      } else {
        sendMessageMutation.mutate({ content: text, product: productId })
      }
    }
  }

  const handleRating = () => {
    if (!rating)
      return toast({
        title: "Please choose a rating",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    createReview.mutate()
  }


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

  const review = () => (
    <Box>
      <Box border={'1px solid #969696'} borderRadius={'16px'} p='16px' mt='16px'>
        <Input
          value={comment}
          onChange={e => setComment(e.target.value)}
          _focus={{ borderTop: 'none', borderRight: 'none', borderLeft: 'none', borderBottom: '1px solid #B0ABAB' }}
          w='full'
          placeholder='Add a comment'
          color='#B0ABAB'
          borderRadius={0}
          border={'none'}
          borderBottom={'1px solid #B0ABAB'}
        />

        <HStack justify={'space-between'} spacing={'3px'} align={'center'} gap='2px' mt='20px'>
          <HStack align={'center'} gap='-2px'>
            {rating >= 1 ?
              <RiStarFill onClick={() => setRating(1)} style={{ cursor: 'pointer' }} color='#000' size={23} /> :
              <RiStarLine onClick={() => setRating(1)} style={{ cursor: 'pointer' }} color='#969696' size={23} />
            }
            {rating >= 2 ?
              <RiStarFill onClick={() => setRating(2)} style={{ cursor: 'pointer' }} color='#000' size={23} /> :
              <RiStarLine onClick={() => setRating(2)} style={{ cursor: 'pointer' }} color='#969696' size={23} />
            }
            {rating >= 3 ?
              <RiStarFill onClick={() => setRating(3)} style={{ cursor: 'pointer' }} color='#000' size={23} /> :
              <RiStarLine onClick={() => setRating(3)} style={{ cursor: 'pointer' }} color='#969696' size={23} />
            }
            {rating >= 4 ?
              <RiStarFill onClick={() => setRating(4)} style={{ cursor: 'pointer' }} color='#000' size={23} /> :
              <RiStarLine onClick={() => setRating(4)} style={{ cursor: 'pointer' }} color='#969696' size={23} />
            }
            {rating >= 5 ?
              <RiStarFill onClick={() => setRating(5)} style={{ cursor: 'pointer' }} color='#000' size={23} /> :
              <RiStarLine onClick={() => setRating(5)} style={{ cursor: 'pointer' }} color='#969696' size={23} />
            }
          </HStack>
          <Button
            isLoading={createReview.isLoading}
            onClick={handleRating}
            px='40px' py='0' bg='#2B2D42' color='white'
          >Post</Button>
        </HStack>
      </Box>

      <HStack justify={'space-between'} spacing={'3px'} align={'center'} my='20px'>
        <Text fontWeight={500} fontSize={'14px'} color='#1C1D2C'>{reviews?.length} Comments</Text>
        <Text fontWeight={500} fontSize={'14px'} color='#1C1D2C'>Optional</Text>
      </HStack>

      <VStack>
        {reviews?.map(review => (
          <Box w='full' mb='20px'>
            <HStack justify={'flex-start'} spacing={'8px'} align={'center'}>
              <Image w='30px' h='30px' borderRadius={'full'} src={avatar.src} />
              <Text fontWeight={500} fontSize={'16px'} color='#1C1D2C'>{review.user?.fullname}</Text>
              <Text fontWeight={500} fontSize={'14px'} color='#A0A0A6'>@{review.user?.fullname}</Text>
              <ReactTimeAgo style={{ color: '#A0A0A6', fontSize: '12px', fontWeight: 500 }} date={review?.createdAt} locale="en-US" timeStyle="round-minute" />
            </HStack>
            <Text fontWeight={500} color='#1C1D2C' mt='10px' pl='40px'>
              {review.content}
            </Text>
          </Box>
        ))}
      </VStack>
    </Box>
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
                <Box display={{ base: 'none', md: 'block' }}>
                  {review()}
                </Box>
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
                <Text mt={{ base: '12px', md: '24px' }} fontSize={{ base: '20px', md: '24px' }} color='#1C1D2C'>
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
                      borderRadius='full' bg='#2B2D42'
                      w='full' h='55px' color='white'
                    >Message Creator</Button>

                    {msgReady && (
                      <form onSubmit={handleSendMessage}>
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
                            {(sendMessageMutation.isLoading || startNewUserConversationMutation.isLoading) ? (
                              <Spinner />
                            ) : (
                              <BiSend
                                cursor={'pointer'}
                                onClick={handleSendMessage}
                                color='#2B2D42' size='20'
                              />
                            )}
                          </InputLeftAddon>
                        </InputGroup>
                      </form>
                    )}
                  </Box>
                )}

                {/* <Text
                  textAlign={'center'}
                  color='#2B2D42' mt='12px'
                  cursor='pointer'
                  onClick={() => router.push(`/messages/${product?.seller?._id}`)}
                  fontSize={'14px'}
                >Chat creator instead</Text> */}

                <Box display={{ base: 'block', md: 'none' }}>
                  {review()}
                </Box>
              </Box>
            </Flex>
          </Box>
        </Skeleton>
      </Box>
    </LayoutView>
  )
}

export default Auth(Product)