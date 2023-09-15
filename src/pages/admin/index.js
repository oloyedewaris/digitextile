import React, { useEffect, useState } from 'react'
import { Box, Button, Center, CircularProgress, Flex, GridItem, HStack, SimpleGrid, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useToast } from "@chakra-ui/react";
import { useRouter } from 'next/router';
import LayoutView from '@/components/layout';
import Dashboard from './sections/Dashboard';
import { BiBox, BiChart, BiGridAlt, BiGroup, BiMessage, BiStore } from 'react-icons/bi';
import { FaBox, FaUsers } from 'react-icons/fa';
import Categories from './sections/Categories';
import Users from './sections/Users';
import Auth from '@/hoc/Auth';
import HotDropsAdmin from './sections/HotDrops';

const PatientProfile = () => {
  const toast = useToast()
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState(0);


  const tabs = [
    {
      tablist: "Dashboard",
      component: <Dashboard />,
      icon: <BiGridAlt size={25} />
    },
    {
      tablist: "Users",
      component: <Users />,
      icon: <BiGroup size={25} />
    },
    {
      tablist: "Categories",
      component: <Categories />,
      icon: <BiBox size={25} />
    },
    {
      tablist: "Forum",
      component: <HotDropsAdmin />,
      icon: <FaUsers size={25} />
    },
  ];

  const handleTabChange = (index) => {
    setTabIndex(index);
    // router.query = {
    //   id: index,
    //   tabName: tabs[index].tablist,
    // };
  };
  return (
    <LayoutView darkFooter>
      <Box
        color='#9F9898'
        mb={{ base: '30px', md: '90px' }}
        px={{ base: '20px', md: '70px' }}
        borderRadius={{ base: '12px', md: '24px' }}
      >
        <Tabs onChange={handleTabChange} isLazy >
          <Flex w='full' gap='20px' direction={{ base: 'column', md: 'row' }}>
            <Box w={{ base: '100%', md: '28%' }} p='24px' bg='white' borderRadius={{ md: '16px' }} h='fit-content'>
              <TabList flexDirection={{ base: 'row', md: 'column' }} gap='10px' fontWeight="600" fontSize="18px" border={'none'}>
                {tabs.map((item, index) => (
                  <Tab key={index} p='0' _focus={{ border: 'none', bg: 'transparent' }} border={'none'} w='full' mx='0'>
                    {tabIndex === index ? (
                      <Flex
                        justify={'flex-start'}
                        align={'center'}
                        color='#2B2D42' fontWeight='600'
                        bg='#D1DEF4' borderRadius='8px'
                        mx="0" w="full"
                        gap='20px'
                        px={{ base: '6px', md: '12px' }}
                        py={{ base: '8px', md: '16px' }}
                      >
                        {item.icon}
                        <Text display={{ base: 'none', md: 'block' }} fontSize={'22px'} fontWeight={500}>{item.tablist}</Text>
                      </Flex>
                    ) : (
                      <Flex
                        justify={'flex-start'}
                        align={'center'}
                        color='#A2A6AB' fontWeight='600'
                        borderRadius='8px'
                        mx="0" w="full"
                        gap='20px'
                        px={{ base: '6px', md: '12px' }}
                        py={{ base: '8px', md: '16px' }}
                      >
                        {item.icon}
                        <Text display={{ base: 'none', md: 'block' }} fontSize={'22px'} fontWeight={500}>{item.tablist}</Text>
                      </Flex>
                    )}
                  </Tab>
                ))}
              </TabList>
            </Box>

            <Box w={{ base: '100%', md: '72%' }} bg='white' borderRadius={{ base: '8px', md: '16px' }}>
              <TabPanels h='fit-content'>
                {tabs.map((item, index) => (
                  <TabPanel minH='80vh' key={index} px="0px">
                    {item.component}
                  </TabPanel>
                ))}
              </TabPanels>
            </Box>
          </Flex>
        </Tabs>
      </Box>
    </LayoutView>
  )
}

export default Auth(PatientProfile);