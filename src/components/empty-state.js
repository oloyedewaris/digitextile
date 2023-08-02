import { Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import empty from "@/assets/svgs/empty-icon.svg";

const EmptyState = ({ text, height }) => {
  return (
    <VStack
      h={height || "450px"}
      borderRadius="5px"
      w="full"
      justify="center"
      bg="#ffffff"
      my="13px"
      mb="24px"
    >
      <VStack>
        <Image
          w="152px"
          h="118px"
          src={empty.src}
          alt="notification empty state"
        />

        <Text
          pt={4}
          fontWeight="600"
          color="#606060"
          fontSize="16px"
          textAlign="center"
        >
          {text || 'No data yet'}
        </Text>
      </VStack>
    </VStack>
  );
};

export default EmptyState;
