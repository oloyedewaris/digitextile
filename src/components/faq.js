import { Box, Divider, Flex, Image, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import comment from '../assets/svgs/comment-icon.svg';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

const QuestionsAndReplies = ({ questions }) => {

  return (
    <Box pt="30px" id="questions">
      <Box border={'0.3px solid #CBCBCB'} bg={'#F9F9F9'} borderRadius={'5px'}>
        <Flex align='center' gap='10px' px='15px' py='20px'>
          <Image src={comment.src} />
          <Text>Frequently Asked Questions</Text>
        </Flex>
        <Divider w='full' />
        {questions.map(question => (
          <Question question={question} />
        ))}
      </Box>
    </Box>
  )
}

export default QuestionsAndReplies

const Question = ({ question }) => {
  const [isOpen, setIsOpen] = useState(false);

  const colors = ['#FF9103', '#1D6169', '#4545FE']

  return (
    <Box px={{ base: '9px', md: '15px' }} py='5px'>
      <Flex gap='10px' align={'center'}>
        <VStack align={'stretch'} w='100%'>
          <Flex onClick={() => setIsOpen((prev) => !prev)} cursor={'pointer'} w='full' justify={'space-between'} align={'center'}>
            <Text mt='5px' fontSize={'18px'} fontWeight={500} color={'#191919'}>{question?.content}</Text>
            <Box>
              {isOpen ? <ChevronUpIcon fontSize={25} /> : <ChevronDownIcon fontSize={25} />}
            </Box>
          </Flex>
        </VStack>
      </Flex>
      {isOpen && (
        <Box mt='0px'>
          {question?.replies?.map(reply => (
            <Text w='80%' mt='5px' fontSize={'16px'} color={'#191919'}>{reply}</Text>
          ))}
        </Box>
      )}
    </Box>
  )
}