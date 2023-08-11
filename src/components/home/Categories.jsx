import { Box, Center, Flex, SimpleGrid, Skeleton, Text } from '@chakra-ui/react';
import React from 'react';
import { RiArrowRightLine } from 'react-icons/ri';
import CategoryCard from '../card/CategoryCard';
import Link from 'next/link';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { getCategoriesApi } from '@/apis/category';

const Categories = () => {
  const router = useRouter();
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
              id={cat._id}
              onClickCard={() => router.push(`/category/${cat._id}?category=${cat.name}`)}
              key={i}
              image={cat.image}
              title={cat.name}
              subTitle={cat.description}
            />
          ))}
        </SimpleGrid>
      </Skeleton>

    </Box>
  )
}

export default Categories
