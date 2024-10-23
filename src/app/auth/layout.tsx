import '.././../styles/globals.css';

export const metadata = {
  title: 'Diasporex-Auth',
  description: 'Diasporex Auth',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>

      {children}
      {/* <Toaster /> */}
    </section>

  );
}
