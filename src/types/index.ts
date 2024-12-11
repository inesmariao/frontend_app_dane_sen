export interface Survey {
  id: number;
  name: string;
  description_name: string;
  description_title: string;
  chapters: Chapter[];
  questions: Question[];
}

export interface Chapter {
  id: number;
  name: string;
  description?: string;
}

export interface Question {
  id: number;
  text_question: string;
  order_question: number;
  instruction: string;
  question_type: "open" | "closed" | "matrix";
  subquestions?: Question[];
  min_value?: number;
  max_value?: number;
  options?: Option[];
  chapter: number;
}

export interface Option {
  id: number;
  text_option: string;
}