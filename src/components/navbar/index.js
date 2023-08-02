import { Flex, Image, Text, HStack, Menu, useDisclosure, InputGroup, InputLeftAddon, Input, Box } from '@chakra-ui/react';
import Link from 'next/link';
import logo from '@/assets/images/logo.png'
import Categories from './Categories';
import searchIcon from '@/assets/images/search-icon.png'
import { BiBell, BiHeart, BiMessage, BiStore } from 'react-icons/bi';
import Button from '../button';
import { useRouter } from 'next/router';
import Drawer from './Drawer';
import { FaBars } from 'react-icons/fa';
import { useContext } from 'react';
import { GlobalContext } from '@/context/Provider';
import ProfileMenu from './ProfileMenu';
import Notifications from './Notifications';
import { BellIcon } from '@chakra-ui/icons';

const Navbar = ({ }) => {
  const { authState } = useContext(GlobalContext)
  const loggedIn = authState.isAuthenticated
  // const loggedIn = true
  const router = useRouter();
  const drawerModal = useDisclosure();

  return (
    <>
      <Flex
        display={{ base: 'none', md: 'flex' }}
        w='full' h={'100px'} alignItems={'center'}
        justify={'space-between'} px={'84px'}
        position={'fixed'} zIndex={100} gap='180px'
        bg="#EDF2F4"
      >
        <HStack spacing={'40px'}>
          <Menu>
            <Link href='/'>
              <Image
                cursor={'pointer'}
                src={logo.src}
                maxH={'42px'}
                maxW={'400px'}
                alt={logo}
              />
            </Link>
            <Categories />
            <InputGroup border='1px' borderRadius={'full'} w='full' maxW='482px' pr='15px'>
              <Input
                _focus={{ border: 'none', outline: 'none' }}
                border={'none'}
                placeholder="What do you have in mind?"
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
          </Menu>
        </HStack>

        {loggedIn ? (
          <HStack spacing='20px'>
            <Box cursor='pointer'>
              <BiHeart size={25} />
            </Box>
            {authState?.user?.role === 'creator' && (
              <Link href='/store'>
                <Box cursor='pointer'>
                  <BiStore size={25} />
                </Box>
              </Link>
            )}
            <Notifications />
            <ProfileMenu />
          </HStack>
        ) : (
          <HStack spacing='32px'>
            <Box cursor='pointer'>
              <BiHeart size={25} />
            </Box>
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
          </HStack>
        )}

      </Flex>

      <Flex
        display={{ base: 'flex', md: 'none' }}
        w='full' h={'50px'} alignItems={'center'}
        justify={'space-between'} px={'14px'}
        position={'fixed'} zIndex={100}
        bg="#F5F5F5" shadow={'sm'}
      >
        <Link href='/'>
          <Image
            cursor={'pointer'}
            src={logo.src}
            maxH={'38px'}
            maxW={'300px'}
            alt={logo}
          />
        </Link>
        <HStack spacing='15px' align={'flex-end'}>
          <Notifications />
          <FaBars size={25} onClick={drawerModal.onOpen} />
        </HStack>
      </Flex>
      <Drawer modal={drawerModal} />
    </>
  );
};

export default Navbar;