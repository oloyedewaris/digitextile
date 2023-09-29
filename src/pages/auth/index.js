import { Box, Center, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { BiUser } from 'react-icons/bi'
import { RiArrowRightLine } from 'react-icons/ri'
import { motion } from 'framer-motion';
import AuthContainer from './sections/authCon'
import { useRouter } from 'next/router';

const Auth = () => {
  const router = useRouter();

  return (
    <AuthContainer>
      <Flex px={{ base: '30px', md: '80px' }} py={{ base: '28px', md: '64px' }} direction={'column'} justify={'space-between'} align={'stretch'} w='full'>
        <Text color='#A2A6AB' fontSize={'18px'} alignSelf={'flex-end'} >
          Already have an account?
          <Text cursor={'pointer'} onClick={() => router.push('/auth/login')} color='#EF233C' as={'span'}> Sign In</Text>
        </Text>
        <Flex color='#1C1D2C' mt='10px' pl={{ base: 0, md: '60px' }} direction={'column'} align={'stretch'} gap={{ base: '20px', md: '40px' }}>
          <Box w='full' textAlign={{ base: 'center', md: 'left' }}>
            <Text fontSize={{ base: '24px', md: '40px' }} mt='15px' fontWeight={700} >Join Us!</Text>
            <Text mt='12px' fontSize={{ base: '15px', md: '24px' }}>To begin this journey, tell us what type of user you intend to be.</Text>
          </Box>
          <Flex
            onClick={() => router.push('/auth/consumer/register')}
            px={{ base: '17px', md: '40px' }} gap={{ base: '15px', md: '40px' }}
            py={{ base: '12px', md: '27px' }}
            _hover={{ border: '1px solid #2B2D42', background: '#EDF2F4', cursor: 'pointer' }}
            shadow='md'
            borderRadius={'8px'} align={'center'}
            as={motion.div}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.9 }}
          >
            <Center bg='#1C1D2C' w={{ base: '40px', md: '64px' }} h={{ base: '40px', md: '64px' }} borderRadius={{ base: '12px', md: '24px' }}>
              <BiUser fontSize={'30px'} color='white' />
            </Center>
            <Box maxW={'60%'}>
              <Text fontSize={{ base: '17px', md: '22px' }} fontWeight={500}>Consumer</Text>
              <Text fontSize={{ base: '14px', md: '18px' }} mt='4px' color='#A2A6AB'>Browse various products and hire capable hands.</Text>
            </Box>
            <RiArrowRightLine fontSize={'30px'} color='#1C1D2C' />
          </Flex>
          <Flex
            onClick={() => router.push('/auth/creator/register')}
            px={{ base: '17px', md: '40px' }} gap={{ base: '15px', md: '40px' }}
            py={{ base: '12px', md: '27px' }}
            _hover={{ border: '1px solid #2B2D42', background: '#EDF2F4', cursor: 'pointer' }}
            shadow='md'
            borderRadius={'8px'} align={'center'}
            as={motion.div}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.9 }}
          >
            <Center border={'1px solid #2B2D42'} bg='white' w={{ base: '40px', md: '64px' }} h={{ base: '40px', md: '64px' }} borderRadius={{ base: '12px', md: '24px' }}>
              <BiUser fontSize={'30px'} color='#1C1D2C' />
            </Center>
            <Box maxW={'60%'}>
              <Text fontSize={{ base: '17px', md: '22px' }} fontWeight={500}>Creator</Text>
              <Text fontSize={{ base: '14px', md: '18px' }} mt='4px' color='#A2A6AB'>Showcase your works, collaborate and meet your next client.</Text>
            </Box>
            <RiArrowRightLine fontSize={'30px'} color='#1C1D2C' />
          </Flex>
        </Flex>
        <Box h='30px' />
      </Flex>
    </AuthContainer>
  )
}

export default Auth