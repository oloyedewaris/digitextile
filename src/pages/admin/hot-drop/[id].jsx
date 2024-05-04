import LayoutView from '@/components/layout';
import { Box, Button, Flex, HStack, Image, Text, Textarea, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { getForum } from '@/apis/forum';
import { useMutation, useQuery } from 'react-query';
import { useRouter } from 'next/router';
import avatar from '@/assets/images/avatar.png'
import Auth from '@/hoc/Auth';
import { updateForumApprovalStatus } from '@/apis/admin';

const HotDropAdmin = () => {
  const toast = useToast()
  const router = useRouter()
  const forumId = router.query.id
  const { data, isError, error, isLoading, refetch, } = useQuery(["getForum", forumId], () => getForum(forumId));

  const [text, setText] = useState('')

  const forumData = data?.data?.data


  const approveForum = useMutation((data) => {
    return updateForumApprovalStatus(data, forumId)
  }, {
    onSuccess: (res) => {
      toast({
        title: "Hotdrop approved, users can now view your article",
        description: `You have successfully approved this forum`,
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

  const rejectForum = useMutation((data) => {
    return updateForumApprovalStatus(data, forumId)
  }, {
    onSuccess: (res) => {
      router.push('/admin')
      toast({
        title: "Hotdrop rejected",
        description: `You have successfully rejected this forum`,
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

  const onApproveForum = () => {
    approveForum.mutate({
      approvalStatus: "approved",
      approvalMessage: text
    })
    setText('')
  }
  const onRejectForum = () => {
    rejectForum.mutate({
      approvalStatus: "rejected",
      approvalMessage: text
    })
    setText('')
  }

  return (
    <LayoutView noPadding>
      <Box pb={{ base: '20px', md: '80px' }} px={{ base: '20px', md: '80px' }}>
        <Box
          bg='white' borderRadius={{ base: '12px', md: '24px' }}
          p={{ base: '15px', md: '60px' }}
        >
          <Image objectFit={'cover'} objectPosition={'top'} w='full' src={forumData?.image} h={{ base: '125px', md: '345px' }} borderRadius={{ base: '12px', md: '20px' }} />

          <HStack mt='30px' alignItems={'center'} w={"100%"} spacing={{ base: '6px', md: '14px' }} divider={<Box w='4px' h='4px' borderRadius={'full'} bg='#1565C0' />}>
            <Text fontSize={{ base: '13px', md: '18px' }} color={'#1565C0'} noOfLines={1}>{forumData?.category}</Text>
            <Text fontSize={{ base: '13px', md: '18px' }} color={'#1565C0'} noOfLines={1}>{forumData?.readTime} min read</Text>
          </HStack>
          <Text mt='30px' fontSize={{ base: '16px', md: '36px' }} fontWeight='700' noOfLines={1}>{forumData?.title}</Text>

          <HStack mt='30px' alignItems={'center'} w={"100%"} spacing={{ base: '6px', md: '14px' }} divider={<Box w='4px' h='4px' borderRadius={'full'} bg='#4D515E' />}>
            <Flex justify={'center'} align={'center'} gap='14px'>
              <Image h={{ base: '20px', md: '40px' }} borderRadius='full' src={forumData?.person || avatar.src} />
              <Text fontSize={{ base: '10px', md: '14px' }} color={'#4D515E'} noOfLines={1}>{forumData?.creator?.fullname}</Text>
            </Flex>
            <Text fontSize={{ base: '10px', md: '14px' }} color={'#4D515E'} noOfLines={1}>{forumData?.createdAt && new Date(forumData?.createdAt).toDateString()}</Text>
          </HStack>

          <Text mt='30px' fontSize={{ base: '18px', md: '22px' }} color='#C4C4C4'>{forumData?.content}</Text>

          <Textarea
            mt='20px'
            fontSize={'18px'}
            w='full'
            placeholder='Attach approval or rejection message...'
            onChange={e => setText(e.target?.value)}
            value={text}
          />

          <Flex mt='20px' align={'center'} justify={'flex-end'} gap='20px'>
            <Button
              bg='#009900'
              color='#fff'
              disabled={approveForum.isLoading}
              isLoading={approveForum.isLoading}
              onClick={onApproveForum}
            >Approve HotDrop</Button>
            <Button
              bg='#EF233C'
              color='#fff'
              disabled={rejectForum.isLoading}
              isLoading={rejectForum.isLoading}
              onClick={onRejectForum}
            >Reject HotDrop</Button>
          </Flex>
        </Box>
      </Box>
    </LayoutView>
  )
}

export default Auth(HotDropAdmin)