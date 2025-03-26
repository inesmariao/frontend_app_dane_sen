'use client';

import React from 'react';
import Link from 'next/link';
import Spinner from '@/components/common/Spinner';
import { useSystemMessage } from '@/hooks/useSystemMessage';
import StyledButton from '@/styles/components/StyledButton';
import { Container, Card, Title, Content } from '@/styles/components/SystemCardStyles';

export default function NotFoundPage() {
  const { html: errorMessage, loading } = useSystemMessage('error404_message');

  return (
    <Container>
      <Card>
        <Title>Error en AppDiversa</Title>
        {loading ? (
          <Spinner />
        ) : (
          <>
            {errorMessage && <Content dangerouslySetInnerHTML={errorMessage} />}
            <Link href="/">
              <StyledButton>Volver al inicio</StyledButton>
            </Link>
          </>
        )}
      </Card>
    </Container>
  );
}
