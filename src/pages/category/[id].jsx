import LayoutView from '@/components/layout';
import { Box, Flex, SimpleGrid, Skeleton, Text } from '@chakra-ui/react';
import React from 'react';
import ProductCard from '@/components/card/ProductCard';
import FormSelect from '@/components/form/FromSelect';
import { getCategorysApi, getProductsApi } from '@/apis/product';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

const Category = () => {
  const router = useRouter()
  const categoryId = router.query.id;
  const categoryName = router.query.category;
  const { data } = useQuery(["getProductsByCategory"], () => getCategorysApi({ page: 1, limit: 8, category: categoryId }));

  console.log('data', data?.data?.data)
  return (
    <LayoutView noPadding>
      <Box px={{ base: '10px', md: '48px' }} my={{ base: '80px', md: '150px' }}>
        <Text mb={{ base: '10px', md: '22px' }} fontWeight={700} fontSize={{ base: '20px', md: '48px' }}>{categoryName || 'Category'}</Text>
        <Flex mb='20px' align={'center'} justify={'space-between'}>
          <Flex gap='16px'>
            <FormSelect
              borderRadius='full'
              w='120px'
              border='1px solid #2B2D42'
              placeholder={'Category'}
              options={[]}
            />
            <FormSelect
              borderRadius='full'
              w='120px'
              border='1px solid #2B2D42'
              placeholder={'Section'}
              options={[]}
            />
            <FormSelect
              borderRadius='full'
              w='120px'
              border='1px solid #2B2D42'
              placeholder={'Date'}
              options={[]}
            />
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

export default Category