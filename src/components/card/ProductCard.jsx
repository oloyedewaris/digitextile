import React from "react";
import {
  Box,
  HStack,
  VStack,
  Image,
  Text,
  Center,
} from "@chakra-ui/react";
import { RiArrowRightLine } from "react-icons/ri";
import { motion } from "framer-motion";
import ImageGallery from 'react-image-gallery';
import { BiHeart } from "react-icons/bi";
import Link from "next/link";

const ProductCard = ({
  title,
  images,
  subTitle,
  onClickCard,
  persons,
  price,
  id
}) => {
  const imagesToUse = images.map(image => ({
    original: image,
    thumbnail: image,
  }));


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
      <HStack p='8px' position='relative'>
        {persons.map((person, i) => (
          <Box key={i} position='relative' left={`-${i * 15}px`}>
            <Image w={{ base: '28px', md: '48px' }} h={{ base: '28px', md: '48px' }} src={person} />
          </Box>
        ))}
      </HStack>
      <Box minH={{ base: '200px', md: "280px" }}>
        <ImageGallery
          renderItem={(image) => (
            <Image
              borderRadius={{ base: 'sm', md: 'md' }}
              bgPosition={'center'}
              bgSize={"cover"}
              w='full'
              maxW='290px'
              h='auto'
              maxH={{ base: '200px', md: "280px" }}
              minH={{ base: '200px', md: "280px" }}
              src={image.original}
            />
          )}
          showThumbnails={false}
          showNav={false}
          showPlayButton={false}
          showFullscreenButton={false}
          showBullets={true}
          items={imagesToUse}
        />
      </Box>

      <VStack mt={"8px"} align={"start"}>
        <HStack justify={"space-between"} alignItems={'center'} w={"100%"}>
          <Text fontSize={{ base: '13px', md: '20px' }} fontWeight='500' noOfLines={1}>{title}</Text>
          <BiHeart size={20} />
        </HStack>
        <Text fontSize={{ base: '10px', md: '12px' }}>{subTitle}</Text>
        <HStack justify={"space-between"} w={"100%"} mt='12px' fontSize={{ base: '10px', md: '14px' }} fontWeight={500}>
          <Text fontSize={{ base: '8px', md: '14px' }}><span style={{ color: '#C4C4C4' }}>Price:</span> {price}</Text>
          <Link href={`/product/${id}`}>
            <Center gap='8px'>
              <Text fontSize={{ base: '8px', md: '14px' }} fontWeight='500'>View product</Text>
              <RiArrowRightLine size='18' />
            </Center>
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
};


export default ProductCard;