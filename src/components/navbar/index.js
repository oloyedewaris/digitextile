import { Flex, Image, Text, HStack, Menu, Button, useDisclosure, InputGroup, InputLeftAddon, Input, Box } from '@chakra-ui/react';
import Link from 'next/link';
import logo from '@/assets/images/logo.png'
import { useContext } from 'react';
import { GlobalContext } from '@/context/Provider';
import Categories from './Categories';
import searchIcon from '@/assets/images/search-icon.png'
import { BiHeart } from 'react-icons/bi';

const Navbar = ({ }) => {
  const { authState } = useContext(GlobalContext);
  const loggedIn = authState.isAuthenticated;

  return (
    <Flex
      w='full' h={'100px'} alignItems={'center'}
      justify={'space-between'} px={'84px'}
      position={'fixed'} zIndex={100} gap='180px'
      bg="#F5F5F5" shadow={'sm'}
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
              outline={'none'}
              placeholder="What do you have in mind?"
              // w='full'
              border={"none !important"}
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

      <HStack spacing='32px'>
        <Box cursor='pointer'>
          <BiHeart size={25} />
        </Box>
        <Link href='/auth/login'>
          <Text noOfLines={1} cursor={'pointer'} color='#2B2D42'>Sign In</Text>
        </Link>

        <Button
          borderRadius='full'
          color='white'
          bg='#2B2D42' border='1px solid #2B2D42'
        >Create Account</Button>
      </HStack>
    </Flex>
  );
};

export default Navbar;