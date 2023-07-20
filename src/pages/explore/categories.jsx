import LayoutView from '@/components/layout';
import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';
import CategoryCard from '@/components/card/CategoryCard';
import Footer from '@/components/home/Footer';
import { extended } from '@/constant/category';

const Categories = () => {

  return (
    <LayoutView noPadding>
      <Box px={{ base: '10px', md: '48px' }} my={{ base: '80px', md: '150px' }}>
        <Text mb={{ base: '20px', md: '52px' }} fontWeight={700} fontSize={{ base: '20px', md: '48px' }}>Categories</Text>
        <SimpleGrid columns={{ base: '2', md: '4' }} columnGap={{ base: '10px', md: '26px' }} rowGap={{ base: '15px', md: '56px' }}>
          {extended.map((cat, i) => (
            <CategoryCard
              key={i}
              image={cat.image}
              title={cat.title}
              subTitle={cat.subTitle}
              offers={cat.offers}
            />
          ))}
        </SimpleGrid>
      </Box>
      <Footer />
    </LayoutView>
  )
}

export default Categories