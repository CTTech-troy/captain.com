import { lazy } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { IntroProvider } from './contexts/IntroContext';
const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const About = lazy(() => import('./pages/About').then(module => ({ default: module.About })));
const Contact = lazy(() => import('./pages/Contact').then(module => ({ default: module.Contact })));
const Insights = lazy(() => import('./pages/Insights').then(module => ({ default: module.Insights })));
const Legal = lazy(() => import('./pages/Legal').then(module => ({ default: module.Legal })));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail').then(module => ({ default: module.ServiceDetail })));
const ServicesIndex = lazy(() => import('./pages/ServicesIndex').then(module => ({ default: module.ServicesIndex })));
const NotFound = lazy(() => import('./pages/NotFound').then(module => ({ default: module.NotFound })));

const defaultPages = { Home, About, Contact, Insights, Legal, ServiceDetail, ServicesIndex, NotFound };
export function AppRoutes({ pages = defaultPages }: { pages?: { [K in keyof typeof defaultPages]: React.ComponentType } }) {
  const { Home, About, Contact, Insights, Legal, ServiceDetail, ServicesIndex, NotFound } = pages;
  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence initial={false}>
        <div key="website">
          <IntroProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="insights" element={<Insights />} />
                <Route path="services" element={<ServicesIndex />} />
                <Route path="services/:slug" element={<ServiceDetail />} />
                <Route path="legal/:slug" element={<Legal />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </IntroProvider>
        </div>
      </AnimatePresence>
    </MotionConfig>
  );
}
