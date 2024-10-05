import dynamic from 'next/dynamic';
import OutputFields from '@/components/OutputFields';

const TestMap = dynamic(() => import('@/components/TestMap'), { ssr: false });

const Home = () => {
  return (
    <div style={{display:'flex'}}>
      <TestMap />
      <OutputFields />
    </div>
  );
};

export default Home;
