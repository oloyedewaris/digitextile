import React, { useEffect, useState } from 'react'
import Conversations from './sections/conversations'
import { Box, Center, Flex, Spinner } from '@chakra-ui/react'
import LayoutView from '@/components/layout'
import { useMutation, useQuery } from 'react-query'
import { checkConversation, createConversation, fetchMessages, getConversation, getUserConversations, sendMessage } from '@/apis/messaging'
import { useRouter } from 'next/router'
import Auth from '@/hoc/Auth'
import Chats from './sections/chats'
import EmptyState from '@/components/empty-state'

const Message = () => {
  const router = useRouter();
  const recipientId = router.query.id;
  const { data: checkData, isLoading } = useQuery(["checkConversation", recipientId], () => recipientId && checkConversation(recipientId));
  const [conversation, setConversation] = useState(null);
  const conversationQuery = useQuery(["getUserConversations"], getUserConversations);


  const messagesQuery = useQuery(
    ["fetchMessages", conversation?._id, recipientId],
    () => conversation && fetchMessages(conversation?._id),
    {
      enabled: true,
      refetchInterval: 2000,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
      staleTime: Infinity,
      // retry: true,
      // retryDelay: 1000,
      // retryOnMount: true,
    }
  );

  const startNewUserConversationMutation = useMutation(
    () => createConversation({ recipientId: router.query?.id }),
    {
      onSuccess: res => {
        setConversation(res?.data?.data?.data)
      },
    }
  );

  const sendMessageMutation = useMutation(
    (data) => {
      sendMessage(conversation?._id, data);
      messagesQuery.refetch();
    },
    {
      onSuccess: res => { },
      onError: err => { }
    }
  );


  useEffect(() => {
    if (recipientId) {
      if (!!isLoading) {
        if (!checkData?.data?.data) {
          startNewUserConversationMutation.mutate()
        } else {
          setConversation(checkData?.data?.data)
        }
      }
    }
  }, [checkData?.data, recipientId])


  const handleSelectConv = (conv) => {
    setConversation(conv)
  }

  return (
    <LayoutView darkFooter noFooter>
      {isLoading ? (
        <Center h='50vh' w='full'>
          <Spinner />
        </Center>
      ) : (
        <Box
          color='#9F9898'
          mb={{ base: '10px', md: '30px' }}
          px={{ base: '20px', md: '70px' }}
          borderRadius={{ base: '12px', md: '24px' }}
        >
          <Flex w='full' gap='20px' direction={{ base: 'column', md: 'row' }}>
            <Box w={{ base: '100%', md: '28%' }} px='7px' py='10px' bg='white' borderRadius={{ md: '16px' }} h='80vh'>
              <Conversations handleSelectConv={handleSelectConv} conversationQuery={conversationQuery} />
            </Box>

            <Box w={{ base: '100%', md: '72%' }} bg='white' borderRadius={{ base: '8px', md: '16px' }} h='80vh'>
              {conversation ? (
                <Chats conversation={conversation} sendMessageMutation={sendMessageMutation} messagesQuery={messagesQuery} />
              ) : (
                <EmptyState text={'Select a conversation to start'} />
              )}
            </Box>
          </Flex>
        </Box>
      )}
    </LayoutView>
  )
}

export default Auth(Message)