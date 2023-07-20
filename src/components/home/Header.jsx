import { Box, Flex, HStack, Image, Text } from '@chakra-ui/react'
import React from 'react'
import arrow from '@/assets/svgs/arrow-bottom-right.svg';
import group from '@/assets/images/landing-page/group.png';
import Link from 'next/link';

const Header = () => {
  return (
    <Flex direction={{ base: 'column-reverse', md: 'row' }} align={'center'} color='#1C1D2C' mt={{ base: '60px', md: '130px' }} px={{ base: '20px', md: '84px' }}>
      <Box w={{ base: '90%', md: '50%' }} textAlign={{ base: 'center', md: 'left' }}>
        <Text fontSize={{ base: '22px', md: '52px' }} mt={{ base: '20px', md: '0' }} fontWeight={500}>
          Join the Ultimate <span style={{ fontWeight: 700 }}>Textile </span>
          and <span style={{ fontWeight: 700 }}>Fashion </span>Industry Platform.
        </Text>
        <Text fontSize={{ base: '15px', md: '32px' }} mt='24px'>
          Connect, Collaborate, and Showcase Your Work with Creatives, Consumers and Professionals.
        </Text>
        <HStack mt={{ base: '20px', md: '48px' }} spacing={'40px'}>
          <Flex gap='12px' align='center'>
            <Image h={{ base: '39px', md: 'auto' }} w={{ base: '39px', md: 'auto' }} src={arrow.src} />
            <Link href={'/auth'}>
              <Text fontSize={{ base: '20px', md: '32px' }}>Explore</Text>
            </Link>
          </Flex>
          <Flex gap='12px' align='center'>
            <Image h={{ base: '39px', md: 'auto' }} w={{ base: '39px', md: 'auto' }} src={arrow.src} />
            <Link href={'/auth'}>
              <Text fontSize={{ base: '20px', md: '32px' }}>Join</Text>
            </Link>
          </Flex>
        </HStack>
      </Box>
      <Box w='50%'>
        <Image src={group.src} />
      </Box>
    </Flex>
  )
}

export default Header