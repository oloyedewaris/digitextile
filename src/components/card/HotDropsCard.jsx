import React from "react";
import {
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const HotDropsCard = ({
  title,
  image,
  onClickCard,
  person,
}) => {

  return (
    <Flex
      bg='white'
      p='24px'
      pb='40px'
      mx={'auto'}
      w='100%'
      h='455px'
      bgImage={image}
      borderRadius='16px'
      overflow='hidden'
      as={motion.div}
      maxWidth={"428px"}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClickCard}
      direction='column'
      align='stretch'
      justify={'space-between'}
    >
      <Image src={person} h='63px' w='63px' />
      <Text fontSize='28px' fontWeight='700' color='white'>{title}</Text>
    </Flex>
  );
};


export default HotDropsCard;