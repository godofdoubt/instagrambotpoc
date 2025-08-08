// C:\Users\Mert\Desktop\instabot\frontend\pages\index.tsx

import Head from 'next/head';
// Import your component from the new components directory
import InstagramContentCreator from '../components/InstagramContentCreator'; // Adjust path if needed based on where you put it relative to index.tsx

export default function Home() {
  return (
    <>
      <Head>
        <title>Instagram Creator Pro</title>
        <meta name="description" content="AI-powered Instagram content & visual creation" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Render your InstagramContentCreator component */}
      <InstagramContentCreator />
    </>
  );
}