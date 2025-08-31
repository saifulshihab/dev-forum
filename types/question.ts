type User = {
  id: string;
  name: string;
};

export type Answer = {
  id: string;
  content: string;
  like: number;
  dislike: number;
  user: User;
  userId: string;
  questionId: string;
  parentId?: string | null;
  createdAt: string;
  updatedAt: string;
  replies: Answer[];
};

export type TQuestion = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  views: number;
  user?: User | null;
  userId?: string | null;
  createdAt: string;
  updatedAt: string;
  answers: Answer[];
};
