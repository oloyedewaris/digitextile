import { Box, Divider, Flex, Image, Input, InputGroup, InputLeftAddon, Skeleton, Text, VStack } from '@chakra-ui/react'
import React, { useContext } from 'react';
import FormSelect from '@/components/form/FromSelect';
import searchIcon from '@/assets/images/search-icon.png'
import Link from 'next/link';
import { useQuery } from 'react-query';
import EmptyState from '@/components/empty-state';
import { GlobalContext } from '@/context/Provider';
import { getAllUsersApi } from '@/apis/admin';

import avatar from '@/assets/images/avatar.png'


const Listings = () => {
  const { authState: { user } } = useContext(GlobalContext)
  const { data, isError, error, isLoading, refetch, } = useQuery(["getAllUsersApi"], getAllUsersApi);
  const users = data?.data?.data;

  return (
    <Box>
      <Flex py={{ base: '9px', md: '27px' }} px={{ base: '10px', md: '40px' }} justify={'space-between'} align={'center'}>
        <Text fontSize={{ base: '20px', md: '32px' }} fontWeight={700}>All Users</Text>
      </Flex>
      <Divider w='full' />
      <Box p={{ base: '20px', md: '40px' }}>
        {/* <InputGroup border='1px' borderRadius={'full'} w='full' pr='15px'>
          <Input
            _focus={{ border: 'none', outline: 'none' }}
            border={'none'}
            placeholder="Search your listings"
          // w='full'
          />
          <InputLeftAddon
            bg={'transparent'}
            p={"0px"}
            border={"none"}
          >
            <Image alt='next_image' src={searchIcon.src} />
          </InputLeftAddon>
        </InputGroup>

        <Flex my={{ base: '20px', md: '40px' }} gap={{ base: '10px' }} align={{ base: 'flex-start', md: 'center' }} direction={{ base: 'column', md: 'row' }}>
          <FormSelect
            maxW='150px'
            bg='#E4DFDA'
            placeholder={'Account type'}
            options={['All', 'Creator', 'Consumer']}
          />
          <FormSelect
            maxW='150px'
            bg='#E4DFDA'
            placeholder={'Status'}
            options={['All', 'Approved', 'Not approved']}
          />
        </Flex> */}

        <Skeleton isLoaded={!isLoading}>
          <VStack
            mt={{ base: '10px', md: '20px' }}
            px={{ base: '20px', md: '40px' }}
            py={{ base: '15px', md: '30px' }}
            align={'stretch'} shadow='md'
            borderRadius={{ base: '8px', md: '16px' }}
            spacing={{ base: '20px', md: '32px' }} border='1px solid #9F9898'
          >
            {(users || []).map(user => (
              <Link href={`/admin/user/${user?._id}`}>
                <Flex justify='space-between' align='center'>
                  <Flex gap={{ base: '8px', md: '16px' }} align={'center'} w='30%'>
                    {user?.image ? (
                      <Image
                        src={user?.image}
                        h={{ base: '25px', md: '40px' }}
                        w={{ base: '25px', md: '40px' }}
                        borderRadius={'full'}
                      />
                    ) : (
                      <Image
                        src={avatar.src}
                        h={{ base: '25px', md: '40px' }}
                        w={{ base: '25px', md: '40px' }}
                        borderRadius={'full'}
                      />
                    )}
                    <VStack align={'stretch'} spacing={{ base: '0px', md: '4px' }}>
                      <Text noOfLines={1} fontWeight={500}>{user?.fullname}</Text>
                      <Text noOfLines={1} fontWeight={500} fontSize={'12px'}>{user?.address}</Text>
                    </VStack>
                  </Flex>
                  <Text w='50%' noOfLines={{ base: 1, md: 2 }}>{user?.email}</Text>
                  <Text textDecoration={'underline'} color='#3F51B5' fontSize={{ base: '12px', md: '16px' }} fontWeight={500}>
                    {user?.role}
                  </Text>
                </Flex>
              </Link>
            ))}
          </VStack>
          {!users?.length && (
            <EmptyState text={'No user listing yet'} />
          )}
        </Skeleton>
      </Box>

    </Box>
  )
}

export default Listings