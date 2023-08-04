import React from "react";
import {
  VStack,
  Image,
  Text,
  Flex,
  Box,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const ProductCard = ({
  id,
  title,
  image,
  subTitle,
  onClickCard,
  offers
}) => {


  return (
    <Flex
      cursor='pointer'
      bg='white'
      py={{ base: '15px', md: '19px' }}
      px={{ base: '6px', md: '12px' }}
      mx={'auto'}
      w='100%'
      borderRadius={{ base: '6px', md: '16px' }}
      border='1px solid #2B2D42'
      overflow='hidden'
      as={motion.div}
      maxWidth={"322px"}
      h={{ base: '80px', md: '120px' }}
      onClick={onClickCard}
      direction='row'
      justify={'space-around'}
      align={'center'}
      gap={{ base: '8px', md: '12px' }}
    >
      <Image
        borderRadius={{ base: 'md', md: 'xl' }}
        bgPosition={'center'}
        bgSize={"cover"}
        w={{ base: '35%', md: 'full' }}
        maxW='98px'
        h={{ base: 'auto', md: "98px" }}
        src={image}
      />

      <VStack align={"stretch"} spacing={{ base: '2px', md: '5px' }} >
        <Text lineHeight={{ base: '12px', md: '18px' }} fontSize={{ base: '12px', md: '16px' }} fontWeight='700'>{title}</Text>
        <Text lineHeight={{ base: '12px', md: '18px' }} fontSize={{ base: '10px', md: '14px' }}>{subTitle}</Text>
        <Text lineHeight={{ base: '12px', md: '18px' }} fontSize={{ base: '10px', md: '14px' }} mt={{ base: 'auto', md: "8px" }}>{offers}</Text>
      </VStack>
    </Flex>
  );
};


export default ProductCard;