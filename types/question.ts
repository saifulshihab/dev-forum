export type TQuestion = {
  id: string;
  title: string;
  description: string;
  user: string;
  created_at: Date;
  views: number;
  tags?: string[];
  answers?: {
    id: string;
    description: string;
    user: string;
    upvote: number;
    downvote: number;
  }[];
};
