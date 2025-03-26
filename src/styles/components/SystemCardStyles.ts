import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  text-align: center;
`;

export const Card = styled.div`
  background: #fff;
  border-radius: 0.9375rem;
  padding: 1rem;
  box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 37rem;
  width: 90%;
  margin: auto;

  @media (max-width: 47.9375rem) {
    margin: 1.1rem;
    max-width: 95%;
    padding: 1rem;
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
  color: #3a2d7d;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
  font-size: 1.4rem;
  font-weight: bold;
  margin-top: 1rem;
  line-height: 1.2;
`;

export const Content = styled.div`
  margin-top: 2rem;
  color: #666;
  line-height: 1.5;
  padding: 0 1rem;

  p {
    margin-bottom: 1rem;
    font-size: 0.9rem;

    @media (max-width: 47.9375rem) {
      font-size: 0.9rem;
      line-height: 1.4;
      padding: 0;
    }

    @media (min-width: 48rem) and (max-width: 64rem) {
      font-size: 1rem;
      line-height: 1.3;
      padding: 0 1rem;
    }

    @media (min-width: 64rem) {
      font-size: 1rem;
      line-height: 1.28;
      padding: 0 2rem;
    }
  }
`;

export const EmailInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 600;
  color: #1d4ed8;
  font-size: 1rem;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
`;

