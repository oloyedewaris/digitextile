import { Box, Center, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { RiArrowRightLine } from 'react-icons/ri';
import HotDropsCard from '../card/HotDropsCard';
import hotDrop from '@/constant/hot-drop'
import Link from 'next/link';

const HotDrops = () => {

  return (
    <Box px={{ base: '10px', md: '48px' }} mt={{ base: '40px', md: '100px' }}>
      <Flex align='center' w='full' justify='space-between' mb={{ base: '20px', md: '52px' }}>
        <Text fontWeight={700} fontSize={{ base: '20px', md: '48px' }}>Hot Drops</Text>
        <Center gap='8px'>
          <Link href='/explore/hot-drops'>
            <Text fontSize={{ base: '16px', md: '24px' }} color='#EF233C'>See More</Text>
          </Link>
          <RiArrowRightLine color='#EF233C' size='18' />
        </Center>
      </Flex>
      <Flex overflowX={{ base: 'scroll', md: 'clip' }} gap={{ base: '10px', md: '26px' }} >
        {hotDrop.map((card, i) => (
          <HotDropsCard
            key={i}
            image={card.image}
            title={card.title}
            person={card.person}
          />
        ))}
      </Flex>
    </Box>
  )
}

export default HotDrops