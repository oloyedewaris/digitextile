import { Box, Center, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { RiArrowRightLine } from 'react-icons/ri';
import HotDropsCard from '../card/HotDropsCard';
import hotDrop from '@/constant/hot-drop'
import Link from 'next/link';
import avatar from '@/assets/images/avatar.png'
import { useQuery } from 'react-query';
import { fetchForums } from '@/apis/forum';
import { useRouter } from 'next/router';

const HotDrops = () => {
  const router = useRouter()
  const { data, isError, error, isLoading, refetch, } = useQuery(["fetchForums"], fetchForums);

  const forums = data?.data?.data


  return (
    <Box px={{ base: '10px', md: '48px' }} mt={{ base: '40px', md: '100px' }}>
      <Flex align='center' w='full' justify='space-between' mb={{ base: '20px', md: '52px' }}>
        <Text fontWeight={700} fontSize={{ base: '20px', md: '48px' }}>Hot Drops</Text>
        <Center gap='8px'>
          <Link href='/hot-drops'>
            <Text fontSize={{ base: '16px', md: '24px' }} color='#EF233C'>See More</Text>
          </Link>
          <RiArrowRightLine color='#EF233C' size='18' />
        </Center>
      </Flex>
      <Flex overflowX={{ base: 'scroll', md: 'clip' }} gap={{ base: '10px', md: '26px' }} >
        {(forums || []).map((card, i) => (
          <HotDropsCard
            key={i}
            image={card.image}
            title={card.title}
            person={card.creator?.image || avatar.src}
            onClickCard={() => router.push(`/hot-drop/${card?._id}`)}
          />
        ))}
      </Flex>
    </Box>
  )
}

export default HotDrops