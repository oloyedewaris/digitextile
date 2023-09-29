import React from "react";
import {
  Box,
  Center,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";

const CreatorCard = ({
  title,
  image,
  onClickCard,
  subTitle,
  icon,
  index,
}) => {

  return (
    <Flex
      p={{ base: "12px", md: '24px' }}
      mx={'auto'}
      w='100%'
      h={{ base: '300px', md: '455px' }}
      bg={'#8D99AE'}
      borderRadius={{ base: '8px', md: '16px' }}
      overflow='hidden'
      as={motion.div}
      maxWidth={"428px"}
      minWidth={'250px'}
      onClick={onClickCard}
      direction='column'
      align='stretch'
      justify='space-between'
    >
      <Box>
        <Center h={{ base: '40px', md: '63px' }} w={{ base: '40px', md: '63px' }} borderRadius={'full'} bg='white'>
          <Text>{index}</Text>
        </Center>
        <Text fontSize={{ base: '22px', md: '28px' }} mt='32px' fontWeight='700' color='white'>{title}</Text>
        <Text fontSize={{ base: '15px', md: '20px' }} mt={{ base: '10px', md: '12px' }} color='white' noOfLines={2}>{subTitle}</Text>
      </Box>
      <Box justifySelf={'flex-end'} alignSelf={'flex-end'}>
        <Link href={'/auth'}>{icon}</Link>
      </Box>
    </Flex>
  );
};


export default CreatorCard;