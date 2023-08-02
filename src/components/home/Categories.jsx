import { Box, Center, Flex, SimpleGrid, Skeleton, Text } from '@chakra-ui/react';
import React from 'react';
import { RiArrowRightLine } from 'react-icons/ri';
import CategoryCard from '../card/CategoryCard';
import categories from '@/constant/category'
import Link from 'next/link';
import { getCategoriesApi } from '@/apis/product';
import { useQuery } from 'react-query';

const Categories = () => {
  const { data, isError, error, isLoading, refetch, } = useQuery(["getCategories"], getCategoriesApi);

  return (
    <Box px={{ base: '10px', md: '48px' }} mt={{ base: '40px', md: '100px' }}>
      <Flex align='center' w='full' justify='space-between' mb={{ base: '20px', md: '52px' }}>
        <Text fontWeight={700} fontSize={{ base: '20px', md: '48px' }}>Categories</Text>
        <Center gap='8px'>
          <Link href='/explore/categories'>
            <Text fontSize={{ base: '16px', md: '24px' }} color='#EF233C'>See More</Text>
          </Link>
          <RiArrowRightLine color='#EF233C' size='18' />
        </Center>
      </Flex>
      <Skeleton isLoaded={data?.data?.data?.map}>
        <SimpleGrid columns={{ base: '2', md: '4' }} columnGap={{ base: '10px', md: '26px' }} rowGap={{ base: '15px', md: '56px' }}>
          {data?.data?.data?.map((cat, i) => (
            <CategoryCard
              key={i}
              image={cat.image}
              title={cat.name}
              subTitle={cat.description}
            // offers={cat.offers || 0}
            />
          ))}
        </SimpleGrid>
      </Skeleton>

    </Box>
  )
}

export default Categories
