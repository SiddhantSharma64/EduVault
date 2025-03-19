import '@/styles/globals.css';
import React from 'react';
import { Navbar } from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AppProvider } from '@/lib/context/AppContext';

// Define AppProps type since we don't have Next.js
interface AppProps {
  Component: React.ComponentType<any>;
  pageProps: any;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
} 