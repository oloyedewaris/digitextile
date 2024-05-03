import React, { useContext } from 'react'
import { Flex, Image, Text, MenuList, Menu, MenuButton, MenuItem } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaSignOutAlt, FaCaretDown, FaUser, FaUsers } from 'react-icons/fa';
import { RiSettings4Fill } from 'react-icons/ri';
import { BiGroup, BiMessageDetail, BiUser } from 'react-icons/bi';
import { motion } from 'framer-motion';
import { GlobalContext } from '@/context/Provider';
import { logout } from '@/context/actions/auth';
import avatar from '@/assets/images/avatar.png'

const ProfileMenu = () => {
  const { authDispatch, authState } = useContext(GlobalContext)
  const router = useRouter();

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
          <Image src={authState.user?.image || avatar.src} h='36px' w='36px' borderRadius={'full'} />
        </Flex>
      </MenuButton>
      <MenuList style={{ height: 'fit-content' }}>
        <MenuItem>
          <Link href='/profile'>
            <Flex gap={3} align='center' mb='15px'>
              <BiUser size={'26px'} color='#919191' />
              <Text style={{ color: '#919191', fontWeight: '400' }}>Profile</Text>
            </Flex>
          </Link>
        </MenuItem>

        <MenuItem>
          <Link href='/hot-drops/my-hot-drops'>
            <Flex gap={3} align='center' mb='15px'>
              <FaUsers size={'26px'} color='#919191' />
              <Text style={{ color: '#919191', fontWeight: '400' }}> Create Hot Drops</Text>
            </Flex>
          </Link>
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