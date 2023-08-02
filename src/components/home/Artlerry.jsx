import { Box, Center, Divider, Flex, HStack, Image, Text } from "@chakra-ui/react";
import user from '@/assets/images/landing-page/carousel-user.png';
import Carousel from 'react-elastic-carousel'
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const Story = ({ details, topic }) => (
  <Flex gap={{ base: '30px', md: '44px' }} direction={{ base: 'column', md: 'row' }} align={{ base: 'center', md: 'flex-start' }}>
    <Image maxW={{ base: '90%', md: '40%' }} w='100%' h='full' src={user.src} />
    <Box w='full' pr={{ base: '0', md: '38px' }}>
      <Flex fontSize={{ base: '20px', md: '24px' }} spacing={{ base: '20px', md: '24px' }} w='full' justify={'space-between'} align='center'>
        <Text fontSize={{ base: '12px', md: '14px' }} fontWeight={400} color='#A4A0A0' noOfLines={'1'}>{topic}</Text>
        <Divider h={{ base: '20px', md: '32px' }} color='red' orientation="vertical" />
        <Text fontSize={{ base: '10px', md: '14px' }} fontWeight={500}>Artlerry</Text>
      </Flex>
      <Text mt={{ base: '20px', md: '32px' }} fontSize={{ base: '15px', md: '32px' }} fontWeight={400}>
        {details}
      </Text>
    </Box>
  </Flex>
)

const Artlerry = () => {
  return (
    <Box minH={{ base: '350px', md: '614px' }} py={{ base: '20px', md: '137px' }} px={{ base: '10px', md: '40px' }} bg='white'>
      <Carousel
        pagination={false}
        renderArrow={prop => (
          <Center>
            <Center cursor={'pointer'} onClick={prop.onClick} w={{ base: '40px', md: '60px' }} h={{ base: '40px', md: '60px' }} borderRadius={'full'} shadow={'md'}>
              {prop.type === 'NEXT' ? (
                <ChevronRightIcon fontSize={{ base: '38px', md: '45px' }} />
              ) : (
                <ChevronLeftIcon fontSize={{ base: '38px', md: '45px' }} />
              )}
            </Center>
          </Center>
        )}
      >
        <Story
          topic={'Tejumade Olomola, Chief Executive Officer'}
          details={'“Explore the massive collections of textile and fashion designs. Stay in trend and be immersed in the world of fashion. Find or Request a fashion need.”'}
        />
        <Story
          topic={'Tejumade Olomola, Chief Executive Officer'}
          details={'“Explore the massive collections of textile and fashion designs. Stay in trend and be immersed in the world of fashion. Find or Request a fashion need.”'}
        />
        <Story
          topic={'Tejumade Olomola, Chief Executive Officer'}
          details={'“Explore the massive collections of textile and fashion designs. Stay in trend and be immersed in the world of fashion. Find or Request a fashion need.”'}
        />
      </Carousel>
    </Box>
  )
}

export default Artlerry