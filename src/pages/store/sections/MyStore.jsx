import { Box, Center, Divider, Flex, HStack, Image, Input, InputGroup, InputLeftAddon, SimpleGrid, Skeleton, Text, VStack } from '@chakra-ui/react'
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

const MyStore = () => {
  const { authState: { user } } = useContext(GlobalContext)
  const { data, isLoading } = useQuery(["getUserProductApi"], getUserProductApi);

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

        {/* <Flex align={'center'} w='full' justify={'space-between'}>
          <Flex align={'center'} pb={{ base: '20px', md: '40px' }} h='95px'>
            <Image src={avatar.src} borderRadius={'8px'} w='90px' h='90px' />
            <Flex direction='column' h='full' justify='space-between'>
              <Box>
                <Text mb='4px' fontWeight={500} fontSize={'20px'} color='#212922'>Store Name here</Text>
                <Text fontWeight={400} fontSize={'14px'} color='#212922'>Tagline here</Text>
              </Box>
              <HStack spacing={'3px'}>
                <Image src={verified.src} />
                <Text fontWeight={400} fontSize={'14px'} color='#212922'>Verified Seller</Text>
              </HStack>
            </Flex>
          </Flex>
        </Flex> */}
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
                price={`N${product.price}`}
                persons={product.persons || []}
              />
            ))}
          </SimpleGrid>
          {!data?.data?.data?.length && (
            <EmptyState text={'No user listing yet'} />
          )}
        </Skeleton>
      </Box>

    </Box>
  )
}

export default MyStore