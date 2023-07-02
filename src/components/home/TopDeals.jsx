import { Box, Center, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';
import { RiArrowRightLine } from 'react-icons/ri';
import ProductCard from '../card/ProductCard';
import image1 from '@/assets/images/image1.png'
import person1 from '@/assets/images/person/person1.png'
import person2 from '@/assets/images/person/person2.png'
import person3 from '@/assets/images/person/person3.png'
import person4 from '@/assets/images/person/person4.png'
import person5 from '@/assets/images/person/person5.png'

const TopDeals = () => {
  const sampleProduct = {
    images: [image1.src, image1.src, image1.src, image1.src],
    persons: [person1.src, person2.src, person3.src, person4.src, person5.src],
    title: 'U20 (Nigeria model)',
    subTitle: 'Quality, durable U20 sewing machine with leg stage. Electric cable and thread box available on request',
    price: 'N12,000'
  }
  return (
    <Box px='48px' mt='100px'>
      <Flex align='center' w='full' justify='space-between' mb='52px'>
        <Text fontWeight={700} fontSize='48px'>Top Deals</Text>
        <Center gap='8px'>
          <Text fontSize='24px' color='#EF233C'>See More</Text>
          <RiArrowRightLine color='#EF233C' size='24' />
        </Center>
      </Flex>
      <SimpleGrid columns='4' columnGap={'26px'} rowGap={'56px'}>
        {Array(8).fill(sampleProduct).map((product, i) => (
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