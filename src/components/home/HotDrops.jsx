import { Box, Center, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';
import { RiArrowRightLine } from 'react-icons/ri';
import image1 from '@/assets/images/image1.png'
import person1 from '@/assets/images/person/person1.png'
import HotDropsCard from '../card/HotDropsCard';

const HotDrops = () => {
  const sampleCard = {
    image: image1.src,
    person: person1.src,
    title: 'Fashion, technology and travelling.',
  }
  return (
    <Box px='48px' mt='100px'>
      <Flex align='center' w='full' justify='space-between' mb='52px'>
        <Text fontWeight={700} fontSize='48px'>Hot Drops</Text>
        <Center gap='8px'>
          <Text fontSize='24px' color='#EF233C'>See More</Text>
          <RiArrowRightLine color='#EF233C' size='24' />
        </Center>
      </Flex>
      <SimpleGrid columns={{base: '1', md: '3'}} gap={'33px'}>
        {Array(3).fill(sampleCard).map((card, i) => (
          <HotDropsCard
            key={i}
            image={card.image}
            title={card.title}
            person={card.person}
          />
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default HotDrops