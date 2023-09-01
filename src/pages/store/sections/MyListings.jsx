import { Box, Divider, Flex, HStack, Image, Input, InputGroup, InputLeftAddon, SimpleGrid, Skeleton, Text, VStack } from '@chakra-ui/react'
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

const Listings = () => {
  const { authState: { user } } = useContext(GlobalContext)
  const { data, isError, error, isLoading, refetch, } = useQuery(["getUserProductApi"], getUserProductApi);

  return (
    <Box>
      <Flex py={{ base: '9px', md: '27px' }} px={{ base: '10px', md: '40px' }} justify={'space-between'} align={'center'}>
        <Text fontSize={{ base: '20px', md: '32px' }} fontWeight={700}>Dashboard</Text>
        <Text color='#1C1D2C' fontSize={{ base: '12px', md: '16px' }} fontWeight={500}>Welcome,  {user?.fullname}</Text>
      </Flex>
      <Divider w='full' />

      <Box p={{ base: '20px', md: '40px' }}>
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

export default Listings