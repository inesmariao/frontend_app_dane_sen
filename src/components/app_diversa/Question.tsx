"use client";

import React from "react";
import styled from 'styled-components';

export const Question: React.FC<{ question: string }> = ({ question }) => (
  <fieldset>
    <legend>{question}</legend>
  </fieldset>
);
