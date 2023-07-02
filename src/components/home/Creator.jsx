import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';
import CreatorCard from '../card/CreatorCard';
import { RiArrowRightLine } from 'react-icons/ri';

const Creator = () => {
  const sampleCard = {
    icon: <RiArrowRightLine size={30} color='white' />,
    title: 'Create an Account',
    subTitle: 'Choose the creator option when registering (every creator is an automatic consumer) and proceed to fill in all required information.',
  }

  return (
    <Box px='48px' mt='100px'>
      <Text fontWeight={700} fontSize='48px' mb='52px'>How to become a Creator</Text>
      <SimpleGrid columns='3' gap={'33px'}>
        {Array(3).fill(sampleCard).map((card, i) => (
          <CreatorCard
            key={i}
            icon={card.icon}
            title={card.title}
            subTitle={card.subTitle}
            index={`0${i + 1}`}
          />
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default Creator