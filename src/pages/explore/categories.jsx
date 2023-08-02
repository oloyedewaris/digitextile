import LayoutView from '@/components/layout';
import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';
import CategoryCard from '@/components/card/CategoryCard';
import { extended } from '@/constant/category';
import FormSelect from '@/components/form/FromSelect';

const Categories = () => {

  return (
    <LayoutView>
      <Box px={{ base: '10px', md: '48px' }} my={{ base: '80px', md: '150px' }}>
        <Text mb={{ base: '10px', md: '32px' }} fontWeight={700} fontSize={{ base: '20px', md: '48px' }}>Categories</Text>
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
    </LayoutView>
  )
}

export default Categories