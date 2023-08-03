import { Box, Flex, GridItem, Image, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'
import bgImage from '@/assets/images/landing-page/auth-bg.jpg';
import logo from '@/assets/images/logo-white.png';
import authVector from '@/assets/svgs/auth-vector-1.svg';
import authCheck from '@/assets/svgs/auth-check.svg';
import Link from 'next/link';

const AuthContainer = ({ children }) => {
  return (
    <Flex direction={{ base: 'column-reverse', md: 'row' }}>
      <Box w={{ base: '100%', md: '35%' }} h='full'>
        <Box position={'relative'} bgPosition={'center'} bgSize={'cover'} w='full' h='100vh' bgImage={bgImage.src}>
          <Box bg='linear-gradient(0deg, rgba(28, 29, 44, 0.90) 0%, rgba(28, 29, 44, 0.90) 100%)' h='full' w='full' position={'absolute'} />
          <Flex
            position={'absolute'} zIndex={10}
            w='full' h='full'
            px='60px' py='54px' align='stretch'
            direction={'column'} justify={'space-between'}
          >
            <Link href={'/'}>
              <Image src={logo.src} w='90px' h='50px' />
            </Link>
            <Box color='white'>
              <Text fontSize={'92px'} lineHeight={'25px'} fontWeight={700}>“</Text>
              <Text fontSize={'19px'} fontWeight={400}>
                Eget eu massa ornare maecenas nunc dolor in. Ullamcorper aliquam adipiscing et nibh.
                Sagittis habitasse quis malesuada posuere et pretium adipiscing aliquet. Tortor augue
                faucibus arcu suspendisse nulla id enim lacus.
              </Text>
              <Flex gap='8px' mt='17px'>
                <Text fontSize={'17px'} fontWeight={500}>Saint Mary</Text>
                <Image src={authCheck.src} />
              </Flex>
              <Image float={'right'} src={authVector.src} />
            </Box>
            <Box />
          </Flex>
        </Box>
      </Box>
      <Box mb={{ base: '60px', md: '0' }} w={{ base: '100%', md: '65%' }} h={{ base: '30vh', md: '100vh' }} overflowY={{ base: 'auto', md: 'scroll' }}>
        {children}
      </Box>
    </Flex>
  )
}

export default AuthContainer