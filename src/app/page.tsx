'use client';

import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getSystemMessage } from '@/utils/api';
import StyledButton from '@/styles/components/StyledButton';
import {
  WelcomeCard,
  Title,
  Subtitle
} from '@/styles/components/StyledHome';
import Spinner from '@/components/common/Spinner';

export default function Home() {
  const router = useRouter();
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWelcomeMessage = async () => {
      const data = await getSystemMessage('welcome_message');
      setContent(data?.content || 'Bienvenido/a AppDiversa');
      setLoading(false);
    };
    fetchWelcomeMessage();
  }, []);

  const handleNext = () => router.push('/login');

  return (
    <>
      <Head>
        <title>AppDiversa - Bienvenida</title>
        <meta name="description" content="Página de bienvenida de App Recolección Datos" />
      </Head>
      <WelcomeCard>
        <Title>¡Bienvenido/a AppDiversa!</Title>

        {loading ? (
          <Spinner />
        ) : (
          <Subtitle dangerouslySetInnerHTML={{ __html: content || '' }} />
        )}

        {!loading && <StyledButton onClick={handleNext}>Siguiente</StyledButton>}
      </WelcomeCard>
    </>
  );
}
