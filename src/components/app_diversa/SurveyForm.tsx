import styled from 'styled-components';

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
`;

export default function SurveyForm() {
  return (
    <FormWrapper>
      <label htmlFor="question">Pregunta:</label>
      <input id="question" type="text" />
      <button>Enviar</button>
    </FormWrapper>
  );
}
