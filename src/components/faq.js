import { Box, Divider, Flex, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import comment from '../assets/svgs/comment-icon.svg';

const QuestionsAndReplies = ({ questions, white }) => {
  const colors = ['#FF9103', '#1D6169', '#4545FE']
  return (
    <Box pt="30px" id="questions">
      <Box border={white ? '0.3px solid #2E2E32' : '0.3px solid #CBCBCB'} bg={white ? '#0D0D0D' : '#F9F9F9'} borderRadius={'5px'}>
        <Flex align='center' gap='10px' px='15px' py='20px'>
          <Image src={comment.src} />
          <Text>Questions and replies</Text>
        </Flex>
        <Divider w='full' />
        {questions.map(question => (
          <Box px={{ base: '9px', md: '15px' }} py='20px'>
            <Flex gap='10px' align={'center'}>
              <VStack align={'stretch'} w='70%'>
                <Text color={white ? '#FFF' : '#1C1D2C'} fontSize={'20px'} fontWeight={600}>
                  Question
                </Text>
                {/* <Text color={white ? '#FFF' : '#000'} fontSize={'16px'} fontWeight={300} noOfLines={1}>
                  {question?.date}
                </Text> */}
              </VStack>
            </Flex>
            <Text mt='5px' fontSize={'16px'} color={'#191919'}>{question?.content}</Text>
            <Box
              mt='0px' ml={{ base: '7px', md: '15px' }}
              p={white && '9.469px 7.575px 0px 13.256px'}
              bg={white && '#171717'} borderRadius={white && ' 7.575px'}
            >
              {question?.replies?.map(reply => (
                <>
                  <Box mt='10px'>
                    <Flex gap='10px' align={'center'}>
                      <VStack align={'stretch'} w='70%'>
                        <Text color={white ? '#FFF' : '#1C1D2C'} fontSize={'20px'} fontWeight={600}>
                          Answer
                        </Text>
                        {/* <Text color={white ? '#FFF' : '#000'} fontSize={'16px'} fontWeight={400} noOfLines={1}>
                          Jun 15,2023
                        </Text> */}
                      </VStack>
                    </Flex>
                  </Box>
                  <Text mt='5px' fontSize={'16px'} color={white ? '#FFF' : '#191919'}>{reply}</Text>
                </>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default QuestionsAndReplies