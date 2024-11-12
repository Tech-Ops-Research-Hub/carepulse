import Header from "../_components/header";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Patient Dashboard',
  description: 'Carepulse Patient Dashboard',
}

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="p-6 mx-auto relative">
      <Header />
      {children}
    </main>
  );
};