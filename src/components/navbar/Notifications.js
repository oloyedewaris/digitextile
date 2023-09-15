import React, { useContext } from 'react'
import { Flex, Image, Text, MenuList, Menu, MenuButton, MenuItem, Box, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BiBell } from 'react-icons/bi';
import { motion } from 'framer-motion';
import digi from '@/assets/svgs/digi-icon.svg'
import { fetchUserNotifications } from '@/apis/notifications';
import { useQuery } from 'react-query';
import EmptyState from '../empty-state';

const Notifications = () => {
  const router = useRouter();
  const notificationQuery = useQuery(["fetchUserNotifications"], fetchUserNotifications);

  const notifData = notificationQuery?.data?.data?.data;

  const handleSettings = () => {
    router.push('/settings');
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
        {notifData?.map(notif => (
          <MenuItem w='450px'>
            <Link href='/settings'>
              <Flex gap={{ base: 2, md: 3 }} align='center' mb='15px' onClick={handleSettings}>
                <Image h={{ base: '30px', md: '45px' }} w={{ base: '30px', md: '45px' }} borderRadius={'full'} src={digi.src} />
                <VStack align={'stretch'}>
                  <Text fontSize={'20px'} style={{ color: '#1C1D2C', fontWeight: '500' }} noOfLines={1}>{notif.title}</Text>
                  <Text fontSize={'15px'} style={{ color: '#1C1D2C', fontWeight: '400' }} noOfLines={3}>{notif.body}</Text>
                  <Text fontSize={'10px'} style={{ color: '#C4C4C4', fontWeight: '300' }}>{notif.createdAt && new Date(notif.createdAt).toDateString()}</Text>
                </VStack>
              </Flex>
            </Link>
          </MenuItem>
        ))}
        {!notifData?.length && <EmptyState height='80px' text={'No notifications yet'} />}
      </MenuList>
    </Menu>
  )
}

export default Notifications