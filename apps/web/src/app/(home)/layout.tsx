import { Header } from '@zchemacraft/components/header';
import React from 'react';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
