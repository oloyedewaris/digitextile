import React, { useContext } from 'react'
import { Drawer, DrawerOverlay, DrawerContent, DrawerBody, DrawerCloseButton, VStack, Box, Image, Text, Flex, Badge } from '@chakra-ui/react';
import { BiEnvelope, BiHeart, BiLogOut, BiMessage, BiStore } from 'react-icons/bi';
import Link from 'next/link';
import Button from '../button';
import { useRouter } from 'next/router';
import avatar from '@/assets/images/avatar.png'
import { GlobalContext } from '@/context/Provider';
import { logout } from '@/context/actions/auth';
import { RiAdminFill } from 'react-icons/ri';
import { useQuery } from 'react-query';
import { getMessageCount } from '@/apis/messaging';

const DrawerComp = ({ modal }) => {
  const router = useRouter();
  const { authState, authDispatch } = useContext(GlobalContext);
  const loggedIn = authState.isAuthenticated;


  const messagesCountQuery = useQuery(
    ["getMessageCount"],
    () => getMessageCount(),
    {
      enabled: loggedIn,
      refetchInterval: 30000,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
      staleTime: Infinity,
      // retry: true,
      // retryDelay: 1000,
      // retryOnMount: true,
    }
  );


  const handleLogout = () => {
    logout()(authDispatch)
    modal.onClose()
    router.push('/');
  };


  return (
    <Drawer scrollBehavior='inside' isOpen={modal.isOpen} onClose={modal.onClose}>
      <DrawerOverlay />
      <DrawerContent >
        <DrawerCloseButton />
        <DrawerBody py='40px'>
          {loggedIn ? (
            <Flex w='full' h='full' direction={'column'} justify={'space-between'} px='10px' py='40px'>
              {authState?.user?.role === 'admin' ? (
                <VStack w='full' align='flex-start' spacing={'20px'}>
                  <Link href='/profile'>
                    <Flex cursor='pointer' px='6px' py='3px' bg='rgba(255, 255, 255, 0.4)' gap='8px' align='center'>
                      <Image src={authState.user?.image || avatar.src} h='30px' w='30px' borderRadius={'full'} />
                      <Text fontWeight={500}>Profile</Text>
                    </Flex>
                  </Link>
                  <Link href={'/admin'}>
                    <Flex cursor='pointer' px='6px' py='3px' bg='rgba(255, 255, 255, 0.4)' gap='8px' align='center'>
                      <RiAdminFill size={25} />
                      <Text fontWeight={500}>Profile</Text>
                    </Flex>
                  </Link>
                </VStack>
              ) : authState?.user?.role === 'creator' ? (
                <VStack w='full' align='flex-start' spacing={'20px'}>
                  <Link href='/profile'>
                    <Flex cursor='pointer' px='6px' py='3px' bg='rgba(255, 255, 255, 0.4)' gap='8px' align='center'>
                      <Image src={authState.user?.image || avatar.src} h='30px' w='30px' borderRadius={'full'} />
                      <Text fontWeight={500}>Profile</Text>
                    </Flex>
                  </Link>
                  <Link href={'/messages'}>
                    <Flex cursor='pointer' px='6px' py='3px' bg='rgba(255, 255, 255, 0.4)' gap='8px' align='center'>
                      <Flex cursor='pointer' direction={'row'} align='center' gap='5px'>
                        <BiEnvelope style={{ borderRadius: '10px' }} size={25} />
                        <Badge variant='outline' colorScheme='red'>
                          {Boolean(messagesCountQuery?.data?.data?.data) && messagesCountQuery?.data?.data?.data}
                        </Badge>
                      </Flex>
                      <Text fontWeight={500}>Messages</Text>
                    </Flex>
                  </Link>
                  <Link href={'/store'}>
                    <Flex cursor='pointer' px='6px' py='3px' bg='rgba(255, 255, 255, 0.4)' gap='8px' align='center'>
                      <BiStore size={25} />
                      <Text fontWeight={500}>Store</Text>
                    </Flex>
                  </Link>
                </VStack>
              ) : (
                <VStack w='full' align='flex-start' spacing={'20px'}>
                  <Link href='/profile'>
                    <Flex cursor='pointer' px='6px' py='3px' bg='rgba(255, 255, 255, 0.4)' gap='8px' align='center'>
                      <Image src={authState.user?.image || avatar.src} h='30px' w='30px' borderRadius={'full'} />
                      <Text fontWeight={500}>Profile</Text>
                    </Flex>
                  </Link>
                  <Link href={'/messages'}>
                    <Flex cursor='pointer' px='6px' py='3px' bg='rgba(255, 255, 255, 0.4)' gap='8px' align='center'>
                      <Flex cursor='pointer' direction={'row'} align='center' gap='5px'>
                        <BiEnvelope style={{ borderRadius: '10px' }} size={25} />
                        {messagesCountQuery?.data?.data?.data && (
                          <Badge variant='outline' colorScheme='red'>
                            {messagesCountQuery?.data?.data?.data}
                          </Badge>
                        )}
                      </Flex>
                      <Text fontWeight={500}>Messages</Text>
                    </Flex>
                  </Link>
                  <Link href='/explore/favourites'>
                    <Flex cursor='pointer' px='6px' py='3px' bg='rgba(255, 255, 255, 0.4)' gap='8px' align='center'>
                      <BiHeart size={25} />
                      <Text fontWeight={500}>Favourites</Text>
                    </Flex>
                  </Link>
                </VStack>
              )}

              <Flex onClick={handleLogout} cursor='pointer' px='6px' py='3px' bg='rgba(255, 255, 255, 0.4)' gap='8px' align='center'>
                <BiLogOut color='red' fontSize={25} />
                <Text fontWeight={500}>Log-out</Text>
              </Flex>
            </Flex>
          ) : (
            <VStack spacing={'20px'} px='20px' py='40px'>
              <Link href='/auth/login'>
                <Button
                  borderRadius='full'
                  color='#2B2D42'
                  bg='transparent'
                >Sign In</Button>
              </Link>

              <Button
                onClick={() => router.push('/auth')}
                borderRadius='full'
                color='white'
                bg='#2B2D42' border='1px solid #2B2D42'
              >Create Account</Button>
            </VStack>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default DrawerComp