import { Box, Center, Flex, SimpleGrid, Skeleton, Text } from '@chakra-ui/react';
import React from 'react';
import { RiArrowRightLine } from 'react-icons/ri';
import ProductCard from '../card/ProductCard';
import Link from 'next/link';
import { useQuery } from 'react-query';
import { getProductsApi, getRecommendedProductsApi, getTopProductsApi } from '@/apis/product';
import { formatAmount } from '@/utils/formatAmount';

const Recommended = () => {
  const { data } = useQuery(["getRecommendedProductsApi"], () => getProductsApi({ page: 1, limit: 8 }));


  return (
    <Box px={{ base: '10px', md: '48px' }} mt={{ base: '40px', md: '100px' }}>
      <Flex align='center' w='full' justify='space-between' mb={{ base: '20px', md: '52px' }}>
        <Text fontWeight={700} fontSize={{ base: '20px', md: '48px' }}>Recommended</Text>
        <Center gap='8px'>
          <Link href='/explore/recommended'>
            <Text fontSize={{ base: '16px', md: '24px' }} color='#EF233C'>See More</Text>
          </Link>
          <RiArrowRightLine color='#EF233C' size='18' />
        </Center>
      </Flex>
      <Skeleton isLoaded={data?.data?.data?.map}>
        <SimpleGrid columns={{ base: '2', md: '4' }} columnGap={{ base: '10px', md: '26px' }} rowGap={{ base: '15px', md: '56px' }}>
          {data?.data?.data?.map((product, i) => (
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
      </Skeleton>
    </Box>
  )
}

export default Recommended