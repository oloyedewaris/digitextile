import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GlobalContext } from '../context/Provider';
import LayoutView from '@/components/layout';
import Header from '@/components/home/Header';
import HorizontalScroll from '@/components/home/HorizontalScroll';
import TopDeals from '@/components/home/TopDeals';
import Categories from '@/components/home/Categories';
import HotDrops from '@/components/home/HotDrops';
import Creator from '@/components/home/Creator';
import BottomBanner from '@/components/home/BottomBanner';
import Ecosystem from '@/components/home/Ecosystem';
import Artlerry from '@/components/home/Artlerry';
import Footer from '@/components/home/Footer';

function Index() {
  const router = useRouter()
  const { authState } = useContext(GlobalContext)

  return (
    <LayoutView noPadding>
      <Header />
      {/* <HorizontalScroll /> */}
      <TopDeals />
      <Categories />
      <Ecosystem />
      <HotDrops />
      <Creator />
      <Artlerry />
      <BottomBanner />
      <Footer />
    </LayoutView>
  );
}

export default Index