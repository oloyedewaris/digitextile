import { Box, Center, Flex, SimpleGrid, Skeleton, Text } from '@chakra-ui/react';
import React from 'react';
import CategoryCard from '@/components/card/CategoryCard';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import LayoutView from '@/components/layout';
import { getCategoriesApi } from '@/apis/category';

const Categories = () => {
  const router = useRouter();
  const { data, isError, error, isLoading, refetch, } = useQuery(["getCategories"], getCategoriesApi);

  return (
    <LayoutView>
      <Box px={{ base: '10px', md: '48px' }} mt={{ base: '40px', md: '100px' }}>
        <Text mb={{ base: '10px', md: '32px' }} fontWeight={700} fontSize={{ base: '20px', md: '48px' }}>All Categories</Text>
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
    </LayoutView>
  )
}

export default Categories
