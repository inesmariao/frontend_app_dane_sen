import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #413087;
  color: white;
  text-align: center;
  padding: 1rem;
  font-size: 0.875rem;
`;

export default function Footer() {
  return (
    <FooterContainer>
      &copy; {new Date().getFullYear()} DANE - SEN - App Diversa
    </FooterContainer>
  );
}
