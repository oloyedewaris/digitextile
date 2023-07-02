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

const ProductCard = ({
  title,
  images,
  subTitle,
  onClickCard,
  persons,
  price
}) => {
  const imagesToUse = images.map(image => ({
    original: image,
    thumbnail: image,
  }));


  return (
    <Box
      bg='white'
      p='16px'
      mx={'auto'}
      w='100%'
      borderRadius='16px'
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
            <Image src={person} />
          </Box>
        ))}
      </HStack>
      <ImageGallery
        renderItem={(image) => (
          <Image
            borderRadius='xl'
            bgPosition={'center'}
            bgSize={"cover"}
            w='full'
            maxW='290px'
            h={{ base: 'auto', md: "240px" }}
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

      <VStack mt={"8px"} align={"start"}>
        <HStack justify={"space-between"} alignItems={'center'} w={"100%"}>
          <Text fontSize='20px' fontWeight='500'>{title}</Text>
          <BiHeart size={20} />
        </HStack>
        <Text fontSize='12px'>{subTitle}</Text>
        <HStack justify={"space-between"} w={"100%"} mt='12px' fontSize='14px' fontWeight={500}>
          <Text><span style={{ color: '#C4C4C4' }}>Price:</span> {price}</Text>
          <Center gap='8px'>
            <Text fontWeight='500'>More like this</Text>
            <RiArrowRightLine size='24' />
          </Center>
        </HStack>
      </VStack>
    </Box>
  );
};


export default ProductCard;