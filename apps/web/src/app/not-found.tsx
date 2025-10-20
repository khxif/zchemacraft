"use client";

import Lottie from 'lottie-react';
import NotFoundAnimation from './assets/not-found.json';

export default function NotFound() {
  return (
    <div className="w-full flex h-svh items-center justify-center">
      <Lottie animationData={NotFoundAnimation} loop={true} />
    </div>
  );
}
