"use client";

import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getSystemMessage } from "@/utils/api";
import StyledButton from "@/styles/components/StyledButton";
import {
  WelcomeCard,
  Title,
  Subtitle
} from "@/styles/components/StyledHome";


export default function Home() {
  const router = useRouter();
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    const fetchWelcomeMessage = async () => {
      const data = await getSystemMessage("welcome_message");
      setContent(data?.content || "Bienvenido/a AppDiversa");
    };
    fetchWelcomeMessage();
  }, []);

  const handleNext = () => router.push("/login");


  return (
    <>
      <Head>
        <title>AppDiversa - Bienvenida</title>
        <meta name="description" content="Página de bienvenida de App Recolección Datos" />
      </Head>
      <WelcomeCard>
        <Title>¡Bienvenido/a AppDiversa!</Title>
        <Subtitle dangerouslySetInnerHTML={{ __html: content || "" }} />
        <StyledButton onClick={handleNext}>Siguiente</StyledButton>
      </WelcomeCard>
    </>
  );
}
