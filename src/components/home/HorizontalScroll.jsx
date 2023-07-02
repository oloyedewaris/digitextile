import { Box, HStack, Image, Text } from '@chakra-ui/react'
import React from 'react'

const HorizontalScroll = () => {
  return (
    <HStack
      // border='1px solid red'
      w='200vw'
      overflowX={'scroll'}
      divider={<Box h='8px' w='8px' bg='#8D99AE' borderRadius={'full'} />}
      color='#1C1D2C' mt='100px' spacing={'23px'}
    >
      <Text noOfLines={1} fontSize='15px'>One Community</Text>
      <Text noOfLines={1} fontSize='15px'>One Community</Text>
      <Text noOfLines={1} fontSize='15px'>One Community</Text>
      <Text noOfLines={1} fontSize='15px'>One Community</Text>
      <Text noOfLines={1} fontSize='15px'>One Community</Text>
      <Text noOfLines={1} fontSize='15px'>One Community</Text>
      <Text noOfLines={1} fontSize='15px'>One Community</Text>
      <Text noOfLines={1} fontSize='15px'>One Community</Text>
      <Text noOfLines={1} fontSize='15px'>One Community</Text>
      <Text noOfLines={1} fontSize='15px'>One Community</Text>
      <Text noOfLines={1} fontSize='15px'>One Community</Text>
      <Text noOfLines={1} fontSize='15px'>One Community</Text>
      <Text noOfLines={1} fontSize='15px'>One Community</Text>
    </HStack>
  )
}

export default HorizontalScroll