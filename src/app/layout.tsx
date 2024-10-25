"use client";

import { ReactNode, useEffect } from 'react';
import '../styles/globals.css'
import NavigationContextProvider from '@/components/NavigationContext/NavigationContext';
import AuthContextProvider from '@/components/AuthContext/AuthContext';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();




interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {

  return (
    <html data-theme="light">
      <body>
        <SessionProvider>
          <AuthContextProvider>
            <NavigationContextProvider>

              <QueryClientProvider client={queryClient}>
                {children}
              </QueryClientProvider>

            </NavigationContextProvider>
          </AuthContextProvider>
        </SessionProvider>
      </body>
    </html>
  );
};

export default Layout;
