import React from "react";
import {
  Box,
  Center,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

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
      p='25px'
      mx={'auto'}
      w='100%'
      h='455px'
      bg={'#8D99AE'}
      borderRadius='16px'
      overflow='hidden'
      as={motion.div}
      maxWidth={"428px"}
      onClick={onClickCard}
      direction='column'
      align='stretch'
      justify='space-between'
    >
      <Box>
        <Center h='63px' w='63px' borderRadius={'full'} bg='white'>
          <Text>{index}</Text>
        </Center>
        <Text fontSize='28px' mt='32px' fontWeight='700' color='white'>{title}</Text>
        <Text fontSize='20px' mt='12px' color='white'>{subTitle}</Text>
      </Box>
      <Box justifySelf={'flex-end'} alignSelf={'flex-end'}>{icon}</Box>
    </Flex>
  );
};


export default CreatorCard;