import LayoutView from '@/components/layout';
import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';
import HotDropsCard from '@/components/card/HotDropsCard';
import { extended } from '@/constant/hot-drop';

const HotDrops = () => {

  return (
    <LayoutView noPadding>
      <Box px={{ base: '10px', md: '48px' }} my={{ base: '80px', md: '150px' }}>
        <Text mb={{ base: '20px', md: '52px' }} fontWeight={700} fontSize={{ base: '20px', md: '48px' }}>Hot Drops</Text>
        <SimpleGrid columns={{ base: '1', md: '3' }} columnGap={{ base: '10px', md: '26px' }} rowGap={{ base: '15px', md: '56px' }}>
          {extended.map((card, i) => (
            <HotDropsCard
              key={i}
              image={card.image}
              title={card.title}
              person={card.person}
            />
          ))}
        </SimpleGrid>
      </Box>
    </LayoutView>
  )
}

export default HotDrops