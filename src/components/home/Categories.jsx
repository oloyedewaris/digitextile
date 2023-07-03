import { Box, Center, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';
import { RiArrowRightLine } from 'react-icons/ri';
import CategoryCard from '../card/CategoryCard';
import image1 from '@/assets/images/image1.png'

const Categories = () => {
  const sampleProduct = {
    image: image1.src,
    offers: '250 Offers',
    title: 'Fabrics',
    subTitle: 'Wholesale and Retail Textile fabric deals',
  }
  return (
    <Box px='48px' mt='100px'>
      <Flex align='center' w='full' justify='space-between' mb='52px'>
        <Text fontWeight={700} fontSize='48px'>Categories</Text>
        <Center gap='8px'>
          <Text fontSize='24px' color='#EF233C'>Explore</Text>
          <RiArrowRightLine color='#EF233C' size='24' />
        </Center>
      </Flex>
      <SimpleGrid columns={{base: '2', md: '4'}} columnGap={'21px'} rowGap={'24px'}>
        {Array(8).fill(sampleProduct).map((product, i) => (
          <CategoryCard
            key={i}
            image={product.image}
            title={product.title}
            subTitle={product.subTitle}
            offers={product.offers}
          />
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default Categories