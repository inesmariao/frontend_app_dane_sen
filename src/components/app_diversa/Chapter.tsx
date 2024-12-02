"use client";

import React from "react";
import styled from "styled-components";

const ChapterContainer = styled.section`
  margin-bottom: 2rem;
`;

export const Chapter: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <ChapterContainer>
    <h3>{title}</h3>
    {children}
  </ChapterContainer>
);
