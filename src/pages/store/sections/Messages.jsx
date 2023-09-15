import React, { useEffect, useState } from 'react'
import { Box, Center, Flex, Spinner } from '@chakra-ui/react'
import LayoutView from '@/components/layout'
import { useMutation, useQuery } from 'react-query'
import { checkConversation, createConversation, fetchMessages, getConversation, getUserConversations, sendMessage } from '@/apis/messaging'
import { useRouter } from 'next/router'
import Auth from '@/hoc/Auth'
import EmptyState from '@/components/empty-state'
import Chats from '@/pages/messages/sections/chats'
import Conversations from '@/pages/messages/sections/conversations'

const Message = () => {
  const router = useRouter();
  const [conversation, setConversation] = useState(null);
  const conversationQuery = useQuery(["getUserConversations"], getUserConversations);
  const conversationsData = conversationQuery?.data?.data?.data;



  const messagesQuery = useQuery(
    ["fetchMessages", conversation?._id],
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


  const handleSelectConv = (conv) => {
    setConversation(conv)
  }

  return (
    <Box color='#9F9898'>
      <Flex w='full' gap='20px' direction={{ base: 'column', md: 'row' }}>
        <Box w={{ base: '100%', md: '28%' }} px='7px' py='10px' bg='white' borderRadius={{ md: '16px' }} h='80vh'>
          <Conversations handleSelectConv={handleSelectConv} conversationsData={conversationsData} />
        </Box>

        <Box w={{ base: '100%', md: '72%' }} bg='white' borderRadius={{ base: '8px', md: '16px' }} h='80vh'>
          {conversation ? (
            <Chats sendMessageMutation={sendMessageMutation} messagesQuery={messagesQuery} />
          ) : (
            <EmptyState h='80vh' text={'Select a conversation to start'} />
          )}
        </Box>
      </Flex>
    </Box>
  )
}

export default Message