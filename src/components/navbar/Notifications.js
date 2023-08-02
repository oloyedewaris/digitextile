import React, { useContext } from 'react'
import { Flex, Image, Text, MenuList, Menu, MenuButton, MenuItem, Box, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaSignOutAlt, FaCaretDown, FaUser } from 'react-icons/fa';
import { RiSettings4Fill } from 'react-icons/ri';
import { BiBell, BiMessageDetail } from 'react-icons/bi';
import { motion } from 'framer-motion';
import { GlobalContext } from '@/context/Provider';
import { logout } from '@/context/actions/auth';
import avatar from '@/assets/images/avatar.png'

const Notifications = () => {
  const { authState, authDispatch } = useContext(GlobalContext)
  const router = useRouter();

  const handleSettings = () => {
    router.push('/settings');
  };
  const handleLogout = () => {
    logout()(authDispatch)
    router.push('/');
  };

  return (
    <Menu h="fit-content">
      <MenuButton color='white' variant={'link'} rounded={'full'} cursor={'pointer'} alignItems='center'>
        <Flex gap={'8px'} as={motion.div} align={'center'} justifyContent={'center'} cursor={'pointer'}
          whiletap={{ scale: 0.9 }} whilehover={{ scale: 1.1 }}
        >
          <Box cursor='pointer'>
            <BiBell color='#2B2D42' fontSize={25} />
          </Box>
        </Flex>
      </MenuButton>
      <MenuList style={{ height: 'fit-content' }} py='22px' px='18px'>
        <MenuItem>
          <Text color='#1C1D2C' fontWeight={500} fontSize={{ base: '18px', md: '24px' }}>Notifications</Text>
        </MenuItem>
        <MenuItem>
          <Link href='/settings'>
            <Flex gap={{ base: 2, md: 3 }} align='center' mb='15px' onClick={handleSettings}>
              <Image h={{ base: '30px', md: '45px' }} w={{ base: '30px', md: '45px' }} borderRadius={'full'} src={avatar.src} />
              <VStack align={'stretch'} >
                <Text style={{ color: '#1C1D2C', fontWeight: '400' }}>Congue sed id libero vivamus.</Text>
                <Text style={{ color: '#C4C4C4', fontWeight: '400' }}>March 30, 2023</Text>
              </VStack>
            </Flex>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href='/settings'>
            <Flex gap={{ base: 2, md: 3 }} align='center' mb='15px' onClick={handleSettings}>
              <Image h={{ base: '30px', md: '45px' }} w={{ base: '30px', md: '45px' }} borderRadius={'full'} src={avatar.src} />
              <VStack align={'stretch'} >
                <Text style={{ color: '#1C1D2C', fontWeight: '400' }}>Congue sed id libero vivamus.</Text>
                <Text style={{ color: '#C4C4C4', fontWeight: '400' }}>March 30, 2023</Text>
              </VStack>
            </Flex>
          </Link>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default Notifications