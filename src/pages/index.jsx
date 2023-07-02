import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GlobalContext } from '../context/Provider';
import LayoutView from '@/components/layout';
import Header from '@/components/home/Header';
import { Box } from '@chakra-ui/react';
import HorizontalScroll from '@/components/home/HorizontalScroll';
import TopDeals from '@/components/home/TopDeals';
import Categories from '@/components/home/Categories';
import HotDrops from '@/components/home/HotDrops';
import Creator from '@/components/home/Creator';

function Index() {
  const router = useRouter()
  const { authState } = useContext(GlobalContext)

  return (
    <LayoutView noPadding>
      <Box mt='130px' px={'84px'}>
        <Header />
      </Box>
      <HorizontalScroll />
      <TopDeals />
      <Categories />
      <HotDrops />
      <Creator />
    </LayoutView>
  );
}

export default Index