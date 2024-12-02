"use client";

import Head from "next/head";
import styled from "styled-components";

const WelcomeCard = styled.div`
  background: #fff;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 600px;
  margin: auto;

  @media (max-width: 768px) {
    margin: 1rem 1rem;
    padding: 1.5rem;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #413087;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Subtitle = styled.div`
  margin-top: 1rem;
  color: #666;
  line-height: 1.5;

  p {
    margin-bottom: 1rem;
    font-size: 1rem;

    @media (min-width: 768px) and (max-width: 1024px) {
      font-size: 1.1rem;
      line-height: 1.6;
    }

    @media (max-width: 768px) {
      font-size: 0.9rem;
      line-height: 1.4;
    }
  }
`;

const Button = styled.button`
  background-color: #46bdb9;
  color: #ffffff;
  border: none;
  border-radius: 25px;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  margin-top: 2rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3aa29e;
  }

  /* Mejora de contraste adicional en estados activos y focus */
  &:focus,
  &:active {
    background-color: #2d8a88;
    outline: 2px solid #ffffff;
  }
`;

export default function Home() {
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
            Recuerda que todas tus respuestas son anónimas y tratadas de acuerdo con la política de   tratamiento y protección de datos personales (Res.0379/2022).
          </p>
        </Subtitle>
        <Button>Siguiente</Button>
      </WelcomeCard>
    </>
  );
}
