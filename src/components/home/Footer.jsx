import { Box, VStack, SimpleGrid, Text, Flex, HStack, Image, Divider, Stack, Center } from '@chakra-ui/react'
import apple from '@/assets/images/icons/apple-icon.png';
import facebook from '@/assets/images/icons/facebook-icon.png';
import google from '@/assets/images/icons/google-play-icon.png';
import insta from '@/assets/images/icons/insta-icon.png';
import twitter from '@/assets/images/icons/twitter-icon.png';
import globe from '@/assets/svgs/footer-globe.svg'
import logo from '@/assets/svgs/footer-logo.svg'
import naira from '@/assets/svgs/footer-naira.svg'
import Link from 'next/link';
import { FaApple, FaFacebook, FaGoogle, FaGooglePlay, FaInstagram, FaTwitter } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { getCategoriesApi } from '@/apis/category';

const Footer = ({ isDark }) => {
  const { data } = useQuery(["getCategories"], getCategoriesApi);
  const categories = data?.data?.data

  return (
    <Box w='full' p={{ base: '22px 20px 7px 22px', md: '88px 80px 28px 88px' }} bg={isDark ? '#2B2D42' : 'white'} color={isDark ? 'white' : '#9F9898'}>
      {!isDark && (
        <SimpleGrid mb='66px' columns={{ base: 1, md: 3, lg: 4 }} color='#9F9898' fontSize={'24px'} fontWeight={400}>
          <VStack align='stretch' spacing='16px'>
            <Text fontWeight='600' color='#1C1D2C' mt={{ base: '35px', md: '0' }}>Categories</Text>
            {categories?.map(category => (
              <Link href={`/category/${category?._id}?category=${category?.name}`}>
                <Text> {category?.name}</Text>
              </Link>
            ))}
          </VStack>
          <VStack align='stretch' spacing='16px'>
            <Text fontWeight='600' color='#1C1D2C' mt={{ base: '35px', md: '0' }}>About</Text>
            <Link href='/company/about-us'><Text>About Us</Text></Link>
            {/* <Link href='/'><Text>Careers</Text></Link> */}
            {/* <Link href='/'><Text>Press & News</Text></Link> */}
            <Link href='/'><Text>Privacy Policy</Text></Link>
            <Link href='/'><Text>Terms of Service</Text></Link>
            {/* <Link href='/'><Text>Investor Relations</Text></Link> */}
          </VStack>
          <VStack align='stretch' spacing='16px'>
            <Text fontWeight='600' color='#1C1D2C' mt={{ base: '35px', md: '0' }}>Support</Text>
            <Link href='/'><Text>Contact Us</Text></Link>
            <Link href='/'><Text>FAQs</Text></Link>
            <Link href='/'><Text>Trust and Safety</Text></Link>
            <Link href='/'><Text>Digitextile Guides</Text></Link>
            {/* <Link href='/'><Text>Dispute Settlement</Text></Link> */}
          </VStack>
          <VStack align='stretch' spacing='16px'>
            <Text fontWeight='600' color='#1C1D2C' mt={{ base: '35px', md: '0' }}>More from Digitextile</Text>
            <Link href='/hot-drops'><Text>Blog & Forums</Text></Link>
            {/* <Link href='/'><Text>Talent Scout</Text></Link> */}
            {/* <Link href='/'><Text>Events</Text></Link> */}
            {/* <Link href='/'><Text>Partnerships</Text></Link> */}
            {/* <Link href='/'><Text>Press</Text></Link> */}
          </VStack>
        </SimpleGrid>
      )}
      <Flex w='full' align={{ base: 'flex-start', md: 'center' }} justify={'space-between'} direction={{ base: 'column', md: 'row' }}>
        <Stack direction={{ base: 'column', md: 'row' }} align={{ base: 'flex-start', md: 'center' }} spacing='16px' w={{ base: 'full', md: 'auto' }}>
          <Text fontWeight={'600'} fontSize={{ base: '18px', md: '24px' }}>Follow Us</Text>
          <Flex gap={{ base: '12px', md: '16px' }}>
            <a target='_blank' href={'https://www.facebook.com/profile.php?id=61551946743735'}>
              <Center
                w={{ base: '30px', md: '50px' }}
                h={{ base: '30px', md: '50px' }}
                borderRadius={'full'}
                border={isDark ? '1.5px solid white' : '1.5px solid #9F9898'}
              >
                <FaFacebook size='17' />
              </Center>
            </a>
            <a target='_blank' href={'https://instagram.com/digitextile_ng?igshid=NGVhN2U2NjQ0Yg=='}>
              <Center
                w={{ base: '30px', md: '50px' }}
                h={{ base: '30px', md: '50px' }}
                borderRadius={'full'}
                border={isDark ? '1.5px solid white' : '1.5px solid #9F9898'}
              >
                <FaInstagram size='17' />
              </Center>
            </a>
            <a target='_blank' href={'https://x.com/DigiTextile?t=njq-6lGdlHMuWCciCEFbrA&s=09'}>
              <Center
                w={{ base: '30px', md: '50px' }}
                h={{ base: '30px', md: '50px' }}
                borderRadius={'full'}
                border={isDark ? '1.5px solid white' : '1.5px solid #9F9898'}
              >
                <FaTwitter size='17' />
              </Center>
            </a>
          </Flex>
        </Stack>
        <Stack direction={{ base: 'column', md: 'row' }} align={{ base: 'flex-start', md: 'center' }} spacing='16px' w={{ base: 'full', md: 'auto' }} mt={{ base: '30px', md: '0' }}>
          <Text fontWeight={'600'} fontSize={{ base: '18px', md: '24px' }}>Mobile App</Text>
          <Flex gap={{ base: '12px', md: '16px' }}>
            <Center
              w={{ base: '30px', md: '50px' }}
              h={{ base: '30px', md: '50px' }}
              borderRadius={'full'}
              border={isDark ? '1.5px solid white' : '1.5px solid #9F9898'}
            >
              <FaApple size='17' />
            </Center>
            <Center
              w={{ base: '30px', md: '50px' }}
              h={{ base: '30px', md: '50px' }}
              borderRadius={'full'}
              border={isDark ? '1.5px solid white' : '1.5px solid #9F9898'}
            >
              <FaGooglePlay size='17' />
            </Center>
          </Flex>
        </Stack>
      </Flex>
      <Divider w='full' h='1px' mt='24px' mb='32px' />
      <Flex w='full' align={'center'} justify={'space-between'} direction={{ base: 'column', md: 'row' }}>
        <Stack direction={{ base: 'column', md: 'row' }} align='center' spacing='18px'>
          <Image src={logo.src} />
          <Text fontWeight={'400'} fontSize={'20px'}> Digitextile Company. 2023</Text>
        </Stack>
        <HStack align='center' spacing='8px' mt={{ base: '20px', md: '0' }}>
          <Image src={globe.src} />
          <Text mr='16px' fontWeight={'400'} fontSize={'20px'}>English</Text>
          <Image src={naira.src} />
          <Text fontWeight={'400'} fontSize={'20px'}>NGN</Text>
        </HStack>
      </Flex>
    </Box>
  )
}

export default Footer