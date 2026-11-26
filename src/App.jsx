import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { CMSProvider } from './context/CMSContext';

const HomePage = lazy(() => import('./pages/HomePage'));
const CollectionPage = lazy(() => import('./pages/CollectionPage'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F2EC]">
      <div className="flex flex-col items-center gap-3">
        <span className="font-display font-semibold tracking-widest text-lg text-[#181818] animate-pulse">
          ATELIER
        </span>
        <div className="w-8 h-[2px] bg-[#72503C] animate-pulse-subtle" />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <CMSProvider>
      <HashRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Dashboard / CMS Route */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/cms" element={<DashboardPage />} />
            <Route path="/admin-cms" element={<DashboardPage />} />

            {/* Public Showroom Routes (Wrapped in Layout) */}
            <Route
              path="/*"
              element={
                <Layout>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/collections" element={<CollectionPage />} />
                    <Route path="/collections/:category" element={<CollectionPage />} />
                    <Route path="/products/:slug" element={<ProductPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </Layout>
              }
            />
          </Routes>
        </Suspense>
      </HashRouter>
    </CMSProvider>
  );
}
