"use client";

import React from "react";
import styled from "styled-components";

const QuestionContainer = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const QuestionText = styled.h3`
  font-size: 1.25rem;
  color: #413087;
  margin-bottom: 1rem;
`;

const Option = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1rem;

  input {
    margin-right: 0.5rem;
  }
`;

interface QuestionProps {
  question: {
    id: number;
    text: string;
    type: string;
    options: string[];
  };
}

const Question: React.FC<QuestionProps> = ({ question }) => {
  return (
    <QuestionContainer>
      <QuestionText>{question.text}</QuestionText>
      {question.type === "single-choice" &&
        question.options.map((option, index) => (
          <Option key={index}>
            <input type="radio" name={`question-${question.id}`} value={option} />
            {option}
          </Option>
        ))}
      {question.type === "text" && <input type="text" />}
    </QuestionContainer>
  );
};

export default Question;
