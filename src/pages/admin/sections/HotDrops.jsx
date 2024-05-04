import { Box, Center, Divider, Flex, SimpleGrid, Skeleton, Text, useToast } from '@chakra-ui/react';
import React from 'react';
import { RiArrowRightLine } from 'react-icons/ri';
import AdminCategoryCard from '@/components/card/AdminCategoryCard';
import Link from 'next/link';
import { deleteCategoryApi, getCategoriesApi } from '@/apis/category';
import { useMutation, useQuery } from 'react-query';
import { useRouter } from 'next/router';
import Button from '@/components/button';
import { BiPlus } from 'react-icons/bi';
import { fetchPendingForums } from '@/apis/admin';
import HotDropDetail from '@/components/card/HotDropsCardDetails';
import EmptyState from '@/components/empty-state';

const HotDropsAdmin = () => {
  const router = useRouter();
  const toast = useToast();
  const { data, isError, error, isLoading, refetch, } = useQuery(["fetchPendingForums"], fetchPendingForums);
  const forums = data?.data?.data

  const { isLoading: isDeleting, mutate } = useMutation(deleteCategoryApi, {
    onSuccess: async (res) => {
      toast({
        title: "Category deleted",
        description: `You have successfully deleted the category`,
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
      await refetch()
      return
    },
    onError: (err) => {
      toast({

        description: `${err.response?.data?.message || 'Something went wrong, try again'}`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    },
  })

  return (
    <Box>
      <Flex py={{ base: '9px', md: '27px' }} px={{ base: '10px', md: '40px' }} justify={'space-between'} align={'center'}>
        <Text fontSize={{ base: '20px', md: '32px' }} fontWeight={700}>Hot Drops</Text>
      </Flex>
      <Divider w='full' />
      <Skeleton isLoaded={!isLoading}>
        <SimpleGrid my={{ base: '20px', md: '40px' }} columns={{ base: '1', md: '2' }} columnGap={{ base: '10px', md: '26px' }} rowGap={{ base: '15px', md: '56px' }}>
          {forums?.map((card, i) => (
            <HotDropDetail
              status={card?.approvalStatus}
              user={card?.creator?.fullname}
              subTitle={card?.content}
              onClickCard={() => router.push(`/admin/hot-drop/${card?._id}`)}
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
  )
}

export default HotDropsAdmin