import dynamic from 'next/dynamic';

const TestMap = dynamic(() => import('@/components/TestMap'), { ssr: false });

const Home = () => {
  return (
    <div style={{ backgroundColor:'#1C1B29'}}>
      <TestMap />
    </div>
  );
};

export default Home;
