import { MotionConfig } from 'framer-motion';
import { lazy, Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.scss';
import { AppProviders } from './context/AppProviders';
import { Landing } from './pages/landing';
import { PageLoading } from './components/Loading';
import { ErrorBoundary } from './components/ErrorBoundary';
import Home from './pages/home';

const About = lazy(() => import('./pages/about'));
const Experience = lazy(() => import('./pages/experience'));
const Projects = lazy(() => import('./pages/projects'));
const Links = lazy(() => import('./pages/links'));

export default function App() {
  return (
    <ErrorBoundary>
      {/* Honour the OS reduced-motion setting: transforms and layout snap, opacity still fades. */}
      <MotionConfig reducedMotion="user">
        <Router>
          <Routes>
            <Route
              path="/*"
              element={
                <AppProviders>
                  <Landing />
                </AppProviders>
              }
            >
              <Route index element={<Home key="home" />} />
              <Route
                path="about"
                element={
                  <Suspense fallback={<PageLoading />}>
                    <About key="about" />
                  </Suspense>
                }
              />
              <Route
                path="experience"
                element={
                  <Suspense fallback={<PageLoading />}>
                    <Experience key="experience" />
                  </Suspense>
                }
              />
              <Route
                path="projects"
                element={
                  <Suspense fallback={<PageLoading />}>
                    <Projects key="projects" />
                  </Suspense>
                }
              />
              <Route
                path="links"
                element={
                  <Suspense fallback={<PageLoading />}>
                    <Links key="links" />
                  </Suspense>
                }
              />
            </Route>
          </Routes>
        </Router>
      </MotionConfig>
    </ErrorBoundary>
  );
}
