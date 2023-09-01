import { Box, Divider, Flex, HStack, Image, Input, InputGroup, InputRightAddon, SimpleGrid, Skeleton, Text, VStack } from '@chakra-ui/react'
import React, { useContext } from 'react';
import Button from '@/components/button';
import { BiPlus } from 'react-icons/bi';
import FormSelect from '@/components/form/FromSelect';
import searchIcon from '@/assets/images/search-icon.png'
import MyListingCard from '@/components/card/MyListingCard';
import Link from 'next/link';
import { useQuery } from 'react-query';
import EmptyState from '@/components/empty-state';
import { GlobalContext } from '@/context/Provider';
import { extended } from '@/constant/messages';
import { CheckIcon } from '@chakra-ui/icons';
import avatar from '@/assets/images/avatar.png'
import ReactTimeAgo from 'react-time-ago';

const Conversations = ({ handleSelectConv, conversationsData }) => {

  return (
    <Box>
      <Flex py={{ base: '5px', md: '10px' }} px={{ base: '7px', md: '10px' }} justify={'space-between'} align={'center'}>
        <Text fontSize={{ base: '10px', md: '22px' }} fontWeight={600}>Conversations</Text>

        {/* <InputGroup border='1px' borderRadius={'full'} maxW='100px' pl='15px'>
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
        </InputGroup> */}
      </Flex>
      <Divider w='full' />

      <VStack spacing={0} divider={<Divider />} align={'stretch'}>
        {conversationsData?.map(cnvs => (
          <Flex
            key={cnvs?._id}
            cursor={'pointer'} align={'center'}
            justify={'space-between'}
            px='8px' py='10px' w='full'
            onClick={() => handleSelectConv(cnvs)}
          >
            <Flex gap='10px' align={'center'}>
              <Image w='40px' h='40px' borderRadius={'full'} src={cnvs?.creator?.image || avatar.src} />
              <VStack align={'stretch'} w='70%'>
                <Text color={'#1C1D2C'} fontSize={'16px'} fontWeight={600}>
                  {cnvs?.creator?.fullname}
                </Text>
                <Text color={'#A5A1A1'} fontSize={'12px'} fontWeight={400} noOfLines={1}>
                  {cnvs?.lastMessageSent?.content || cnvs?.lastMessageSent}
                </Text>
              </VStack>
            </Flex>
            <VStack gap='3px' justify={'center'}>
              <Text color={'#2B2D42'} fontSize={'10px'} fontWeight={400}>
                <ReactTimeAgo date={cnvs?.updatedAt} locale="en-US" timeStyle="round-minute" />
              </Text>
              {/* <CheckIcon color={cnvs?.read ? '#A5A1A1' : '#6197FF'} /> */}
            </VStack>
          </Flex>
        ))}
      </VStack>
      {!conversationsData?.length && <EmptyState height={'50vh'} text={'No conversation yet, message a creator to start one'} />}

    </Box>
  )
}

export default Conversations