import type { Metadata } from "next";
import Header from "./_components/header";

export const metadata: Metadata = {
  title: "CarePulse Patient",
  description: "Patient onboarding form",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="p-6 max-w-7xl mx-auto relative">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
};
