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
  title,
  image,
  subTitle,
  onClickCard,
  offers
}) => {


  return (
    <Flex
      bg='white'
      py='19px'
      px='12px'
      mx={'auto'}
      w='100%'
      borderRadius='16px'
      border='1px solid #2B2D42'
      overflow='hidden'
      as={motion.div}
      maxWidth={"322px"}
      h='120px'
      onClick={onClickCard}
      direction='row'
      justify={'space-between'}
      align={'center'}
      gap='12px'
    >
      <Image
        borderRadius='xl'
        bgPosition={'center'}
        bgSize={"cover"}
        w='full'
        maxW='98px'
        h={{ base: 'auto', md: "98px" }}
        src={image}
      />

      <VStack align={"stretch"}>
        <Text fontSize='16px' fontWeight='700'>{title}</Text>
        <Text fontSize='14px'>{subTitle}</Text>
        <Text fontSize='14px' mt={"8px"}>{offers}</Text>
      </VStack>
    </Flex>
  );
};


export default ProductCard;