import { LayoutWrapper, TitleWrapper, MainContent } from "@/styles/LayoutStyles";
import ClientProvider from "./ClientProvider";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" style={{ height: "100%", margin: 0 }}>
      <head>
        <title>App Diversa</title>
        <meta name="description" content="Encuesta de App Diversa" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{ margin: 0, padding: 0, height: "100vh", display: "flex", flexDirection: "column" }}>
        <ClientProvider>
          <Header />
          <LayoutWrapper style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <TitleWrapper>App Diversa</TitleWrapper>
            <MainContent style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              {children}
            </MainContent>
          </LayoutWrapper>
          <Footer />
        </ClientProvider>
      </body>
    </html>
  );
}
