import Header from "../_components/header";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Carepulse Patient',
  description: 'Patient onboarding form',
}

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="p-6 max-w-7xl mx-auto relative">
      <Header />
      {children}
    </main>
  );
};