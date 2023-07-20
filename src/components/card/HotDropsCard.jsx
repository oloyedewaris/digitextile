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
      p={{ base: "12px", md: '24px' }}
      pb={{ base: '30px', md: '40px' }}
      mx={'auto'}
      w='100%'
      h={{ base: '300px', md: '455px' }}
      bgImage={image}
      borderRadius={{ base: '8px', md: '16px' }}
      overflow='hidden'
      as={motion.div}
      maxWidth={"428px"}
      minWidth={{ base: '250px', md: "328px" }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClickCard}
      direction='column'
      align='stretch'
      justify={'space-between'}
    >
      <Image src={person} h={{ base: '40px', md: '63px' }} w={{ base: '40px', md: '63px' }} />
      <Text fontSize={{ base: '22px', md: '28px' }} fontWeight='700' color='white'>{title}</Text>
    </Flex>
  );
};


export default HotDropsCard;