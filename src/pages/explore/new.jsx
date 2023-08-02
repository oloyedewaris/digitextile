import LayoutView from '@/components/layout';
import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';
import ProductCard from '@/components/card/ProductCard';
import { extended } from '@/constant/product';
import FormSelect from '@/components/form/FromSelect';

const TopDeals = () => {

  return (
    <LayoutView noPadding>
      <Box px={{ base: '10px', md: '48px' }} my={{ base: '80px', md: '150px' }}>
        <Text mb={{ base: '10px', md: '32px' }} fontWeight={700} fontSize={{ base: '20px', md: '48px' }}>New</Text>
        <Flex mb='30px' align={'center'} justify={'space-between'}>
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
        <SimpleGrid columns={{ base: '2', md: '4' }} columnGap={{ base: '10px', md: '26px' }} rowGap={{ base: '15px', md: '56px' }}>
          {extended.map((product, i) => (
            <ProductCard
              key={i}
              images={product.images}
              title={product.title}
              subTitle={product.subTitle}
              price={product.price}
              persons={product.persons}
            />
          ))}
        </SimpleGrid>
      </Box>
    </LayoutView>
  )
}

export default TopDeals