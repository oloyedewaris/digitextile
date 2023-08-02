import React, { useContext } from 'react'
import { Drawer, DrawerOverlay, DrawerContent, DrawerBody, DrawerCloseButton, VStack, Box, Image, Text, Flex } from '@chakra-ui/react';
import { BiBell, BiHeart, BiMessage, BiPlus, BiStore } from 'react-icons/bi';
import Link from 'next/link';
import Button from '../button';
import { useRouter } from 'next/router';
import avatar from '@/assets/images/avatar.png'
import { GlobalContext } from '@/context/Provider';

const DrawerComp = ({ modal }) => {
  const router = useRouter();
  const { authState } = useContext(GlobalContext)
  const loggedIn = authState.isAuthenticated

  return (
    <Drawer scrollBehavior='inside' isOpen={modal.isOpen} onClose={modal.onClose}>
      <DrawerOverlay />
      <DrawerContent >
        <DrawerCloseButton />
        <DrawerBody py='40px' >
          {loggedIn ? (
            <VStack w='full' align='flex-start' spacing={'20px'} px='20px' py='40px'>
              <Link href={'/profile'}>
                <Flex cursor='pointer' px='6px' py='3px' bg='rgba(255, 255, 255, 0.4)' gap='8px' align='center'>
                  <Image src={authState.user?.image || avatar.src} h='30px' w='30px' borderRadius={'full'} />
                  <Text fontWeight={500}>Profile</Text>
                </Flex>
              </Link>
              <Link href={'/'}>
                <Flex cursor='pointer' px='6px' py='3px' bg='rgba(255, 255, 255, 0.4)' gap='8px' align='center'>
                  <BiMessage size={25} />
                  <Text fontWeight={500}>Messages</Text>
                </Flex>
              </Link>
              {authState?.user?.role === 'creator' && (
                <Link href={'/store'}>
                  <Flex cursor='pointer' px='6px' py='3px' bg='rgba(255, 255, 255, 0.4)' gap='8px' align='center'>
                    <BiStore fontSize={25} />
                    <Text fontWeight={500}>Store</Text>
                  </Flex>
                </Link>
              )}
              {authState?.user?.role === 'creator' && (
                <Link href={'/create-listing'}>
                  <Flex cursor='pointer' px='6px' py='3px' bg='rgba(255, 255, 255, 0.4)' gap='8px' align='center'>
                    <BiPlus fontSize={25} />
                    <Text fontWeight={500}>Add Listing</Text>
                  </Flex>
                </Link>
              )}
              <Link href={'/'}>
                <Flex cursor='pointer' px='6px' py='3px' bg='rgba(255, 255, 255, 0.4)' gap='8px' align='center'>
                  <BiHeart size={25} />
                  <Text fontWeight={500}>Favourites</Text>
                </Flex>
              </Link>
            </VStack>
          ) : (
            <VStack spacing={'20px'} px='20px' py='40px'>
              <Link href='/auth/login'>
                <Button
                  borderRadius='full'
                  color='#2B2D42'
                  bg='transparent'
                >Sign In</Button>
              </Link>
              {/* <Box cursor='pointer'>
              <BiHeart size={25} />
            </Box> */}

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