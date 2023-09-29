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
import avatar from '@/assets/images/avatar.png'
import edit from '@/assets/svgs/edit-forum.svg'

const HotDropDetail = ({
  isPending,
  title,
  image,
  subTitle,
  onClickCard,
  time,
  id,
  category,
  timeToRead,
  user,
  person,
  status
}) => {

  return (
    <Box
      bg='white' cursor='pointer'
      p={{ base: '8px', md: '16px' }}
      mx={'auto'} w='100%'
      borderRadius={{ base: '8px', md: '16px' }}
      overflow='hidden'
      as={motion.div}
      maxWidth={"322px"}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <Box
        p='24px'
        borderRadius={{ base: 'sm', md: 'md' }}
        bgPosition={'center'}
        bgSize={"cover"} bgImage={image}
        w='full' maxW='290px' h='auto'
        maxH={{ base: '200px', md: "280px" }}
        minH={{ base: '200px', md: "280px" }}
      >
        {isPending && (
          <Link href={`/edit-hot-drop/${id}`}>
            <Center w='70px' bg='#1C1D2C' border={'0.812px solid #2B2D42'} px='11px' py='5px' borderRadius={'full'} gap='8px'>
              <Image src={edit.src} />
              <Text color='#fff'>Edit</Text>
            </Center>
          </Link>
        )}
        {status && (
          <Center w='100px' bg='#1C1D2C' border={'0.812px solid #2B2D42'} px='11px' py='5px' borderRadius={'full'} gap='8px'>
            <Text color='#fff' textTransform={'capitalize'}>{status}</Text>
          </Center>
        )}
      </Box>

      <VStack mt={"8px"} align={"start"} onClick={onClickCard}>
        <HStack alignItems={'center'} w={"100%"} spacing={{ base: '6px', md: '14px' }} divider={<Box w='4px' h='4px' borderRadius={'full'} bg='#1565C0' />}>
          <Text fontSize={{ base: '13px', md: '18px' }} color={'#1565C0'} noOfLines={1}>{category}</Text>
          <Text fontSize={{ base: '13px', md: '18px' }} color={'#1565C0'} noOfLines={1}>{timeToRead || 0} min read</Text>
        </HStack>
        <Text fontSize={{ base: '12px', md: '20px' }} fontWeight='500' noOfLines={1}>{title}</Text>
        <Text fontSize={{ base: '15px', md: '22px' }} color='#C4C4C4' noOfLines={3}>{subTitle}</Text>
        <HStack alignItems={'center'} w={"100%"} spacing={{ base: '6px', md: '14px' }} divider={<Box w='4px' h='4px' borderRadius={'full'} bg='#4D515E' />}>
          <Flex justify={'center'} align={'center'} gap={{ base: '6px', md: '14px' }}>
            <Image h={{ base: '20px', md: '40px' }} w={{ base: '20px', md: '40px' }} borderRadius='full' src={person || avatar.src} />
            <Text fontSize={{ base: '10px', md: '14px' }} color={'#4D515E'} noOfLines={1}>{user}</Text>
          </Flex >
          <Text fontSize={{ base: '10px', md: '14px' }} color={'#4D515E'} noOfLines={1}>{time}</Text>
        </HStack >
      </VStack >
    </Box >
  );
};


export default HotDropDetail;