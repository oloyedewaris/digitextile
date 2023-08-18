import { Box, Divider, Flex, HStack, Image, Input, InputGroup, InputRightAddon, SimpleGrid, Skeleton, Text, VStack } from '@chakra-ui/react'
import React, { useContext } from 'react';
import Button from '@/components/button';
import { BiPlus } from 'react-icons/bi';
import FormSelect from '@/components/form/FromSelect';
import searchIcon from '@/assets/images/search-icon.png'
import MyListingCard from '@/components/card/MyListingCard';
import Link from 'next/link';
import { useQuery } from 'react-query';
import { getUserProductApi } from '@/apis/user';
import EmptyState from '@/components/empty-state';
import { GlobalContext } from '@/context/Provider';
import { extended } from '@/constant/messages';
import { CheckIcon } from '@chakra-ui/icons';

const Messages = () => {
  const { authState: { user } } = useContext(GlobalContext)
  const { data, isError, error, isLoading, refetch, } = useQuery(["getUserProductApi"], getUserProductApi);

  return (
    <Box>
      <Flex py={{ base: '9px', md: '27px' }} px={{ base: '10px', md: '40px' }} justify={'space-between'} align={'center'}>
        <Text fontSize={{ base: '20px', md: '32px' }} fontWeight={700}>All Messages</Text>

        <InputGroup border='1px' borderRadius={'full'} w='200px' pl='15px'>
          <InputRightAddon
            bg={'transparent'}
            p={"0px"}
            border={"none"}
          >
            <Image alt='next_image' src={searchIcon.src} />
          </InputRightAddon>
          <Input
            _focus={{ border: 'none', outline: 'none' }}
            border={'none'}
            placeholder="Search messages"
          // w='full'
          />
        </InputGroup>
      </Flex>
      <Divider w='full' />

      <VStack spacing={0} divider={<Divider />}>
        {extended.map(msg => (
          <Flex _hover={{ bg: '#E1E9EC' }} cursor={'pointer'} align={'center'} justify={'space-between'} px='28px' py='30px'>
            <Flex justify={'space-between'} gap='8px' align={'center'} w='60%'>
              <Image src={msg?.person} />
              <VStack align={'stretch'}>
                <Text color={'#1C1D2C'} fontSize={'16px'} fontWeight={600}>
                  {msg?.name}
                </Text>
                <Text color={'#A5A1A1'} fontSize={'12px'} fontWeight={400} noOfLines={1}>
                  {msg?.message}
                </Text>
              </VStack>
            </Flex>
            <VStack gap='3px' justify={'center'}>
              <Text color={'#2B2D42'} fontSize={'10px'} fontWeight={400}>
                {msg?.time}
              </Text>
              <CheckIcon color={msg?.read ? '#A5A1A1' : '#6197FF'} />
            </VStack>
          </Flex>
        ))}
      </VStack>

    </Box>
  )
}

export default Messages