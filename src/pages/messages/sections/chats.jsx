import { CheckIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import { Box, Center, Flex, Image, Input, InputGroup, InputLeftAddon, Spinner, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useRef, useState } from 'react';
import avatar from '@/assets/images/avatar.png';
import { GlobalContext } from '@/context/Provider';
import { FaPaperPlane } from 'react-icons/fa';
import { scrollbarStyle } from '@/utils/constant';
// import { css } from 'emotion';
import ScrollToBottom from 'react-scroll-to-bottom';

// const ROOT_CSS = css({
//   height: 600,
//   width: 400
// });
const Chats = ({ sendMessageMutation, messagesQuery }) => {
  const messages = messagesQuery?.data?.data?.data;
  const router = useRouter()
  const { authState: { user } } = useContext(GlobalContext)
  const [text, setText] = useState('');
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (messages?.length)
      scrollToBottom()
  }, [messages?.length]);


  const handleSend = e => {
    e?.preventDefault && e?.preventDefault();
    if (text) {
      sendMessageMutation.mutate({ content: text });
      setText('');
    }
  }

  return (
    <Flex direction={'column'} align={'stretch'} px={{ base: '10px', md: '24px' }} py={{ base: '10px', md: '30px' }} h='full'>
      <Flex color='#A2A6AB' gap='8px' align='center' onClick={() => router.back()} cursor='pointer'>
        <ChevronLeftIcon fontSize={{ base: 25, md: 30 }} />
        <Text fontSize={'18px'} noOfLines={1}>Back</Text>
      </Flex>

      {messagesQuery?.isLoading ? (
        <Center h='50vh' w='full'>
          <Spinner />
        </Center>
      ) : (
        // <ScrollToBottom>
        <Box h='full' mt='16px' overflowY={'scroll'} __css={scrollbarStyle} pb='5px' pr='5px'>
          {messages?.map((msg, index) => {
            const checkPreviousSender = messages && (messages[index - 1]?.author?._id !== messages[index]?.author?._id)
            const checkNextSender = messages && (messages[index + 1]?.author?._id !== messages[index]?.author?._id)
            return (
              <Box key={msg?._id} mt='5px'>
                {msg?.author?._id === user?._id ? (
                  <Flex my='0px' w='full' justify={'flex-end'} align={'center'}>
                    <VStack align={'stretch'} w='50%'>
                      <Text
                        borderRadius={checkPreviousSender ? '12px 0px 12px 12px' : '12px'}
                        bg='#2B2D42' padding='6px 12px' color={'#fff'}
                        fontSize={'14px'} fontWeight={400} w='full'
                      >
                        {msg?.content}
                      </Text>
                      {checkNextSender && (
                        <Flex justify={'flex-end'} align={'center'} w='full' gap='10px' px='10px'>
                          <Text
                            pr='10px'
                            textAlign={'right'} fontSize={'10px'}
                            fontWeight={300} color='#A5A1A1'
                          >
                            {msg?.createdAt && new Date(msg?.createdAt).toLocaleTimeString()}
                          </Text>
                          <CheckIcon color={'#6197FF'} />
                        </Flex>
                      )}
                    </VStack>
                  </Flex>
                ) : (
                  <Flex my='0px' w='full' justify={'flex-start'} align={'center'}>
                    <Flex justify={'flex-start'} gap='10px' align={'center'} w='full'>
                      {checkPreviousSender ? (
                        <Image w='40px' h='40px' borderRadius={'full'} src={msg?.author?.image || avatar.src} />
                      ) : <Box w='40px' />}
                      <VStack align={'stretch'} w='45%'>
                        {checkPreviousSender && (
                          <Flex justify={'space-between'} align={'center'} w='45%'>
                            <Text color={'#1C1D2C'} fontSize={'16px'} fontWeight={600}>
                              {msg?.author?.fullname}
                            </Text>
                            <Text
                              pr='10px'
                              textAlign={'right'} fontSize={'10px'}
                              fontWeight={300} color='#A5A1A1'
                            >
                              {msg?.createdAt && new Date(msg?.createdAt).toLocaleTimeString()}
                            </Text>
                          </Flex>
                        )}
                        <Text
                          w='full'
                          borderRadius={checkPreviousSender ? '0px 12px 12px 12px' : '12px'}
                          bg='#E1E9EC' padding='6px 12px'
                          color={'#000'} fontSize={'14px'}
                          fontWeight={400}
                        >
                          {msg?.content}
                        </Text>
                      </VStack>
                    </Flex>
                  </Flex>
                )}
              </Box>
            )
          })}
          <div ref={messagesEndRef} />
        </Box>
        // </ScrollToBottom>
      )}


      <form onSubmit={handleSend}>
        <InputGroup py='15px' pr='10px' borderRadius={'16px'} border='1px solid #2B2D42' w='90%' mx='auto'>
          <Input
            _focus={{ border: 'none', outline: 'none' }}
            border={'none'}
            placeholder="Compose your messages"
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <InputLeftAddon
            bg={'transparent'}
            p={"0px"}
            border={"none"}
          >
            <FaPaperPlane onClick={handleSend} color='#2B2D42' size='20' />
          </InputLeftAddon>
        </InputGroup>
      </form>
    </Flex>
  )
}

export default Chats