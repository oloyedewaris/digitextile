import LayoutView from '@/components/layout';
import Header from '@/components/home/Header';
import TopDeals from '@/components/home/TopDeals';
import Categories from '@/components/home/Categories';
import HotDrops from '@/components/home/HotDrops';
import Creator from '@/components/home/Creator';
import BottomBanner from '@/components/home/BottomBanner';
import Ecosystem from '@/components/home/Ecosystem';
import Artlerry from '@/components/home/Artlerry';
import LandingAuth from '@/hoc/LandingWrapper';
import Link from 'next/link';
import Button from '@/components/button';

function Index() {

  return (
    <LayoutView>
      <Header />
      <TopDeals />
      <Categories />
      <Ecosystem />
      <HotDrops />
      <Creator />
      {/* <Artlerry /> */}
      <BottomBanner
        button={(
          <Link href='/dashboard'>
            <Button
              mt={{ base: '25px', md: '32px' }}
              bg='white' borderRadius={'full'}
            >
              Join Digitextile
            </Button>
          </Link>
        )}
      />
    </LayoutView>
  );
}

export default LandingAuth(Index)