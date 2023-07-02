import React, { useContext } from 'react'
import { Flex, Image, Text, MenuList, Menu, MenuButton, MenuItem } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaSignOutAlt, FaCaretDown, FaUser } from 'react-icons/fa';
import { RiSettings4Fill } from 'react-icons/ri';
import { BiMessageDetail } from 'react-icons/bi';
import { motion } from 'framer-motion';
import { GlobalContext } from '@/context/Provider';
import { logout } from '@/context/actions/auth';

const ProfileMenu = () => {
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
      <MenuButton w='178px' color='white' variant={'link'} rounded={'full'} cursor={'pointer'} alignItems='center'>
        <Flex gap={'8px'} as={motion.div} align={'center'} justifyContent={'center'} cursor={'pointer'}
          whiletap={{ scale: 0.9 }} whilehover={{ scale: 1.1 }}
        >
          <FaUser color='#19518D' size={'20px'} alt='icon' />
          <Text color='#000000'>{authState.user?.name || authState.user?.firstName}</Text>
          <FaCaretDown color='#19518D' size={25} />
        </Flex>
      </MenuButton>
      <MenuList style={{ height: 'fit-content' }}>
        <MenuItem>
          <Link href='/settings'>
            <Flex gap={3} align='center' mb='15px' onClick={handleSettings}>
              <RiSettings4Fill size={'26px'} color='#919191' />
              <Text style={{ color: '#919191', fontWeight: '400' }}>Settings</Text>
            </Flex>
          </Link>
        </MenuItem>
        <MenuItem>
          <Flex gap={3} align='center' mb='15px'>
            <BiMessageDetail size={'26px'} color='#919191' />
            <Text color='#919191' fontWeight='400'>
              Feedback
            </Text>
          </Flex>
        </MenuItem>
        <MenuItem>
          <Flex gap={3} align='center' mb='15px'>
            <BiMessageDetail size={'26px'} color='#919191' />
            <Text color='#919191' fontWeight='400'>
              Terms & Conditions
            </Text>
          </Flex>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Flex gap={3} align='center'>
            <FaSignOutAlt size={'26px'} color='#919191' />
            <Text color='#919191' fontWeight='400'>
              Sign Out
            </Text>
          </Flex>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default ProfileMenu