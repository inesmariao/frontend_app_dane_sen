export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthContextType {
  authData: { token: string | null; user: User | null } | null;
  setAuthData: (data: { token: string; user: User }) => void;
  logout: () => void;
  login: (credentials: { identifier: string; password: string }) => Promise<void>;
}

export interface Survey {
  id: number;
  name: string;
  description_name: string;
  description_title: string;
  chapters: Chapter[];
  questions: Question[];
  createdAt?: string;
}

export interface SurveyContextType {
  surveys: Survey[];
  setSurveys: (surveys: Survey[]) => void;
}

export interface SurveyResponse {
  question_id: number;
  option_selected?: number | null;
  options_multiple_selected?: number[];
  answer?: string | null;
  country?: number | null;
  department?: number | null;
  municipality?: number | null;
  new_department?: number | null;
  new_municipality?: number | null;
}

export interface Chapter {
  id: number;
  name: string;
  description?: string;
}

// Interfaz para las propiedades del capítulo
export interface ChapterProps {
  questions: Question[];
  responses: { [key: string]: string | number | number[] | GeographicResponse };
  handleOptionChange: (
    questionId: string | number,
    value: string | number | number[] | GeographicResponse,
    extraData?: { country?: number; department?: number; municipality?: number }
  ) => void;
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
  is_geographic?: boolean;
  geography_type?: "COUNTRY" | "DEPARTMENT" | "MUNICIPALITY";
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

export interface GeographicResponse {
  option_selected: number;
  country?: number;
  department?: number | null;
  municipality?: number | null;
  new_department?: number | null;
  new_municipality?: number | null;
}

export interface GeographicQuestionProps {
  questionId: number;
  options: Option[];
  responses: { [key: string]: number | string | number[] | GeographicResponse };
  handleOptionChange: (
    questionId: number | string,
    value: string | number | number[] | GeographicResponse,
    extraData?: { country?: number; department?: number; municipality?: number }
  ) => void;
}


export interface Responses {
  [key: string]: string | number | number[] | GeographicResponse;
}