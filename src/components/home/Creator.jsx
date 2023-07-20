import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';
import CreatorCard from '../card/CreatorCard';
import { RiArrowRightLine } from 'react-icons/ri';

const Creator = () => {
  const cards = [
    {
      icon: <RiArrowRightLine size={30} color='white' />,
      title: 'Create an Account',
      subTitle: 'Choose the creator option when registering (every creator is an automatic consumer) and proceed to fill in all required information.',
    },
    {
      icon: <RiArrowRightLine size={30} color='white' />,
      title: 'Set up your store',
      subTitle: 'Brand your creator’s page. You can begin adding products to your store with required information. Create sections to tailor shoppers experience',
    },
    {
      icon: <RiArrowRightLine size={30} color='white' />,
      title: 'Share and Collaborate',
      subTitle: 'Publish into the ecosystem. User Tags can be added for collaborations. To initiate a collaboration, reach out to creator via messaging.',
    }
  ]

  return (
    <Box px={{ base: '10px', md: '48px' }} mt={{ base: '40px', md: '100px' }} mb={{ base: '40px', md: '70px' }}>
      <Text fontWeight={700} fontSize={{ base: '20px', md: '48px' }} mb={{ base: '20px', md: '52px' }}>How to become a Creator</Text>
      <SimpleGrid columns={{ base: '1', md: '3' }} gap={{ base: '20px', md: '33px' }}>
        {cards.map((card, i) => (
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