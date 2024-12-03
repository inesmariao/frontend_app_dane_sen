import { Metadata } from "next";

export const metadata: Metadata = {
  title: "App Diversa",
  description: "Encuesta de App Diversa",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootServerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
