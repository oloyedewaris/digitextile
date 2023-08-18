import LayoutView from '@/components/layout';
import { Box, Flex, HStack, Image, Input, InputGroup, InputLeftAddon, SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';
import { extended } from '@/constant/hot-drop';
import searchIcon from '@/assets/images/search-icon.png';
import hotDrop from '@/assets/images/hot-drop-main.png';
import HotDropDetail from '@/components/card/HotDropsCardDetails';
import person from '@/assets/images/person/person3.png'

const HotDrops = () => {

  return (
    <LayoutView noPadding>
      <Box pb={{ base: '20px', md: '80px' }} px={{ base: '20px', md: '80px' }}>
        <Box
          bg='white' borderRadius={{ base: '12px', md: '24px' }}
          p={{ base: '15px', md: '60px' }}
        >
          <Text textAlign={'center'} mb={{ base: '10px', md: '18px' }} fontWeight={700} fontSize={{ base: '20px', md: '48px' }}>Hot Drops</Text>
          <Text textAlign={'center'} mb={{ base: '20px', md: '52px' }} fontSize={{ base: '14px', md: '24px' }} color={'#999'} w={{ base: '95%', md: '75%' }} mx='auto'>
            Engage with a global community of textile enthusiasts, and together, let's weave a tapestry of inspiration and knowledge.
          </Text>
          <InputGroup
            mb={{ base: '20px', md: '52px' }} border='1px'
            borderRadius={{ base: '3px', md: '8px' }}
            w='full' maxW='482px' pr='15px'
            mx={'auto'}
          >
            <Input
              _focus={{ border: 'none', outline: 'none' }}
              border={'none'}
              placeholder="What do you have in mind?"
            // w='full'
            />
            <InputLeftAddon
              // bg='#2B2D42'
              p={"0px"}
              border={"none"}
            >
              <Image alt='next_image' src={searchIcon.src} />
            </InputLeftAddon>
          </InputGroup>



          <Flex direction={{ base: 'column', md: 'row' }} gap='35px'>
            <Box w={{ base: 'full', md: '50%' }}>
              <Image
                borderRadius={{ base: 'md', md: 'xl' }}
                bgPosition={'center'}
                bgSize={"cover"}
                w='full'
                // maxW='490px'
                h='auto'
                maxH={{ base: 'auto', md: "390px" }}
                src={hotDrop.src}
              />
            </Box>
            <Box w={{ base: 'full', md: '50%' }}>
              <Flex gap='5px' align='center'>
                <HStack position='relative' divider={<Box w='4px' h='4px' borderRadius={'full'} bg='#1565C0' />} spacing={'14px'}>
                  <Text color='#1565C0' fontSize={{ base: '17px', md: '28px' }}>Fashion Consulting</Text>
                  <Text color='#1565C0' fontSize={{ base: '17px', md: '28px' }}>8 mins read</Text>
                </HStack>
              </Flex>
              <Text
                mt={{ base: '8px', md: '28px' }}
                fontSize={{ base: '20px', md: '34px' }}
                fontWeight={700}
                color='#1C1D2C'
              >
                Fashion, technology and travelling.
              </Text>
              <Text mt={{ base: '8px', md: '24px' }} fontSize={{ base: '18px', md: '30px' }} noOfLines={3} color='#999'>
                Lectus mattis tincidunt dis viverra enim velit augue senectus.
                Vel ridiculus nullam diam cras egestas adipiscing.
                Laoreet orci nulla neque a quis ultrices.
              </Text>
              <HStack
                mt={{ base: '8px', md: '12px' }}
                alignItems={'center'} w={"100%"} spacing={'14px'}
                divider={<Box w='4px' h='4px' borderRadius={'full'} bg='#4D515E' />}>
                <Flex justify={'center'} align={'center'} gap='14px'>
                  <Image h='40px' w='40px' borderRadius='full' src={person.src} />
                  <Text fontSize={{ base: '10px', md: '14px' }} color={'#4D515E'} noOfLines={1}>Waris Oloyede</Text>
                </Flex>
                <Text fontSize={{ base: '10px', md: '14px' }} color={'#4D515E'} noOfLines={1}>10th April, 2023</Text>
              </HStack>
            </Box>
          </Flex>


          <SimpleGrid mt={{ base: '40px', md: '100px' }} columns={{ base: '2', md: '3' }} columnGap={{ base: '10px', md: '26px' }} rowGap={{ base: '15px', md: '56px' }}>
            {extended.map((card, i) => (
              <HotDropDetail
                user={card?.user}
                subTitle={card?.subTitle}
                // onClickCard={onClickCard}
                time={card?.time}
                timeToRead={card?.timeToRead}
                category={card?.category}
                id={i}
                key={i}
                image={card?.image}
                title={card?.title}
                person={card?.person}
              />
            ))}
          </SimpleGrid>
        </Box>
      </Box>
    </LayoutView>
  )
}

export default HotDrops