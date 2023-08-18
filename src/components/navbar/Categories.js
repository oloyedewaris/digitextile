import React from 'react'
import { Flex, Text, MenuList, Menu, MenuButton, MenuItem } from '@chakra-ui/react';
import Link from 'next/link';
import { RiArrowDownSLine } from 'react-icons/ri';
import { motion } from 'framer-motion';
import { useQuery } from 'react-query';
import { getCategoriesApi } from '@/apis/category';

const Categories = () => {
  const { data } = useQuery(["getCategories"], getCategoriesApi);
  const categories = data?.data?.data

  return (
    <Menu h="fit-content">
      <MenuButton w='178px' color='white' variant={'link'} rounded={'full'} cursor={'pointer'} alignItems='center'>
        <Flex
          gap={'8px'} as={motion.div}
          align={'center'} justifyContent={'center'}
          cursor={'pointer'} whilehover={{ scale: 1.1 }}
          whiletap={{ scale: 0.9 }}
        >
          <Text color='#000000'>Categories</Text>
          <RiArrowDownSLine color='#2B2D42' size={25} />
        </Flex>
      </MenuButton>
      <MenuList style={{ height: 'fit-content' }} w='280px'>
        {categories?.map(category => (
          <MenuItem>
            <Link href={`/category/${category?._id}?category=${category?.name}`}>
              <Text color='#919191' fontWeight='400' my='10px' fontSize={'16px'} pl='20px'>
                {category?.name}
              </Text>
            </Link>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default Categories