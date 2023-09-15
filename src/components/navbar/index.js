import { Flex, Image, Text, HStack, Menu, useDisclosure, InputGroup, InputLeftAddon, Input, Box, Badge, Modal, ModalOverlay, ModalContent, ModalBody, SimpleGrid } from '@chakra-ui/react';
import Link from 'next/link';
import logo from '@/assets/images/logo.png'
import Categories from './Categories';
import searchIcon from '@/assets/images/search-icon.png'
import { BiEnvelope, BiHeart, BiMessageAlt, BiMessageDetail, BiStore } from 'react-icons/bi';
import Button from '../button';
import { useRouter } from 'next/router';
import Drawer from './Drawer';
import { FaBars } from 'react-icons/fa';
import { useContext, useState } from 'react';
import { GlobalContext } from '@/context/Provider';
import ProfileMenu from './ProfileMenu';
import { RiAdminFill } from 'react-icons/ri';
import Notifications from './Notifications';
import { useQuery } from 'react-query';
import { getMessageCount } from '@/apis/messaging';
import { searchApi } from '@/apis/user';
import ProductCard from '../card/ProductCard';
import { formatAmount } from '@/utils/formatAmount';
import HotDropsCard from '../card/HotDropsCard';
import avatar from '@/assets/images/avatar.png'
import EmptyState from '../empty-state';

const Navbar = ({ }) => {
  const { authState } = useContext(GlobalContext)
  const loggedIn = authState.isAuthenticated
  const router = useRouter();
  const drawerModal = useDisclosure();
  const searchModal = useDisclosure()

  const [searchText, setSearchText] = useState('')
  const searchQuery = useQuery(['searchApi', searchText], () => searchApi(searchText))

  const forums = searchQuery?.data?.data?.data?.forums
  const products = searchQuery?.data?.data?.data?.products

  const messagesCountQuery = useQuery(
    ["getMessageCount"],
    () => getMessageCount(),
    {
      enabled: true,
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
            <InputGroup onClick={searchModal?.onOpen} border='1px' borderRadius={'full'} w='full' maxW='482px' pr='15px'>
              <Input
                // onChange={}
                _focus={{ border: 'none', outline: 'none' }}
                border={'none'}
                placeholder="Search digitextile"
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
          <>
            {authState?.user?.role === 'admin' ? (
              <HStack spacing='20px'>
                <Link href='/admin'>
                  <Box cursor='pointer'>
                    <RiAdminFill size={25} />
                  </Box>
                </Link>
                <Notifications />
                <ProfileMenu />
              </HStack>
            ) : authState?.user?.role === 'creator' ? (
              <HStack spacing='20px'>
                <Link href='/messages'>
                  <Flex cursor='pointer' direction={'row'} align='center' gap='5px'>
                    <BiEnvelope style={{ borderRadius: '10px' }} size={25} />
                    <Badge variant='outline' colorScheme='red'>
                      {messagesCountQuery?.data?.data?.data}
                    </Badge>
                  </Flex>
                </Link>
                <Link href='/store'>
                  <Box cursor='pointer'>
                    <BiStore size={25} />
                  </Box>
                </Link>
                <Notifications />
                <ProfileMenu />
              </HStack>
            ) : (
              <HStack spacing='20px'>
                <Link href='/messages'>
                  <Box cursor='pointer'>
                    <BiEnvelope style={{ borderRadius: '10px' }} size={25} />
                  </Box>
                </Link>
                <Link href='/explore/favourites'>
                  <Box cursor='pointer'>
                    <BiHeart size={25} />
                  </Box>
                </Link>
                <Notifications />
                <ProfileMenu />
              </HStack>
            )}
          </>
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


      <Modal
        onClose={searchModal?.onClose}
        isOpen={searchModal?.isOpen}
        motionPreset="slideInBottom"
        scrollBehavior={'inside'}
      >
        <ModalOverlay bg="rgba(0,0,0,0.2)" />
        <ModalContent py='20px' px='10px' borderRadius={'16px'} w='100%' maxW={'80vw'} bg='#EDF2F4'>
          <Flex direction="row" align="center" w='70%' mx='auto' mb='8px' px='6px' borderRadius='8px' border={'1px solid #ccc'}>
            <Image alt='next_image' src={searchIcon.src} />
            <Input
              placeholder="Search digitextile"
              type="text"
              border="none !important"
              fontWeight="400"
              fontSize="15px"
              lineHeight="16px"
              color="#606060"
              _focus={{
                border: "none !important",
              }}
              onChange={(event) => setSearchText(event.target.value)}
            />
          </Flex>
          <ModalBody overflowY={'scroll'}>

            <Box mt='20px'>
              <Text fontWeight={600} fontSize={{ base: '15px', md: '38px' }}>Products</Text>
              <SimpleGrid columns={{ base: '2', md: '3' }} columnGap={{ base: '10px', md: '26px' }} rowGap={{ base: '15px', md: '56px' }}>
                {products?.map((product, i) => (
                  <ProductCard
                    key={i}
                    id={product._id}
                    images={product.images}
                    title={product.title}
                    subTitle={product.description}
                    price={`N ${formatAmount(product.price)}`}
                    persons={product.persons || []}
                  />
                ))}
              </SimpleGrid>
              {!products?.length && (
                <EmptyState height='100px' text={'No product found'} />
              )}

            </Box>

            <Box mt='20px'>
              <Text fontWeight={600} fontSize={{ base: '15px', md: '38px' }}>Hot drops</Text>
              <SimpleGrid columns={{ base: '2', md: '3' }} columnGap={{ base: '10px', md: '26px' }} rowGap={{ base: '15px', md: '56px' }}>
                {forums?.map((card, i) => (
                  <HotDropsCard
                    key={i}
                    image={card.image}
                    title={card.title}
                    person={card.creator?.image || avatar.src}
                    onClickCard={() => router.push(`/hot-drop/${card?._id}`)}
                  />
                ))}
              </SimpleGrid>
              {!forums?.length && (
                <EmptyState height='100px' text={'No forum article found'} />
              )}

            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Navbar;