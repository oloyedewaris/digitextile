import { Box, Divider, Flex, Image, SimpleGrid, Skeleton, Text, VStack } from '@chakra-ui/react'
import React, { useContext } from 'react';
import avatar from '@/assets/images/avatar.png'
import FormSelect from '@/components/form/FromSelect';
import Link from 'next/link';
import { GlobalContext } from '@/context/Provider';
import { useQuery } from 'react-query';
import { getAllUsersApi } from '@/apis/admin';

const AdminDashboard = () => {
  const { authState: { user } } = useContext(GlobalContext)
  const { data, isError, error, isLoading, refetch, } = useQuery(["getAllUsersApi"], getAllUsersApi);
  const users = data?.data?.data;

  const verifiedUsers = users?.filter(user => user.isVerified)
  const blockedUsers = users?.filter(user => !user.isActive)

  return (
    <Box>
      <Flex py={{ base: '9px', md: '27px' }} px={{ base: '10px', md: '40px' }} justify={'space-between'} align={'center'}>
        <Text fontSize={{ base: '20px', md: '32px' }} fontWeight={700}>Admin Dashboard</Text>
        <Text color='#1C1D2C' fontSize={{ base: '12px', md: '16px' }} fontWeight={500}>Welcome, {user?.fullname}</Text>
      </Flex>
      <Divider w='full' />

      <Skeleton isLoaded={data?.data?.data?.map}>
        <Box p={{ base: '15px', md: '40px' }}>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap='15px' align={'center'}>
            <Flex
              direction={'column'}
              align={'stretch'}
              justify={'space-between'}
              borderRadius={'16px'}
              bg='#F4FFF7' h='150px'
              p='24px' w='full'
              border='1px solid #E4DFDA'
            >
              <Flex justify={'space-between'} align={'center'} w='full'>
                <Text color='#1C1D2C' fontSize={'20px'} fontWeight={500}>All Users</Text>
                <Text fontSize={'12px'} fontWeight={500} color='#08AD36'>+12%</Text>
              </Flex>
              <Text fontSize={'32px'} fontWeight={500} color='#1C1D2C'>{users?.length}</Text>
            </Flex>
            <Flex
              direction={'column'}
              align={'stretch'}
              justify={'space-between'}
              borderRadius={'16px'}
              bg='#FFF4F4' h='150px'
              p='24px' w='full'
              border='1px solid #E4DFDA'
            >
              <Flex justify={'space-between'} align={'center'} w='full'>
                <Text color='#1C1D2C' fontSize={'20px'} fontWeight={500}>Blocked Users</Text>
                <Text fontSize={'12px'} fontWeight={500} color='#EF233C'>+12%</Text>
              </Flex>
              <Text fontSize={'32px'} fontWeight={500} color='#1C1D2C'>{blockedUsers?.length}</Text>
            </Flex>
            <Flex
              direction={'column'}
              align={'stretch'}
              justify={'space-between'}
              borderRadius={'16px'}
              bg='#F4FFF7' h='150px'
              p='24px' w='full'
              border='1px solid #E4DFDA'
            >
              <Flex justify={'space-between'} align={'center'} w='full'>
                <Text color='#1C1D2C' fontSize={'20px'} fontWeight={500}>Verified Users</Text>
                <Text fontSize={'12px'} fontWeight={500} color='#08AD36'>+12%</Text>
              </Flex>
              <Text fontSize={'32px'} fontWeight={500} color='#1C1D2C'>{verifiedUsers?.length}</Text>
            </Flex>
          </SimpleGrid>

          <Text mt={{ base: '20px', md: '40px' }} color={'#1C1D2C'} fontSize={'24px'} fontWeight={600}>All Users</Text>
          <Flex my={{ base: '20px', md: '40px' }} gap={{ base: '10px' }} align={{ base: 'flex-start', md: 'center' }} direction={{ base: 'column', md: 'row' }}>
            <FormSelect
              bg='#E4DFDA'
              placeholder={'Account type'}
              options={['All', 'Creator', 'Consumer']}
            />
            <FormSelect
              bg='#E4DFDA'
              placeholder={'Status'}
              options={['All', 'Approved', 'Not approved']}
            />
          </Flex>

          <Flex justify='space-between' align='center' bg='#F0FFEC' borderRadius={'8px'} px='30px' py='16px'>
            <Text fontSize={{ base: '12px', md: '16px' }} fontWeight={600} color='#1C1D2C'>User</Text>
            <Text fontSize={{ base: '12px', md: '16px' }} fontWeight={600} color='#1C1D2C'>Email</Text>
            <Text fontSize={{ base: '12px', md: '16px' }} fontWeight={600} color='#1C1D2C'>Role</Text>
          </Flex>
          <VStack
            mt={{ base: '20px', md: '40px' }}
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
        </Box>
      </Skeleton>
    </Box>
  )
}

export default AdminDashboard