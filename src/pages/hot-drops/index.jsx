import LayoutView from '@/components/layout';
import { Box, Button, Flex, HStack, Image, Input, InputGroup, InputLeftAddon, SimpleGrid, Skeleton, Text } from '@chakra-ui/react';
import React from 'react';
import searchIcon from '@/assets/images/search-icon.png';
import hotDrop from '@/assets/images/hot-drop-main.png';
import HotDropDetail from '@/components/card/HotDropsCardDetails';
import person from '@/assets/images/person/person3.png'
import { useRouter } from 'next/router';
import { fetchForums } from '@/apis/forum';
import { useQuery } from 'react-query';
import EmptyState from '@/components/empty-state';
import { BiPlus } from 'react-icons/bi';
import Link from 'next/link';
import Auth from '@/hoc/Auth';
import FormSelect from '@/components/form/FromSelect';

const HotDrops = () => {
  const router = useRouter()
  const { data, isError, error, isLoading, refetch, } = useQuery(["fetchForums"], fetchForums);

  console.log('data', data)
  const forums = data?.data?.data

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
              bg='transparent'
              p={"0px"}
              border={"none"}
            >
              <Image alt='next_image' src={searchIcon.src} />
            </InputLeftAddon>
          </InputGroup>


          <Flex
            mt={{ base: '20px', md: '40px' }}
            gap={{ base: '10px' }}
            align={{ base: 'flex-start', md: 'center' }}
            direction={{ base: 'column', md: 'row' }}
            justify={'space-between'}
          >
            <Flex gap={{ base: '6px', md: '16px' }}>
              <FormSelect
                w='170px'
                borderRadius='full'
                placeholder={'Topic Category'}
                options={[]}
              />
              <FormSelect
                borderRadius='full'
                placeholder={'Date'}
                options={[]}
              />
            </Flex>
            <Link href='/create-hot-drop'>
              <Button
                leftIcon={<BiPlus />}
                borderRadius='full' bg='#2B2D42'
                color='white'
              >
                Create Hot Drop
              </Button>
            </Link>
          </Flex>


          <Skeleton isLoaded={!isLoading}>
            <SimpleGrid my={{ base: '20px', md: '40px' }} columns={{ base: '2', md: '3' }} columnGap={{ base: '10px', md: '26px' }} rowGap={{ base: '15px', md: '56px' }}>
              {forums?.map((card, i) => (
                <HotDropDetail
                  user={card?.creator?.fullname}
                  subTitle={card?.content}
                  onClickCard={() => router.push(`/hot-drop/${card?._id}`)}
                  time={card?.createdAt && new Date(card?.createdAt).toDateString()}
                  timeToRead={card?.readTime}
                  category={card?.category}
                  id={i} key={i}
                  image={card?.image}
                  title={card?.title}
                // person={card?.person}
                />
              ))}
            </SimpleGrid>
            {!forums?.length && (
              <EmptyState text={'No forum article yet'} />
            )}
          </Skeleton>
        </Box>
      </Box>
    </LayoutView>
  )
}

export default Auth(HotDrops)