import React from 'react'
import { Drawer, DrawerOverlay, DrawerContent, DrawerBody, DrawerCloseButton, VStack, Box } from '@chakra-ui/react';
import { BiHeart } from 'react-icons/bi';
import Link from 'next/link';
import Button from '../button';
import { useRouter } from 'next/router';

const DrawerComp = ({ modal }) => {
  const router = useRouter();

  return (
    <Drawer scrollBehavior='inside' isOpen={modal.isOpen} onClose={modal.onClose}>
      <DrawerOverlay />
      <DrawerContent >
        <DrawerCloseButton />
        <DrawerBody py='40px' >
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
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default DrawerComp