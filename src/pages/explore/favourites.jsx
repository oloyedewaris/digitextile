import LayoutView from '@/components/layout';
import { Box, Flex, SimpleGrid, Skeleton, Text } from '@chakra-ui/react';
import React from 'react';
import ProductCard from '@/components/card/ProductCard';
import FormSelect from '@/components/form/FromSelect';
import { getFavourite, getProductsApi } from '@/apis/product';
import { useQuery } from 'react-query';
import EmptyState from '@/components/empty-state';
import { formatAmount } from '@/utils/formatAmount';

const TopDeals = () => {
  const { data, isError, error, isLoading, refetch, } = useQuery(["getFavourite"], () => getFavourite({ page: 1, limit: 8 }));
  const favouriteData = data?.data?.data

  return (
    <LayoutView noPadding>
      <Box px={{ base: '10px', md: '48px' }} my={{ base: '80px', md: '150px' }}>
        <Text mb={{ base: '10px', md: '32px' }} fontWeight={700} fontSize={{ base: '20px', md: '48px' }}>Favourite listings</Text>
        <Skeleton isLoaded={favouriteData?.map}>
          <SimpleGrid columns={{ base: '2', md: '4' }} columnGap={{ base: '10px', md: '26px' }} rowGap={{ base: '15px', md: '56px' }}>
            {favouriteData?.map((favourite, i) => (
              <ProductCard
                key={i}
                id={favourite?.product?._id}
                images={favourite?.product?.images}
                title={favourite?.product?.title}
                subTitle={favourite?.product?.description}
                price={`N${formatAmount(favourite?.product?.price)}`}
                persons={favourite?.product?.persons || []}
              />
            ))}
          </SimpleGrid>
        </Skeleton>
        {!favouriteData.length && <EmptyState h='50px' text={'No favourite listing yet'} />}
      </Box>
    </LayoutView>
  )
}

export default TopDeals