export type User = {
  id: number;
  username: string;
  createdAt: Date;
  passwordHash: string;
};

export type SerializedUser = {
  id: number;
  username: string;
  createdAt: string;
  passwordHash: string;
};

export type Session = {
  id: number;
  userId: number;
  token: string;
  expiryTimestamp: string;
};

export type Survey = {
  id: number;
  userId: number;
  createdAt: Date;
  title: string;
  customSlug: string;
  published: boolean;
};

export type SerializedSurvey = {
  id: number;
  userId: number;
  createdAt: string;
  title: string;
  customSlug: string;
  published: boolean;
};

export type Question = {
  id: number;
  surveyId: number;
  itemOrder: number;
  questionType: string;
  title: string;
  valueMin: number;
  valueMax: number;
  descriptionMin: string;
  descriptionMax: string;
};

export type Response = {
  id: number;
  questionId: number;
  createdAt: string;
  responseValue: number;
};

export type ResponseInput = {
  questionId: number;
  responseValue: number;
};

export type QuestionId = {
  questionId: number;
};
