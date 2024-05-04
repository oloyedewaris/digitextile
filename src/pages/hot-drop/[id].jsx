import LayoutView from '@/components/layout';
import { Box, Button, Divider, Flex, HStack, Image, Input, InputGroup, InputLeftAddon, SimpleGrid, Skeleton, Text, Textarea, VStack, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { extended } from '@/constant/hot-drop';
import searchIcon from '@/assets/images/search-icon.png';
import hotDrop from '@/assets/images/hot-drop-main.png';
import HotDropDetail from '@/components/card/HotDropsCardDetails';
import person from '@/assets/images/person/person3.png'
import hotDropImg from '@/assets/images/hot-drop-details.png';
import person1 from '@/assets/images/person/person3.png'
import FormTextarea from '@/components/form/FormTextarea';
import EmptyState from '@/components/empty-state';
import { addComment, fetchForums, getForum } from '@/apis/forum';
import { useMutation, useQuery } from 'react-query';
import { useRouter } from 'next/router';
import avatar from '@/assets/images/avatar.png'
import Auth from '@/hoc/Auth';
import FormSelect from '@/components/form/FromSelect';
import Link from 'next/link';
import { BiPlus } from 'react-icons/bi';

const HotDrop = () => {
  const toast = useToast()
  const router = useRouter()
  const forumId = router.query.id
  const { data, isError, error, isLoading, refetch, } = useQuery(["getForum", forumId], () => getForum(forumId));
  const { data: forumsData } = useQuery(["fetchForums"], fetchForums);
  const forums = forumsData?.data?.data || []

  const [text, setText] = useState('')

  const forumData = data?.data?.data


  const { isLoading: isCommenting, mutate } = useMutation((data) => {
    return addComment(forumId, data)
  }, {
    onSuccess: (res) => {
      refetch()
      toast({
        title: "Comment added",
        description: `You have successfully added a comment to this topic`,
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    },
    onError: (err) => {
      toast({

        description: `${err.response?.data?.message || 'Something went wrong, try again'}`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    },
  })

  const addNewComment = () => {
    mutate({ content: text })
    setText('')
  }

  return (
    <LayoutView noPadding>
      <Box pb={{ base: '20px', md: '80px' }} px={{ base: '20px', md: '80px' }}>
        <Box
          bg='white' borderRadius={{ base: '12px', md: '24px' }}
          p={{ base: '15px', md: '60px' }}
        >
          <Box w='full' bgPosition={'top'} bgSize={'cover'} bgImage={forumData?.image} h={{ base: '125px', md: '245px' }} borderRadius={{ base: '12px', md: '20px' }} />

          <HStack mt={{ base: '15px', md: '30px' }} alignItems={'center'} w={"100%"} spacing={{ base: '6px', md: '14px' }} divider={<Box w='4px' h='4px' borderRadius={'full'} bg='#1565C0' />}>
            <Text fontSize={{ base: '13px', md: '18px' }} color={'#1565C0'} noOfLines={1}>{forumData?.category}</Text>
            <Text fontSize={{ base: '13px', md: '18px' }} color={'#1565C0'} noOfLines={1}>{forumData?.readTime} min read</Text>
          </HStack>
          <Text mt={{ base: '15px', md: '30px' }} fontSize={{ base: '16px', md: '36px' }} fontWeight='700' noOfLines={1}>{forumData?.title}</Text>

          <HStack mt={{ base: '15px', md: '30px' }} alignItems={'center'} w={"100%"} spacing={{ base: '6px', md: '14px' }} divider={<Box w='4px' h='4px' borderRadius={'full'} bg='#4D515E' />}>
            <Flex justify={'center'} align={'center'} gap='14px'>
              <Image w={{ base: '20px', md: '40px' }} borderRadius='full' src={forumData?.person || avatar.src} />
              <Text fontSize={{ base: '10px', md: '14px' }} color={'#4D515E'} noOfLines={1}>{forumData?.creator?.fullname}</Text>
            </Flex>
            <Text fontSize={{ base: '10px', md: '14px' }} color={'#4D515E'} noOfLines={1}>{forumData?.createdAt && new Date(forumData?.createdAt).toDateString()}</Text>
          </HStack>

          <Text mt={{ base: '15px', md: '30px' }} fontSize={{ base: '12px', md: '22px' }} color='#C4C4C4'>{forumData?.content}</Text>


          <Text my={{ base: '18px', md: '34px' }} fontWeight={'700'} color='#1C1D2C' fontSize={{ base: '20px', md: '40px' }}>Comments</Text>
          <VStack align='stretch' spacing={'10px'} divider={<Divider />}>
            {forumData?.comments?.map(comment => (
              <Box>
                <Flex justify={'flex-start'} align={'center'} gap='14px'>
                  <Image h='70px' w='70px' borderRadius='full' src={comment?.picture || avatar.src} />
                  <Text fontWeight={600} fontSize={{ base: '10px', md: '30px' }} color={'#242425'} noOfLines={1}>{comment?.user?.fullname}</Text>
                </Flex>
                <Text textAlign={'right'} maxW={'70%'} ml={'auto'} mt='-20px' fontSize={{ base: '18px', md: '22px' }} color='#C4C4C4'>{comment?.content}</Text>
              </Box>
            ))}
            {!forumData?.comments?.length && (
              <EmptyState height={'70px'} text={'No comments yet'} />
            )}
          </VStack>
          <Textarea
            mt={{ base: '12px', md: '20px' }}
            fontSize={{ base: '12px', md: '18px' }}
            h={{ base: '100px', md: '200px' }} w='full'
            placeholder='Add a comment...' p={{ base: '15px', md: '40px' }}
            onChange={e => setText(e.target?.value)}
            value={text}
          />
          <Button mr='auto' mt={{ base: '12px', md: '15px' }} disabled={isCommenting} isLoading={isCommenting} onClick={addNewComment}>Comment</Button>


          <Flex
            mt={{ base: '20px', md: '120px' }}
            gap={{ base: '10px' }}
            align={{ base: 'flex-start', md: 'center' }}
            direction={{ base: 'column', md: 'row' }}
            // justify={'space-between'}
            justify={'flex-end'}
          >
            {/* <Flex gap={{ base: '6px', md: '16px' }}>
              <FormSelect
                w='170px'
                borderRadius='full'
                placeholder={'Topic Category'}
                options={[]}
              />
              <FormSelect
                borderRadius='full'
                placeholder={'Date'}
                options={[]}
              />
            </Flex> */}
            <Link href='/create-hot-drop'>
              <Button
                leftIcon={<BiPlus />}
                borderRadius='full' bg='#2B2D42'
                color='white'
              >
                Create Hot Drop
              </Button>
            </Link>
          </Flex>

          <Skeleton isLoaded={!isLoading}>
            <SimpleGrid my={{ base: '20px', md: '40px' }} columns={{ base: '2', md: '3' }} columnGap={{ base: '10px', md: '26px' }} rowGap={{ base: '15px', md: '56px' }}>
              {forums?.map && forums?.map((card, i) => (
                <HotDropDetail
                  user={card?.creator?.fullname}
                  subTitle={card?.content}
                  onClickCard={() => router.push(`/hot-drop/${card?._id}`)}
                  time={card?.createdAt && new Date(card?.createdAt).toDateString()}
                  timeToRead={card?.readTime}
                  category={card?.category}
                  id={i} key={i}
                  image={card?.image}
                  title={card?.title}
                // person={card?.person}
                />
              ))}
            </SimpleGrid>
            {!forums?.length && (
              <EmptyState text={'No forum article yet'} />
            )}
          </Skeleton>
        </Box>
      </Box>
    </LayoutView>
  )
}

export default Auth(HotDrop)