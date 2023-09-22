import { Box, Center, Divider, Flex, HStack, Image, Input, InputGroup, InputLeftAddon, SimpleGrid, Skeleton, Text, VStack, useDisclosure } from '@chakra-ui/react'
import React, { useContext } from 'react';
import Button from '@/components/button';
import { BiPlus } from 'react-icons/bi';
import FormSelect from '@/components/form/FromSelect';
import searchIcon from '@/assets/images/search-icon.png'
import MyListingCard from '@/components/card/MyListingCard';
import Link from 'next/link';
import { useQuery } from 'react-query';
import { fetchCreatorProfile, getUserProductApi } from '@/apis/user';
import EmptyState from '@/components/empty-state';
import { GlobalContext } from '@/context/Provider';
import { FilterCategory, FilterDate, FilterSection } from '@/components/elements';
import coverImg from '@/assets/images/store-bg.png';
import avatar from '@/assets/images/avatar.png';
import verified from '@/assets/svgs/verified.svg'
import { formatAmount } from '@/utils/formatAmount';
import infoBtn from '@/assets/svgs/info-button.svg';
import { RiStarSFill } from 'react-icons/ri';
import ReviewModal from '@/components/reviewModal';
import LayoutView from '@/components/layout';
import Auth from '@/hoc/Auth';
import { useRouter } from 'next/router';
import ProductCard from '@/components/card/ProductCard';

const MyStore = () => {
  const { authState: { user } } = useContext(GlobalContext)
  const router = useRouter()
  const creatorId = router.query.id;
  const creatorProfileQuery = useQuery(["fetchCreatorProfile", creatorId], () => fetchCreatorProfile(creatorId));

  const creatorProfile = creatorProfileQuery?.data?.data?.data

  const reviewModal = useDisclosure()

  return (
    <LayoutView darkFooter noFooter>
      <Box
        color='#9F9898'
        mb={{ base: '30px', md: '90px' }}
        px={{ base: '20px', md: '70px' }}
        borderRadius={{ base: '12px', md: '24px' }}
      >
        <Box p={{ base: '20px', md: '40px' }} bg='white' borderRadius={{ md: '16px' }} h='fit-content'>
          <Box
            w='full' h='200px'
            borderTopRightRadius={'8px'}
            borderTopLeftRadius={'8px'}
            bg={'rgba(28, 29, 44, 0.80)'}
          />

          <Flex align={'center'} w='full' justify={'space-between'} my={{ base: '20px', md: '40px' }}>
            <Flex w='40%' align={'center'} h='95px' gap='15px'>
              <Image src={avatar.src} borderRadius={'8px'} w='90px' h='90px' />
              <Flex direction='column' h='full' justify='space-between'>
                <Box>
                  <Text mb='4px' fontWeight={500} fontSize={'18px'} color='#212922'>
                    {creatorProfile?.profile?.fullname}
                  </Text>
                  <Text fontWeight={400} fontSize={'13px'} color='#212922' noOfLines={2}>
                    {creatorProfile?.profile?.bio}
                  </Text>
                </Box>
                <HStack spacing={'3px'} align={'center'} gap='2px' divider={<Divider orientation='vertical' h='5px' />}>
                  <Flex align={'center'}>
                    <Image src={verified.src} />
                    <Text fontWeight={400} fontSize={'13px'} color='#212922'>Verified Seller</Text>
                  </Flex>
                  <HStack align={'center'} gap='-2px' onClick={reviewModal.onOpen}>
                    <RiStarSFill />
                    <RiStarSFill />
                    <RiStarSFill />
                  </HStack>
                </HStack>
              </Flex>
            </Flex>

            <Flex w='40%' direction='column' h='full' justify='center'>
              <Text fontWeight={500} fontSize={'18px'} color='#212922'>
                This seller is Verified!
              </Text>
              <Text fontWeight={400} fontSize={'13px'} color='#212922' noOfLines={2}>
                You transact with this seller more conveniently. Watch out for Verified Sellers
              </Text>
              <HStack spacing={'3px'} align={'center'}>
                <Image src={infoBtn.src} />
                <Text fontWeight={400} fontSize={'10px'} color='#1565C0'>Safety tips</Text>
              </HStack>
            </Flex>
          </Flex>
          <InputGroup border='1px' borderRadius={'full'} w='full' pr='15px'>
            <Input
              _focus={{ border: 'none', outline: 'none' }}
              border={'none'}
              placeholder="Search your listings"
            // w='full'
            />
            <InputLeftAddon
              bg={'transparent'}
              p={"0px"}
              border={"none"}
            >
              <Image alt='next_image' src={searchIcon.src} />
            </InputLeftAddon>
          </InputGroup>

          <Flex my={{ base: '20px', md: '40px' }} gap={{ base: '10px' }} align={{ base: 'flex-start', md: 'center' }} direction={{ base: 'column', md: 'row' }} justify={'space-between'}>
            <Flex gap={{ base: '6px', md: '16px' }}>
              <FilterCategory />
              <FilterSection />
              <FilterDate />
            </Flex>
          </Flex>

          <Skeleton isLoaded={!creatorProfileQuery?.isLoading}>
            <SimpleGrid columns={{ base: '2', md: '3' }} columnGap={{ base: '10px', md: '10px' }} rowGap={{ base: '15px', md: '30px' }}>
              {creatorProfile?.products?.map((product, i) => (
                <ProductCard
                  id={product._id}
                  key={i}
                  images={product.images}
                  title={product.title}
                  subTitle={product.description}
                  price={`N${formatAmount(product.price)}`}
                  persons={product.persons || []}
                />
              ))}
            </SimpleGrid>
            {!creatorProfile?.products?.length && (
              <EmptyState text={'No user listing yet'} />
            )}
          </Skeleton>
        </Box>
        <ReviewModal modal={reviewModal} />
      </Box>
    </LayoutView>
  )
}

export default Auth(MyStore)