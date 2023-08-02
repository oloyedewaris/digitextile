import { Box, Flex, Image, Text } from "@chakra-ui/react";
import BannerPerson from '@/assets/images/landing-page/banner-person.png';
import Button from "../button";

const BottomBanner = ({ button }) => {
  return (
    <Box px={{ base: '15px', md: '80px' }} bg='#EDF2F4' pt={{ base: '50px', md: '168px' }} pb={{ base: '40px', md: '120px' }}>
      <Flex borderRadius={{ base: '10px', md: '16px' }} position={'relative'} w='full' h={{ base: '200px', md: '324px' }} bg='#2B2D42' p={{ base: '20px', md: '80px' }}>
        <Box w={{ base: '50%', sm: '70%', md: '100%' }}>
          <Text fontSize={{ base: '20px', md: '48px' }} fontWeight={600} color='white'>
            Suddenly it’s all so accessible.
          </Text>
          {button}
        </Box>
        <Image
          w={{ base: '150px', md: '314px' }}
          h={{ base: '200px', md: '403px' }}
          position={'absolute'} bottom='0'
          right={{ base: '5px', sm: '15px', md: '80px' }}
          src={BannerPerson.src}
        />
      </Flex>
    </Box>
  )
}

export default BottomBanner;