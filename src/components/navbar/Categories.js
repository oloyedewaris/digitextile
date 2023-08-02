import React from 'react'
import { Flex, Text, MenuList, Menu, MenuButton, MenuItem } from '@chakra-ui/react';
import Link from 'next/link';
import { RiArrowDownSLine } from 'react-icons/ri';
import { motion } from 'framer-motion';
import categoriesData from '@/utils/categories.json'

const Categories = () => {

  return (
    <Menu h="fit-content">
      <MenuButton w='178px' color='white' variant={'link'} rounded={'full'} cursor={'pointer'} alignItems='center'>
        <Flex gap={'8px'} as={motion.div} align={'center'} justifyContent={'center'} cursor={'pointer'}
          whiletap={{ scale: 0.9 }} whilehover={{ scale: 1.1 }}
        >
          <Text color='#000000'>Categories</Text>
          <RiArrowDownSLine color='#2B2D42' size={25} />
        </Flex>
      </MenuButton>
      <MenuList style={{ height: 'fit-content' }} w='280px'>
        {categoriesData.map(category => (
          <MenuItem>
            <Text color='#919191' fontWeight='400' my='10px' fontSize={'16px'} pl='20px'>
              {category}
            </Text>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default Categories