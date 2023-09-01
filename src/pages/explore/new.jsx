import LayoutView from '@/components/layout';
import { Box, Flex, SimpleGrid, Skeleton, Text } from '@chakra-ui/react';
import React from 'react';
import ProductCard from '@/components/card/ProductCard';
import FormSelect from '@/components/form/FromSelect';
import { getProductsApi } from '@/apis/product';
import { useQuery } from 'react-query';
import { FilterCategory, FilterDate, FilterSection } from '@/components/elements';

const NewDeals = () => {
  const { data, isError, error, isLoading, refetch, } = useQuery(["getTopDeals"], () => getProductsApi({ page: 1, limit: 8 }));

  return (
    <LayoutView noPadding>
      <Box px={{ base: '10px', md: '48px' }} my={{ base: '80px', md: '150px' }}>
        <Text mb={{ base: '10px', md: '32px' }} fontWeight={700} fontSize={{ base: '20px', md: '48px' }}>New Deals</Text>
        <Flex mb='30px' align={'center'} justify={'space-between'}>
          <Flex gap='16px'>
            <FilterCategory />
            <FilterSection />
            <FilterDate />
          </Flex>
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
                price={`N${product.price}`}
                persons={product.persons || []}
              />
            ))}
          </SimpleGrid>
        </Skeleton>
      </Box>
    </LayoutView>
  )
}

export default NewDeals