'use client';

import { Container, Card, Title, Content, EmailInfo } from '@/styles/components/SystemCardStyles';
import Link from 'next/link';
import StyledButton from '@/styles/components/StyledButton';
import { useSystemMessage } from '@/hooks/useSystemMessage';
import { AiOutlineMail } from 'react-icons/ai';
import Spinner from '@/components/common/Spinner';



export default function ContactPage() {
  const { html: contactMessage, loading: loadingMessage } = useSystemMessage('contact_message');
  const { text: contactEmail, loading: loadingEmail } = useSystemMessage('contact_email');

  const loading = loadingMessage || loadingEmail;

  return (
    <Container>
      <Card>
        <Title>Contacto AppDiversa</Title>

        {loading ? (
          <Spinner />
        ) : (
          <>
            {contactMessage && <Content dangerouslySetInnerHTML={contactMessage} />}


            {contactEmail && (
              <EmailInfo>
                <AiOutlineMail size={32} />
                {contactEmail}
              </EmailInfo>
            )}

            <Link href="/surveys">
              <StyledButton>Ir a las encuestas</StyledButton>
            </Link>
          </>
        )}
      </Card>
    </Container>
  );
}
