import { Box, Flex, VStack, Image, Text } from "@chakra-ui/react";
import ecoSystem from '../../assets/images/landing-page/eco-system.png'
import check from '../../assets/images/landing-page/dashed-check.png'
import Button from "../button";
import Link from "next/link";

const Ecosystem = () => {
  return (
    <Flex
      direction={{ base: 'column-reverse', md: 'row' }}
      bg='#8D99AE' px={{ base: '15px', md: '78px' }}
      py={{ base: '20px', md: '112px' }} mt={{ base: '30px', md: '128px' }}
      minH='719px' justify={'space-between'} align={'center'}
    >
      <Box color={'white'}>

        <Text fontSize={{ base: '18px', md: '28px' }} fontWeight={700}>Digi Textile Ecosystem.</Text>
        <Text fontSize={{ base: '18px', md: '28px' }} fontWeight={700} mt={{ base: '10px', md: '40px' }}>Connecting the fashion industry</Text>
        <Text fontSize={{ base: '18px', md: '28px' }} fontWeight={400}>
          Bringing various possibilities into existence.
          Buy, sell, collaborate and stay up to date with latest trends.
        </Text>
        <VStack spacing={'38px'} align={'stretch'} mt='40px'>
          <Flex gap='16px'>
            <Image src={check.src} />
            <Text fontWeight={500} fontSize={{ base: '14px', md: '20px' }}>One-stop shop for fashion consumers</Text>
          </Flex>
          <Flex gap='16px'>
            <Image src={check.src} />
            <Text fontWeight={500} fontSize={{ base: '14px', md: '20px' }}>Works showcasing to niched audience</Text>
          </Flex>
          <Flex gap='16px'>
            <Image src={check.src} />
            <Text fontWeight={500} fontSize={{ base: '14px', md: '20px' }}>Fashion Talent recruitment</Text>
          </Flex>
          <Flex gap='16px'>
            <Image src={check.src} />
            <Text fontWeight={500} fontSize={{ base: '14px', md: '20px' }}>Collaborations and Connections</Text>
          </Flex>
        </VStack>
        <Button mt='61px' px='24px' py='12px' bg='#E53935' borderRadius='8px'>
          <Link href='/auth'>Join the Ecosystem</Link>
        </Button>
      </Box>
      <Box>
        <Image src={ecoSystem.src} />
      </Box>
    </Flex>
  )
}

export default Ecosystem;