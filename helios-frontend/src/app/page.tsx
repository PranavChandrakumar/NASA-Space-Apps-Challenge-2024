import dynamic from 'next/dynamic';

const TestMap = dynamic(() => import('@/components/TestMap'), { ssr: false });

const Home = () => {
  return (
    <div>
      <TestMap />
    </div>
  );
};

export default Home;
