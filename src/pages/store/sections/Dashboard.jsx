import { Box, Divider, Flex, HStack, Image, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import React, { useContext } from 'react';
import avatar from '@/assets/images/avatar.png'
import Button from '@/components/button';
import { BiPlus } from 'react-icons/bi';
import FormSelect from '@/components/form/FromSelect';
import Link from 'next/link';
import { GlobalContext } from '@/context/Provider';
import { getUserProductsApi } from '@/apis/product';
import { useQuery } from 'react-query';

const Dashboard = () => {
  const { authState: { user } } = useContext(GlobalContext)
  const { data, isError, error, isLoading, refetch, } = useQuery(["getUserProductsApi"], () => getUserProductsApi({ page: 1, limit: 8 }));
  const products = data?.data?.data;

  return (
    <Box>
      <Flex py={{ base: '9px', md: '27px' }} px={{ base: '10px', md: '40px' }} justify={'space-between'} align={'center'}>
        <Text fontSize={{ base: '20px', md: '32px' }} fontWeight={700}>Dashboard</Text>
        <Text color='#1C1D2C' fontSize={{ base: '12px', md: '16px' }} fontWeight={500}>Welcome, {user?.fullname}</Text>
      </Flex>
      <Divider w='full' />

      <Box p={{ base: '15px', md: '40px' }}>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap='15px' align={'center'}>
          <Flex
            direction={'column'}
            align={'stretch'}
            justify={'space-between'}
            borderRadius={'16px'}
            bg='#F4FFF7' h='150px'
            p='24px' w='full'
            border='1px solid #E4DFDA'
          >
            <Flex justify={'space-between'} align={'center'} w='full'>
              <Text color='#1C1D2C' fontSize={'20px'} fontWeight={500}>All Inquiries</Text>
              <Text fontSize={'12px'} fontWeight={500} color='#08AD36'>+12%</Text>
            </Flex>
            <Text fontSize={'32px'} fontWeight={500} color='#1C1D2C'>3200</Text>
          </Flex>
          <Flex
            direction={'column'}
            align={'stretch'}
            justify={'space-between'}
            borderRadius={'16px'}
            bg='#FFF4F4' h='150px'
            p='24px' w='full'
            border='1px solid #E4DFDA'
          >
            <Flex justify={'space-between'} align={'center'} w='full'>
              <Text color='#1C1D2C' fontSize={'20px'} fontWeight={500}>Total Views</Text>
              <Text fontSize={'12px'} fontWeight={500} color='#EF233C'>+12%</Text>
            </Flex>
            <Text fontSize={'32px'} fontWeight={500} color='#1C1D2C'>2508</Text>
          </Flex>
          <Flex
            direction={'column'}
            align={'stretch'}
            justify={'space-between'}
            borderRadius={'16px'}
            bg='#F4FFF7' h='150px'
            p='24px' w='full'
            border='1px solid #E4DFDA'
          >
            <Flex justify={'space-between'} align={'center'} w='full'>
              <Text color='#1C1D2C' fontSize={'20px'} fontWeight={500}>All Sales</Text>
              <Text fontSize={'12px'} fontWeight={500} color='#08AD36'>+12%</Text>
            </Flex>
            <Text fontSize={'32px'} fontWeight={500} color='#1C1D2C'>805</Text>
          </Flex>
        </SimpleGrid>
        {/* <Text mt={{ base: '20px', md: '40px' }} color={'#1C1D2C'} fontSize={'24px'} fontWeight={600}>Recent Inquiries</Text>
        <VStack
          mt={{ base: '20px', md: '40px' }}
          px={{ base: '20px', md: '40px' }}
          py={{ base: '15px', md: '30px' }}
          align={'stretch'} shadow='md'
          borderRadius={{ base: '8px', md: '16px' }}
          spacing={{ base: '20px', md: '32px' }} border='1px solid #9F9898'
        >
          {Array(4).fill(1).map(user => (
            <Flex justify='space-between' align='center'>
              <Flex gap={{ base: '10px', md: '16px' }} align={'center'} w='30%'>
                <Image src={avatar.src} h={{ base: '25px', md: '40px' }} w={{ base: '25px', md: '40px' }} borderRadius={'full'} />
                <Text noOfLines={1}>Tejumade Olomola</Text>
              </Flex>
              <Text w='50%' noOfLines={{ base: 1, md: 2 }}>Orci magna amet nunc sit mauris condimentum. Massa dolor nam vulputate viverra. Ullamcorper aliquet aliquet et.</Text>
              <Text textDecoration={'underline'} color='#3F51B5' fontSize={{ base: '12px', md: '16px' }} fontWeight={500}>Reply</Text>
            </Flex>
          ))}
        </VStack> */}

        <Text mt={{ base: '20px', md: '40px' }} color={'#1C1D2C'} fontSize={'24px'} fontWeight={600}>My Listings</Text>
        <Flex my={{ base: '20px', md: '40px' }} gap={{ base: '10px' }} align={{ base: 'flex-start', md: 'center' }} direction={{ base: 'column', md: 'row' }} justify={'space-between'}>
          <Flex gap={{ base: '6px', md: '16px' }}>
            <FormSelect
              bg='#E4DFDA'
              placeholder={'Category'}
              options={[]}
            />
            <FormSelect
              bg='#E4DFDA'
              placeholder={'Section'}
              options={[]}
            />
            <FormSelect
              bg='#E4DFDA'
              placeholder={'Date'}
              options={[]}
            />
          </Flex>
          <Link href='/create-listing'>
            <Button
              leftIcon={<BiPlus />}
              // onClick={formik.handleSubmit}
              borderRadius='full' bg='#2B2D42'
              // h='55px' mt='55px'
              color='white'
            >
              Add Listing
            </Button>
          </Link>
        </Flex>
        <Flex justify='space-between' align='center' bg='#F0FFEC' borderRadius={'8px'} px='30px' py='16px'>
          <Text fontSize={{ base: '12px', md: '16px' }} fontWeight={600} color='#1C1D2C'>Listings</Text>
          <Text fontSize={{ base: '12px', md: '16px' }} fontWeight={600} color='#1C1D2C'>Category</Text>
          <Text fontSize={{ base: '12px', md: '16px' }} fontWeight={600} color='#1C1D2C'>Price</Text>
        </Flex>
        <VStack
          mt={{ base: '20px', md: '40px' }}
          px={{ base: '20px', md: '40px' }}
          py={{ base: '15px', md: '30px' }}
          align={'stretch'} shadow='md'
          borderRadius={{ base: '8px', md: '16px' }}
          spacing={{ base: '20px', md: '32px' }} border='1px solid #9F9898'
        >
          {console.log('products', products)}
          {(products || []).map(product => (
            <Link href={`/product/${product._id}`}>
              <Flex justify='space-between' align='center'>
                <Flex gap={{ base: '8px', md: '16px' }} align={'center'} w='30%'>
                  {product.images[0] && (
                    <Image
                      src={product.images[0]}
                      h={{ base: '25px', md: '40px' }}
                      w={{ base: '25px', md: '40px' }}
                      borderRadius={'8px'}
                    />
                  )}
                  <VStack align={'stretch'} spacing={{ base: '0px', md: '4px' }}>
                    <Text noOfLines={1} fontWeight={500}>{product.title}</Text>
                    <Text noOfLines={1} fontWeight={500} fontSize={'12px'}>Inquiries: 4</Text>
                  </VStack>
                </Flex>
                <Text w='50%' noOfLines={{ base: 1, md: 2 }}>{product.description}</Text>
                <Text textDecoration={'underline'} color='#3F51B5' fontSize={{ base: '12px', md: '16px' }} fontWeight={500}>Reply</Text>
              </Flex>
            </Link>
          ))}
        </VStack>
      </Box>
    </Box >
  )
}

export default Dashboard