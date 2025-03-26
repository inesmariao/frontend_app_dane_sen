import styled from "styled-components";

const StyledButton = styled.button`
  background-color: #2d8a88;
  color: #ffffff;
  border: none;
  border-radius: 1.5625rem;
  padding: 0.4rem 1.2rem;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  display: inline-block;
  box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.15);
  width: 10rem;
  max-width: 100%;
  margin-top: 0.8rem;
  margin-bottom: 1rem;

  &:hover {
    background-color: #56bfbd;
    color: #000000;
    box-shadow: 0 0.375rem 0.5rem rgba(0, 0, 0, 0.2);
  }

  &:focus,
  &:active {
    background-color: #88e2e0;
    outline: 0.125rem solid #ffffff;
    color: #000000;
    box-shadow: 0 0.5rem 0.625rem rgba(0, 0, 0, 0.3);
  }

  &:disabled {
    background-color: #b3b3b3;
    cursor: not-allowed;
    color: #404040;
    box-shadow: none;
  }

  @media (min-width: 48rem) and (max-width: 64rem) {
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding: 0.5rem 1.2rem;
    font-size: 0.9rem;
  }

  @media (min-width: 65rem) and (max-width: 75rem) {
    padding: 0.6rem 1.2rem;
    margin-bottom: 2rem;
  }

  @media (min-width: 76rem) {
    padding: 0.6rem 1.2rem;
    margin-bottom: 2rem;
  }
`;

export default StyledButton;
