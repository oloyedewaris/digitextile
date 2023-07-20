import { Box, Center, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';
import { RiArrowRightLine } from 'react-icons/ri';
import CategoryCard from '../card/CategoryCard';
import categories from '@/constant/category'
import Link from 'next/link';

const Categories = () => {

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
      <SimpleGrid columns={{ base: '2', md: '4' }} columnGap={{ base: '10px', md: '26px' }} rowGap={{ base: '15px', md: '56px' }}>
        {categories.map((cat, i) => (
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
  )
}

export default Categories
