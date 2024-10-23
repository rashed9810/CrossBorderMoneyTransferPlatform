"use client"
import MainLayout from '@/components/MainLayout/MainLayout';
import { TransactionSearchProvider } from '@/context/TransactionSearchContext';
import KYCProvider from '@/context/useKyc';
import '.././../styles/globals.css';
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {



    return (
        <KYCProvider>
            <TransactionSearchProvider>
                <section>
                    <MainLayout>
                        {children}
                    </MainLayout>

                </section>
            </TransactionSearchProvider>
        </KYCProvider>

    );
}
