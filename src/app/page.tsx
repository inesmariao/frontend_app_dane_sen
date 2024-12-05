"use client";

import Head from "next/head";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import StyledButton from "@/styles/components/StyledButton";

const WelcomeCard = styled.div`
  background: #fff;
  border-radius: 0.9375rem;
  padding: 2rem;
  box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 37.5rem;
  width: 90%;
  margin: auto;

  @media (max-width: 47.9375rem) {
    margin: 1.5rem;
    max-width: 95%;
    padding: 1.5rem;
  }

  @media (min-width: 48rem) and (max-width: 64rem) {
    max-width: 34.375rem;
  }

  @media (min-width: 64rem) {
    max-width: 40.625rem;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #413087;

  @media (max-width: 47.9375rem) {
    font-size: 1.5rem;
    line-height: 1.2;
  }

  @media (min-width: 48rem) and (max-width: 64rem) {
    font-size: 1.8rem;
    line-height: 1.6;
  }

  @media (min-width: 64rem) {
    font-size: 2.1rem;
    line-height: 1;
  }
`;

const Subtitle = styled.div`
  margin-top: 1rem;
  color: #666;
  line-height: 1.5;

  p {
    margin-bottom: 1rem;
    font-size: 1rem;

    @media (max-width: 47.9375rem) {
      font-size: 0.9rem;
      line-height: 1.4;
    }

    @media (min-width: 48rem) and (max-width: 64rem) {
      font-size: 1rem;
      line-height: 1.3;
    }

    @media (min-width: 64rem) {
      font-size: 1.1rem;
    }
  }
`;

export default function Home() {
  const router = useRouter();

  const handleNext = () => {
    router.push("/surveys");
  };

  return (
    <>
      <Head>
        <title>App Diversa - Bienvenida</title>
        <meta name="description" content="Página de bienvenida de App Diversa" />
      </Head>
      <WelcomeCard>
        <Title>¡Bienvenido/a a la App Diversa!</Title>
        <Subtitle>
          <p>
            Desde el DANE queremos darte las gracias por tomarte el tiempo de participar. Tus respuestas son muy valiosas para nosotros, ya que nos ayudarán a entender mejor las realidades que viven las personas en relación con la discriminación en diferentes ámbitos. Esta información será clave para promover cambios y políticas que favorezcan la inclusión y el respeto.
          </p>
          <p>
            Recuerda que todas tus respuestas son anónimas y tratadas de acuerdo con la política de tratamiento y protección de datos personales (Res.0379/2022).
          </p>
        </Subtitle>
        <StyledButton onClick={handleNext}>Siguiente</StyledButton>
      </WelcomeCard>
    </>
  );
}
