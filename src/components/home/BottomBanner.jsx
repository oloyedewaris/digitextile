import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import BannerPerson from '@/assets/images/banner-person.png';

const BottomBanner = () => {
  return (
    <Box px='80px'>
      <Flex borderRadius={'16px'} position={'relative'} w='full' h='324px' bg='#2B2D42' mt='168px' p='80px'>
        <Box>
          <Text fontSize={'48'} fontWeight={600} color='white'>
            Suddenly it’s all so accessible.
          </Text>
          <Button mt='32px' bg='white' borderRadius={'full'}>Join Digitextile</Button>
        </Box>
        <Image w='314.154px' h='403.483px' position={'absolute'} bottom='0' right='80px' src={BannerPerson.src} />
      </Flex>
    </Box>
  )
}

export default BottomBanner;