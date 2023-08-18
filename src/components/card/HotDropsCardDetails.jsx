import React from "react";
import {
  Box,
  HStack,
  VStack,
  Image,
  Text,
  Center,
  Flex,
} from "@chakra-ui/react";
import { RiArrowRightLine } from "react-icons/ri";
import { motion } from "framer-motion";
import ImageGallery from 'react-image-gallery';
import { BiHeart } from "react-icons/bi";
import Link from "next/link";

const HotDropDetail = ({
  title,
  image,
  subTitle,
  onClickCard,
  time,
  id,
  category,
  timeToRead,
  user,
  person
}) => {

  return (
    <Box
      bg='white'
      p={{ base: '8px', md: '16px' }}
      mx={'auto'}
      w='100%'
      borderRadius={{ base: '8px', md: '16px' }}
      overflow='hidden'
      as={motion.div}
      maxWidth={"322px"}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClickCard}
    >
      <Box minH={{ base: '200px', md: "280px" }}>
        <Image
          borderRadius={{ base: 'sm', md: 'md' }}
          bgPosition={'center'}
          bgSize={"cover"}
          w='full'
          maxW='290px'
          h='auto'
          maxH={{ base: '200px', md: "280px" }}
          minH={{ base: '200px', md: "280px" }}
          src={image}
        />
      </Box>

      <VStack mt={"8px"} align={"start"}>
        <HStack alignItems={'center'} w={"100%"} spacing={'14px'} divider={<Box w='4px' h='4px' borderRadius={'full'} bg='#1565C0' />}>
          <Text fontSize={{ base: '13px', md: '18px' }} color={'#1565C0'} noOfLines={1}>{category}</Text>
          <Text fontSize={{ base: '13px', md: '18px' }} color={'#1565C0'} noOfLines={1}>{timeToRead}</Text>
        </HStack>
        <Text fontSize={{ base: '13px', md: '20px' }} fontWeight='500' noOfLines={1}>{title}</Text>
        <Text fontSize={{ base: '18px', md: '22px' }} color='#C4C4C4' noOfLines={3}>{subTitle}</Text>
        <HStack alignItems={'center'} w={"100%"} spacing={'14px'} divider={<Box w='4px' h='4px' borderRadius={'full'} bg='#4D515E' />}>
          <Flex justify={'center'} align={'center'} gap='14px'>
            <Image h='40px' w='40px' borderRadius='full' src={person} />
            <Text fontSize={{ base: '10px', md: '14px' }} color={'#4D515E'} noOfLines={1}>{user}</Text>
          </Flex>
          <Text fontSize={{ base: '10px', md: '14px' }} color={'#4D515E'} noOfLines={1}>{time}</Text>
        </HStack>
      </VStack>
    </Box>
  );
};


export default HotDropDetail;