import { useRouter } from 'next/router';
import LayoutView from '@/components/layout';
import Recommended from '@/components/home/Recommended';
import Categories from '@/components/home/Categories';
import HotDrops from '@/components/home/HotDrops';
import BottomBanner from '@/components/home/BottomBanner';
import TopBanner from '@/components/home/TopBanner';
import TopDeals from '@/components/home/TopDeals';
import Auth from '@/hoc/Auth';
import Button from '@/components/button';
import Link from 'next/link';

function Index() {
  const router = useRouter()

  return (
    <LayoutView>
      <TopBanner />
      <Categories />
      <Recommended />
      <TopDeals />
      <HotDrops />
      <BottomBanner
        button={(
          <Link href='/dashboard'>
            <Button
              mt={{ base: '25px', md: '32px' }}
              bg='white' borderRadius={'full'}
            >Rate Us</Button>
          </Link>
        )}
      />
    </LayoutView>
  );
}

export default Auth(Index)