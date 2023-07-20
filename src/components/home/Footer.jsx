import { Box, VStack, SimpleGrid, Text, Flex, HStack, Image, Divider, Stack } from '@chakra-ui/react'
import apple from '@/assets/images/icons/apple-icon.png';
import facebook from '@/assets/images/icons/facebook-icon.png';
import google from '@/assets/images/icons/google-play-icon.png';
import insta from '@/assets/images/icons/insta-icon.png';
import twitter from '@/assets/images/icons/twitter-icon.png';
import globe from '@/assets/svgs/footer-globe.svg'
import logo from '@/assets/svgs/footer-logo.svg'
import naira from '@/assets/svgs/footer-naira.svg'
import Link from 'next/link';

const Footer = () => {
  return (
    <Box w='full' p={{ base: '22px 20px 7px 22px', md: '88px 80px 28px 88px' }} bg='white'>
      <SimpleGrid columns={{ base: 1, md: 3, lg: 4 }} color='#9F9898' fontSize={'24px'} fontWeight={400}>
        <VStack align='stretch' spacing='16px'>
          <Text fontWeight='600' color='#1C1D2C' mt={{ base: '35px', md: '0' }}>Categories</Text>
          <Link href='/'><Text>Textile Design</Text></Link>
          <Link href='/'><Text>Modelling</Text></Link>
          <Link href='/'><Text>Fashion Consulting</Text></Link>
          <Link href='/'><Text>Fashion Design</Text></Link>
          <Link href='/'><Text>Sales</Text></Link>
          <Link href='/'><Text>Machinery</Text></Link>
          <Link href='/'><Text>Learning</Text></Link>
        </VStack>
        <VStack align='stretch' spacing='16px'>
          <Text fontWeight='600' color='#1C1D2C' mt={{ base: '35px', md: '0' }}>About</Text>
          <Link href='/'><Text>About Us</Text></Link>
          <Link href='/'><Text>Careers</Text></Link>
          <Link href='/'><Text>Press & News</Text></Link>
          <Link href='/'><Text>Privacy Policy</Text></Link>
          <Link href='/'><Text>Terms of Service</Text></Link>
          <Link href='/'><Text>Investor Relations</Text></Link>
        </VStack>
        <VStack align='stretch' spacing='16px'>
          <Text fontWeight='600' color='#1C1D2C' mt={{ base: '35px', md: '0' }}>Support</Text>
          <Link href='/'><Text>Contact Us</Text></Link>
          <Link href='/'><Text>Help & Support</Text></Link>
          <Link href='/'><Text>Trust and Safety</Text></Link>
          <Link href='/'><Text>Digitextile Guides</Text></Link>
          <Link href='/'><Text>Dispute Settlement</Text></Link>
        </VStack>
        <VStack align='stretch' spacing='16px'>
          <Text fontWeight='600' color='#1C1D2C' mt={{ base: '35px', md: '0' }}>More from Digitextile</Text>
          <Link href='/'><Text>Blog & Forums</Text></Link>
          <Link href='/'><Text>Talent Scout</Text></Link>
          <Link href='/'><Text>Events</Text></Link>
          <Link href='/'><Text>Partnerships</Text></Link>
          <Link href='/'><Text>Press</Text></Link>
        </VStack>
      </SimpleGrid>
      <Flex mt='66px' w='full' align={{ base: 'flex-start', md: 'center' }} justify={'space-between'} direction={{ base: 'column', md: 'row' }}>
        <Stack direction={{ base: 'column', md: 'row' }} align={{ base: 'flex-start', md: 'center' }} spacing='16px' w={{ base: 'full', md: 'auto' }}>
          <Text fontWeight={'600'} fontSize={{ base: '18px', md: '24px' }}>Follow Us</Text>
          <Flex gap={{ base: '12px', md: '16px' }}>
            <Image w={{ base: '30px', md: 'auto' }} h={{ base: '30px', md: 'auto' }} src={facebook.src} />
            <Image w={{ base: '30px', md: 'auto' }} h={{ base: '30px', md: 'auto' }} src={insta.src} />
            <Image w={{ base: '30px', md: 'auto' }} h={{ base: '30px', md: 'auto' }} src={twitter.src} />
          </Flex>
        </Stack>
        <Stack direction={{ base: 'column', md: 'row' }} align={{ base: 'flex-start', md: 'center' }} spacing='16px' w={{ base: 'full', md: 'auto' }} mt={{ base: '30px', md: '0' }}>
          <Text fontWeight={'600'} fontSize={{ base: '18px', md: '24px' }}>Mobile App</Text>
          <Flex gap={{ base: '12px', md: '16px' }}>
            <Image w={{ base: '30px', md: 'auto' }} h={{ base: '30px', md: 'auto' }} src={apple.src} />
            <Image w={{ base: '30px', md: 'auto' }} h={{ base: '30px', md: 'auto' }} src={google.src} />
          </Flex>
        </Stack>
      </Flex>
      <Divider w='full' h='1px' mt='24px' mb='32px' color='#9F9898' />
      <Flex w='full' align={'center'} justify={'space-between'} direction={{ base: 'column', md: 'row' }}>
        <Stack direction={{ base: 'column', md: 'row' }} align='center' spacing='18px'>
          <Image src={logo.src} />
          <Text fontWeight={'400'} fontSize={'20px'} color='#9F9898'> Digitextile Company. 2023</Text>
        </Stack>
        <HStack align='center' spacing='8px' mt={{ base: '20px', md: '0' }}>
          <Image src={globe.src} />
          <Text mr='16px' fontWeight={'400'} fontSize={'20px'} color='#9F9898'>English</Text>
          <Image src={naira.src} />
          <Text fontWeight={'400'} fontSize={'20px'} color='#9F9898'>NGN</Text>
        </HStack>
      </Flex>
    </Box>
  )
}

export default Footer