"use client";

import React from "react";
import styled from 'styled-components';

export const Options: React.FC<{ options: string[] }> = ({ options }) => (
  <ul>
    {options.map((option, index) => (
      <li key={index}>
        <label>
          <input type="radio" name="option" value={option} />
          {option}
        </label>
      </li>
    ))}
  </ul>
);
