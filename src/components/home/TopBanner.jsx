import { Box, Flex, Image, Text } from "@chakra-ui/react";
import bgBanner from '@/assets/images/banner-1.png';
import Carousel from 'react-elastic-carousel'

const TopBanner = () => {
  return (
    <Box px={{ base: '15px', md: '40px' }}>
      <Box
        borderRadius={{ base: '8px', md: '16px' }}
        bg={'#1C1D2C'} w='full' h={{ base: '', md: '300px' }}
        px={{ base: '12px', md: '40px' }}
        pt={{ base: '50px', md: '38px' }}
      // pb={{ base: '40px', md: '120px' }}
      >
        <Carousel showArrows={false}>
          {Array(3).fill(1).map(item => (
            <Flex w='full'>
              <Box w={{ base: '80%', sm: '65%', md: '50%' }}>
                <Text fontSize={{ base: '18px', md: '40px' }} fontWeight={600} color='white'>
                  Quality clothings at your fingertips
                </Text>
                <Text mt={{ base: '5px', md: '11px' }} fontSize={{ base: '13px', md: '24px' }} fontWeight={600} color='white'>
                  Have quality clothes in mind?. Connect with best stores right away.
                </Text>
              </Box>
            </Flex>
          ))}
        </Carousel>
      </Box>
    </Box>
  )
}

export default TopBanner;