import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";

const Card = ({
  image,
  title,
  subTitle,
  subTitle2,
  onClick
}) => {

  return (
    <Box
      mx={'auto'}
      w='100%'
      maxWidth={"463px"}
      cursor={"pointer"}
      borderRadius='xl'
      bgSize={"cover"}
      outline={"0.5px solid gray"}
      p={"20px"}
      h={{ base: 'auto', md: "330px" }}
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'stretch'}
      flexDirection={'column'}
      onClick={onClick}
    >
      <Box>
        {image && <Image src={image} />}
      </Box>
      <Box>
        <Heading>{title}</Heading>
        <Text>{subTitle}</Text>
        <Text>{subTitle2}</Text>
      </Box>
    </Box>
  );
};


export default Card