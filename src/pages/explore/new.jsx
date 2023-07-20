import LayoutView from '@/components/layout';
import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';
import ProductCard from '@/components/card/ProductCard';
import Footer from '@/components/home/Footer';
import { extended } from '@/constant/product';

const TopDeals = () => {

  return (
    <LayoutView noPadding>
      <Box px={{ base: '10px', md: '48px' }} my={{ base: '80px', md: '150px' }}>
        <Text mb={{ base: '20px', md: '52px' }} fontWeight={700} fontSize={{ base: '20px', md: '48px' }}>New</Text>
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
      <Footer />
    </LayoutView>
  )
}

export default TopDeals