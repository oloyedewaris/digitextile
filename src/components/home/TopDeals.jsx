import { Box, Center, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';
import { RiArrowRightLine } from 'react-icons/ri';
import ProductCard from '../card/ProductCard';
import Link from 'next/link';
import products from '@/constant/product'

const TopDeals = () => {


  return (
    <Box px={{ base: '10px', md: '48px' }} mt={{ base: '40px', md: '100px' }}>
      <Flex align='center' w='full' justify='space-between' mb={{ base: '20px', md: '52px' }}>
        <Text fontWeight={700} fontSize={{ base: '20px', md: '48px' }}>Top Deals</Text>
        <Center gap='8px'>
          <Link href='/explore/top-deals'>
            <Text fontSize={{ base: '16px', md: '24px' }} color='#EF233C'>See More</Text>
          </Link>
          <RiArrowRightLine color='#EF233C' size='18' />
        </Center>
      </Flex>
      <SimpleGrid columns={{ base: '2', md: '4' }} columnGap={{ base: '10px', md: '26px' }} rowGap={{ base: '15px', md: '56px' }}>
        {products.map((product, i) => (
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
  )
}

export default TopDeals