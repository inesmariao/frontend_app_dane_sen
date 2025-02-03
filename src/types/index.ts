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

interface ChapterProps {
  questions: Question[];
  responses: { [key: number]: string | number | number[] };
  handleOptionChange: (questionId: number, value: string | number | number[]) => void;
  chapterName: string;
}

export interface Question {
  id: number;
  text_question: string;
  order_question: number;
  instruction?: string;
  question_type: "open" | "closed" | "matrix";
  matrix_layout_type?: "row" | "column";
  is_required?: boolean;
  is_multiple?: boolean;
  options?: Option[];
  subquestions?: SubQuestion[];
  min_value?: number;
  max_value?: number;
  data_type?: "integer" | "string" | "float";
  chapter: number;
}

export interface SubQuestion {
  id: number;
  parent_question: number;
  subquestion_order: number;
  text_subquestion: string;
  instruction?: string;
  subquestion_type: string;
  min_value?: number;
  max_value?: number;
  is_multiple: boolean;
  is_required: boolean;
  custom_identifier?: string;
}

export interface Option {
  id: number;
  text_option: string;
  is_other: boolean;
  note: string | null;
  created_at: string;
  question_id: number;
  option_type: string | null;
  updated_at: string;
  order_option: number;
  subquestion_id: number;
}