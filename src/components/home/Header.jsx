import { Box, Flex, HStack, Image, Text } from '@chakra-ui/react'
import React from 'react'
import arrow from '@/assets/svgs/arrow-bottom-right.svg';
import group from  '@/assets/images/group.png';

const Header = () => {
  return (
    <Flex color='#1C1D2C'>
      <Box w='50%'>
        <Text fontSize='52px' fontWeight={500}>
          Join the Ultimate <span style={{ fontWeight: 700 }}>Textile </span>
          and <span style={{ fontWeight: 700 }}>Fashion </span>Industry Platform.
        </Text>
        <Text fontSize='32px' mt='24px'>
          Connect, Collaborate, and Showcase Your Work with Creatives, Consumers and Professionals.
        </Text>
        <HStack mt='48px' spacing={'40px'}>
          <Flex gap='12px' align='center'>
            <Image src={arrow.src} />
            <Text fontSize='32px'>Explore</Text>
          </Flex>
          <Flex gap='12px' align='center'>
            <Image src={arrow.src} />
            <Text fontSize='32px'>Join</Text>
          </Flex>
        </HStack>
      </Box>
      <Box w='50%'>
        <Image src={group.src}/>
      </Box>
    </Flex>
  )
}

export default Header