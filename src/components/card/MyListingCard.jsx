import React from "react";
import {
  Box,
  HStack,
  VStack,
  Image,
  Text,
  Center,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import ImageGallery from 'react-image-gallery';
import { BiHeart } from "react-icons/bi";
import Link from "next/link";
import edit from '@/assets/svgs/edit-listing.svg'
import { useMutation } from "react-query";
import { deleteProductApi } from "@/apis/product";

const MyListingCard = ({
  title,
  images,
  subTitle,
  onClickCard,
  persons,
  price,
  id
}) => {
  const imagesToUse = images.map(image => ({
    original: image,
    thumbnail: image,
  }));
  const toast = useToast();


  const { isLoading: deleting, mutate } = useMutation(() => deleteProductApi(id), {
    onSuccess: (res) => {
      toast({
        title: `Deleted`,
        description: `Listing deleted`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    },
    onError: (err) => {
      toast({
        title: `"Oops...`,
        description: `${err.response?.data?.message || 'Something went wrong, try again'}`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    },
  })


  return (
    <Box
      bg='white'
      p={{ base: '8px', md: '16px' }}
      mx={'auto'}
      w='100%'
      borderRadius={{ base: '8px', md: '16px' }}
      border='0.812px solid #000'
      overflow='hidden'
      maxWidth={"322px"}
      onClick={onClickCard}
    >
      <ImageGallery
        renderItem={(image) => (
          <Image
            borderRadius={{ base: 'sm', md: 'md' }}
            bgPosition={'center'}
            bgSize={"cover"}
            w='full'
            maxW='290px'
            h={{ base: 'auto', md: "120px" }}
            src={image.original}
          />
        )}
        showThumbnails={false}
        showNav={false}
        showPlayButton={false}
        showFullscreenButton={false}
        showBullets={true}
        items={imagesToUse}
      />

      <VStack mt={"8px"} align={"start"} color='#1C1D2C'>
        <Text fontSize={{ base: '13px', md: '20px' }} fontWeight='500' noOfLines={1}>{title}</Text>
        <Text fontSize={{ base: '10px', md: '12px' }} noOfLines={2}>{subTitle}</Text>
        <HStack justify={"space-between"} w={"100%"} mt='12px' fontSize={{ base: '10px', md: '14px' }} fontWeight={500}>
          <VStack align={'stretch'} spacing={'6px'}>
            <Text fontSize={'11px'} color='#C4C4C4'><span style={{ color: '#1C1D2C' }}>4.5</span>(72 Sales)</Text>
            <Text fontSize={{ base: '8px', md: '14px' }}><span style={{ color: '#C4C4C4' }}>Price:</span> {price}</Text>
          </VStack>

          <Menu h="fit-content">
            <MenuButton disabled={deleting} color='white' variant={'link'} rounded={'full'} cursor={'pointer'} alignItems='center'>
              <Center border={'0.812px solid #2B2D42'} px='11px' py='5px' borderRadius={'full'}>
                <Image src={edit.src} />
              </Center>
            </MenuButton>
            <MenuList style={{ height: 'fit-content' }}>
              <MenuItem>
                <Link href={`/edit-listing/${id}`}>Edit Listing</Link>
              </MenuItem>
              <MenuItem>
                <Text onClick={mutate} cursor={'pointer'}>Delete listing</Text>
              </MenuItem>
              <MenuItem>
                <Text>Copy listing code</Text>
              </MenuItem>
            </MenuList>
          </Menu>

        </HStack>
      </VStack>
    </Box>
  );
};


export default MyListingCard;




