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

const Categories = () => {
  const router = useRouter();
  const toast = useToast();
  const { data, isError, error, isLoading, refetch, } = useQuery(["getCategories"], getCategoriesApi);

  const { isLoading: isDeleting, mutate } = useMutation(deleteCategoryApi, {
    onSuccess: async (res) => {
      toast({
        title: "Category deleted",
        description: `You have successfully deleted the category`,
        status: "success",
        duration: 5000,
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
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    },
  })

  return (
    <Box>
      <Flex py={{ base: '9px', md: '27px' }} px={{ base: '10px', md: '40px' }} justify={'space-between'} align={'center'}>
        <Text fontSize={{ base: '20px', md: '32px' }} fontWeight={700}>Categories</Text>
        <Link href='/admin/create-category'>
          <Button
            leftIcon={<BiPlus />}
            borderRadius='full' bg='#2B2D42'
            color='white'
          >
            Add Category
          </Button>
        </Link>
      </Flex>
      <Divider w='full' />
      <Skeleton minH='50vh' px={{ base: '10px', md: '38px' }} isLoaded={data?.data?.data?.map}>
        <SimpleGrid
          py={{ base: '7px', md: '38px' }}
          columns={{ base: '2', md: '3' }}
          columnGap={{ base: '10px', md: '26px' }}
          rowGap={{ base: '15px', md: '56px' }}
        >
          {data?.data?.data?.map((cat, i) => (
            <AdminCategoryCard
              deleting={isDeleting}
              onClickDelete={() => mutate(cat?._id)}
              id={cat._id}
              key={i}
              image={cat.image}
              title={cat.name}
              subTitle={cat.description}
            />
          ))}
        </SimpleGrid>
      </Skeleton>
    </Box>
  )
}

export default Categories