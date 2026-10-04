import { lazy } from 'react';

const LandingPage = lazy(() => import('./LandingPage'));

export const Landing = () => {
  return <LandingPage />;
};
