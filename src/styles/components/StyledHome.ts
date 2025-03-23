import styled from "styled-components";

export const WelcomeCard = styled.div`
  background: #fff;
  border-radius: 0.9375rem;
  padding: 1rem;
  box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 37rem;
  width: 90%;
  margin: auto;

  @media (max-width: 47.9375rem) {
    margin: 1.5rem;
    max-width: 95%;
    padding: 1.5rem;
  }

  @media (min-width: 48rem) and (max-width: 64rem) {
    max-width: 34rem;
    padding: 0.5rem;
    margin: 1rem;
  }

  @media (min-width: 64rem) {
    max-width: 35rem;
    max-height: 23rem;
    padding: 0.5rem;
    margin: 0.5rem;
  }
`;

export const Title = styled.h1`
  color: #413087;
  text-shadow: 0.1rem 0.1rem 0.2rem rgba(77, 74, 74, 0.5);

  @media (max-width: 47.9375rem) {
    font-size: 1.4rem;
    line-height: 1.2;
    padding: 0.2rem;
  }

  @media (min-width: 48rem) and (max-width: 64rem) {
    font-size: 1.6rem;
    line-height: 1.6;
    padding: 0;
    margin-top: 0.2rem;
  }

  @media (min-width: 64rem) {
    font-size: 1.7rem;
    line-height: 1;
    padding: 0;
    margin-top: 0.5rem;
  }
`;

export const Subtitle = styled.div`
  margin-top: 1rem;
  color: #666;
  line-height: 1.5;

  p {
    margin-bottom: 1rem;
    font-size: 0.9rem;

    @media (max-width: 47.9375rem) {
      font-size: 0.9rem;
      line-height: 1.4;
    }

    @media (min-width: 48rem) and (max-width: 64rem) {
      font-size: 1rem;
      line-height: 1.3;
    }

    @media (min-width: 64rem) {
      font-size: 1rem;
      line-height: 1.28;
    }
  }
`;