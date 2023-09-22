import { Box, Center, Divider, Flex, HStack, Image, Input, InputGroup, InputLeftAddon, SimpleGrid, Skeleton, Text, VStack, useDisclosure } from '@chakra-ui/react'
import React, { useContext } from 'react';
import Button from '@/components/button';
import { BiPlus } from 'react-icons/bi';
import FormSelect from '@/components/form/FromSelect';
import searchIcon from '@/assets/images/search-icon.png'
import MyListingCard from '@/components/card/MyListingCard';
import Link from 'next/link';
import { useQuery } from 'react-query';
import { getUserProductApi } from '@/apis/user';
import EmptyState from '@/components/empty-state';
import { GlobalContext } from '@/context/Provider';
import { FilterCategory, FilterDate, FilterSection } from '@/components/elements';
import coverImg from '@/assets/images/store-bg.png';
import avatar from '@/assets/images/avatar.png';
import verified from '@/assets/svgs/verified.svg'
import { formatAmount } from '@/utils/formatAmount';
import infoBtn from '@/assets/svgs/info-button.svg';
import { RiStarSFill } from 'react-icons/ri';
import ReviewModal from '@/components/reviewModal';

const MyStore = () => {
  const { authState: { user } } = useContext(GlobalContext)
  const { data, isLoading } = useQuery(["getUserProductApi"], getUserProductApi);
  const reviewModal = useDisclosure()

  return (
    <Box>
      <Flex py={{ base: '9px', md: '27px' }} px={{ base: '10px', md: '40px' }} justify={'space-between'} align={'center'}>
        <Text fontSize={{ base: '20px', md: '32px' }} fontWeight={700}>My Store</Text>
        <Text color='#1C1D2C' fontSize={{ base: '12px', md: '16px' }} fontWeight={500}>Welcome,  {user?.fullname}</Text>
      </Flex>
      <Divider w='full' />

      <Box px={{ base: '20px', md: '40px' }} pt={{ base: '5px', md: '10px' }}>
        <Box
          w='full' h='200px'
          borderTopRightRadius={'8px'}
          borderTopLeftRadius={'8px'}
          bg={'rgba(28, 29, 44, 0.80)'}
        />
        <Center
          mb={{ base: '20px', md: '40px' }}
          mx='auto' mt='-60px' w='120px'
          h='120px' bg={'rgba(28, 29, 44, 0.80)'}
          borderRadius={'full'} border='1px solid #fff'
          flexDirection={'column'}>
          <BiPlus size={20} color='#fff' />
          <Text color='#fff' fontSize={'14px'} fontWeight={500}>Insert logo</Text>
        </Center>

        <Flex align={'center'} w='full' justify={'space-between'} mb={{ base: '20px', md: '40px' }}>
          <Flex w='40%' align={'center'} h='95px' gap='15px'>
            <Image src={avatar.src} borderRadius={'8px'} w='90px' h='90px' />
            <Flex direction='column' h='full' justify='space-between'>
              <Box>
                <Text mb='4px' fontWeight={500} fontSize={'18px'} color='#212922'>
                  {user?.fullname}
                </Text>
                <Text fontWeight={400} fontSize={'13px'} color='#212922' noOfLines={2}>
                  {user?.bio}
                </Text>
              </Box>
              <HStack spacing={'3px'} align={'center'} gap='2px' divider={<Divider orientation='vertical' h='5px' />}>
                <Flex align={'center'}>
                  <Image src={verified.src} />
                  <Text fontWeight={400} fontSize={'13px'} color='#212922'>Verified Seller</Text>
                </Flex>
                <HStack align={'center'} gap='-2px' onClick={reviewModal.onOpen}>
                  <RiStarSFill />
                  <RiStarSFill />
                  <RiStarSFill />
                </HStack>
              </HStack>
            </Flex>
          </Flex>

          <Flex w='40%' direction='column' h='full' justify='center'>
            <Text fontWeight={500} fontSize={'18px'} color='#212922'>
              You are a Verified Seller!
            </Text>
            <Text fontWeight={400} fontSize={'13px'} color='#212922' noOfLines={2}>
              User are now able to transact with you more conveniently. Watch out for Verified Customers
            </Text>
            <HStack spacing={'3px'} align={'center'}>
              <Image src={infoBtn.src} />
              <Text fontWeight={400} fontSize={'10px'} color='#1565C0'>Safety tips</Text>
            </HStack>
          </Flex>
        </Flex>
        <InputGroup border='1px' borderRadius={'full'} w='full' pr='15px'>
          <Input
            _focus={{ border: 'none', outline: 'none' }}
            border={'none'}
            placeholder="Search your listings"
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

        <Flex my={{ base: '20px', md: '40px' }} gap={{ base: '10px' }} align={{ base: 'flex-start', md: 'center' }} direction={{ base: 'column', md: 'row' }} justify={'space-between'}>
          <Flex gap={{ base: '6px', md: '16px' }}>
            <FilterCategory />
            <FilterSection />
            <FilterDate />
          </Flex>
          <Link href='/create-listing'>
            <Button
              leftIcon={<BiPlus />}
              borderRadius='full' bg='#2B2D42'
              color='white'
            >
              Add Listing
            </Button>
          </Link>
        </Flex>

        <Skeleton isLoaded={!isLoading}>
          <SimpleGrid columns={{ base: '2', md: '3' }} columnGap={{ base: '10px', md: '10px' }} rowGap={{ base: '15px', md: '30px' }}>
            {data?.data?.data?.map((product, i) => (
              <MyListingCard
                id={product._id}
                key={i}
                images={product.images}
                title={product.title}
                subTitle={product.description}
                price={`N${formatAmount(product.price)}`}
                persons={product.persons || []}
              />
            ))}
          </SimpleGrid>
          {!data?.data?.data?.length && (
            <EmptyState text={'No user listing yet'} />
          )}
        </Skeleton>
      </Box>
      <ReviewModal modal={reviewModal} />
    </Box>
  )
}

export default MyStore