import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PlanCity — Descubre. Vive. Conecta. Todo en tu Ciudad.",
  description: "La plataforma inteligente para descubrir eventos, restaurantes, parches urbanos, rooftops y el mejor talento local.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
