import dynamic from 'next/dynamic';
import OutputFields from '@/components/OutputFields';
import Footer from '@/components/Footer';

const TestMap = dynamic(() => import('@/components/TestMap'), { ssr: false });

const Home = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100dvh',
        width: '100dvw',
        overflow: 'hidden',
        justifyContent: 'space-between',
        flex: '1',
        backgroundColor: '#1C1B29',
        padding: 15,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <TestMap />
        <OutputFields />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
