'use client';

import { apiClient } from '@zchemacraft/data-accessors/apiClient';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import dynamic from 'next/dynamic';
import { SiDrizzle, SiMongodb, SiPrisma } from 'react-icons/si';
import { auth } from '../firebase/config';
import { useGoogleSignInMutation } from '@zchemacraft/hooks/mutations';

const Snippets = dynamic(() => import('../components/snippets').then(mod => mod.Snippets));

export default function Home() {
  const { mutateAsync } = useGoogleSignInMutation();

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(auth, provider);
    const idToken = await result.user.getIdToken();

    apiClient.defaults.headers.common['Authorization'] = `Bearer ${idToken}`;

    const data = await mutateAsync();
    console.log(data);
  }

  return (
    <main className="pb-10">
      {/* <button onClick={signInWithGoogle}>Login</button> */}
      <div className="font-sans">
        <div className="bg-gray-50 dark:bg-black py-8 sm:py-12 px-4 transition-colors duration-300">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-12 transition-all duration-500 ease-out">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-sm font-medium tracking-wide transition-colors duration-300 mb-4 sm:mb-6">
                MOCK DATA, INSTANTLY!
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mt-4 sm:mt-6 mb-4 sm:mb-6 leading-tight transition-colors duration-300">
                Generate realistic mock data
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>from your schemas effortlessly
              </h1>

              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed transition-colors duration-300">
                Enter Mongoose, Prisma, or Drizzle schemas and instantly get fake data for testing
                or seeding. No complicated setup, works with all popular frameworks.
              </p>

              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-16">
                {frameworks.map(fw => (
                  <button
                    key={fw.name}
                    className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border 
        transition-all duration-200 hover:scale-105 hover:shadow-md"
                  >
                    {fw.icon}
                    <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                      {fw.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Snippets />

      <p className="text-muted-foreground text-sm text-center font-medium mt-10">
        Developed by{' '}
        <a href="https://khaif.is-a.dev" target="_blank" className="underline">
          Khaif
        </a>
      </p>
    </main>
  );
}

const frameworks = [
  {
    name: 'Mongoose',
    icon: <SiMongodb className="w-4 h-4 mr-1.5 sm:mr-2 text-green-400" />,
  },
  {
    name: 'Prisma',
    icon: <SiPrisma className="w-4 h-4 mr-1.5 sm:mr-2 text-blue-500" />,
  },
  {
    name: 'Coming soon..',
    icon: <SiDrizzle className="w-4 h-4 mr-1.5 sm:mr-2 text-yellow-300" />,
  },
];
