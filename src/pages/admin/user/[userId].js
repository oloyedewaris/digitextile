import React, { useContext, useEffect, useState } from 'react'
import { Box, Flex, Image, Skeleton, Text, useToast } from '@chakra-ui/react';
import LayoutView from '@/components/layout';
import { ChevronRightIcon } from '@chakra-ui/icons';
import Button from '@/components/button';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';
import Auth from '@/hoc/Auth';
import { GlobalContext } from '@/context/Provider';
import { approveCreatorApi, getUserApi, toggleActiveStateApi } from '@/apis/admin';
import avatar from '@/assets/images/avatar.png'

const User = () => {
  const router = useRouter()
  const toast = useToast()
  const userId = router.query.userId
  const { authState } = useContext(GlobalContext);
  const user = authState.user
  const { data, isError, error, isLoading, refetch, } = useQuery(["getUserApi", userId], () => getUserApi(userId));

  const [userData, setUserData] = useState(null)

  useEffect(() => {
    if (data?.data?.data)
      setUserData(data?.data?.data)
  }, [data?.data?.data])

  console.log('userData', userData)

  const { isLoading: toggling, mutate: toggleMutate } = useMutation(() => toggleActiveStateApi(userId), {
    onSuccess: (res) => {
      setUserData(res?.data?.data)
      toast({
        title: `User active state changes`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    },
    onError: (err) => {
      toast({
        title: `"Oops...`,
        description: `${err.response?.data?.message || 'Something went wrong, try again'}`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    },
  })

  const { isLoading: approving, mutate: approveUser } = useMutation(() => approveCreatorApi(userId), {
    onSuccess: (res) => {
      setUserData(res?.data?.data)
      toast({
        title: `User approved`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    },
    onError: (err) => {
      toast({
        title: `"Oops...`,
        description: `${err.response?.data?.message || 'Something went wrong, try again'}`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    },
  })


  return (
    <LayoutView>
      <Box px={{ base: '20px', md: '70px' }}>
        <Skeleton isLoaded={userData}>
          <Box mb={{ base: '40px', md: '90px' }} p={{ base: '30px', md: '70px' }} borderRadius={{ base: '12px', md: '24px' }} bg='white'>
            <Flex align={'center'} fontSize={{ base: '12px', md: '15px' }} mb={{ base: '14px', md: '28px' }} gap={{ base: '4px', md: '10px' }} color='rgba(28, 29, 44, 0.48)'>
              <Text>Home</Text>
              <ChevronRightIcon fontSize={{ base: 20, md: 25 }} />
              <Text color='#1C1D2C'>User</Text>
              <ChevronRightIcon fontSize={{ base: 20, md: 25 }} />
              <Text>{userData?.fullname}</Text>
            </Flex>
            <Flex direction={{ base: 'column', md: 'row' }} gap='35px'>
              <Box w={{ base: 'full', md: '60%' }}>
                <Image
                  borderRadius={{ base: 'md', md: 'xl' }}
                  bgPosition={'center'}
                  bgSize={"cover"}
                  w='full'
                  maxW='490px'
                  h={{ base: 'auto', md: "490px" }}
                  src={userData?.image || avatar.src}
                />
              </Box>
              <Box w={{ base: 'full', md: '40%' }}>
                <Flex gap='5px' align='center'>
                  <Text fontSize={{ base: '15px', md: '20px' }}>
                    <Text as='span' fontWeight={500}>Languages </Text>
                    {userData?.languages.length ? userData?.languages.map((language, i) => (
                      <Text key={i} as='span' color='#EF233C'>{language}, </Text>
                    )) : <Text>Not yet set</Text>}
                  </Text>
                </Flex>
                <Text fontSize={{ base: '20px', md: '28px' }} fontWeight={600} mt={{ base: '15px', md: '20px' }}>{userData?.fullname}</Text>
                <Text fontSize={{ base: '18px', md: '24px' }} fontWeight={500} mt={{ base: '13px', md: '8px' }}>{userData?.email}</Text>
                <Text my={{ base: '12px', md: '24px' }}> {userData?.address} </Text>
                <Text my={{ base: '12px', md: '24px' }}>
                  Email verification status:
                  {userData?.isVerified ? <Text as='span' color='#009900'> Verified</Text> : <Text as='span' color='#EF233C'> Not Verified</Text>}
                </Text>

                {userData?.isApproved ? (
                  <Text color={'#009900'} fontWeight={500} mt={{ base: '17px', md: '35px' }} textAlign={'center'}>User Approved</Text>
                ) : (
                  <Button
                    isLoading={approving}
                    disabled={approving}
                    onClick={approveUser}
                    borderRadius='full' bg='#009900'
                    w='full' h='55px' mt={{ base: '17px', md: '35px' }} color='white'
                  >Approve User</Button>
                )}

                {userData?.isActive ? (
                  <Button
                    onClick={toggleMutate}
                    isLoading={toggling}
                    disabled={toggling}
                    borderRadius='full' bg='#EF233C'
                    w='full' h='55px' mt='55px' color='white'
                  >Block user</Button>
                ) : (
                  <Button
                    onClick={toggleMutate}
                    isLoading={toggling}
                    disabled={toggling}
                    borderRadius='full' bg='#2B2D42'
                    w='full' h='55px' mt='55px' color='white'
                  >Unblock user</Button>
                )}

              </Box>
            </Flex>

            {userData?.business?.cacNumber && (
              <Box mx='auto'>
                <Text fontSize={{ base: '18px', md: '24px' }} fontWeight={500} mt={{ base: '15px', md: '20px' }}>Business Details</Text>
                <Text my={{ base: '7px', md: '10px' }}><strong>Business Name:</strong> {userData?.business?.name} </Text>
                <Text my={{ base: '7px', md: '10px' }}><strong>Business Address:</strong> {userData?.business?.address} </Text>
                <Text my={{ base: '7px', md: '10px' }}><strong>CAC Number:</strong> {userData?.business?.cacNumber}</Text>
                <Text my={{ base: '7px', md: '10px' }}><strong>CAC certificate:</strong> </Text>
                <Image
                  mt='10px'
                  h={{ base: '250px', md: '390px' }}
                  w={{ base: '250px', md: '390px' }}
                  borderRadius={'4px'}
                  src={userData?.business?.cacDocument}
                />
              </Box>
            )}
          </Box>
        </Skeleton>
      </Box>
    </LayoutView>
  )
}

export default Auth(User)