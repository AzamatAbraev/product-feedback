import { Comment } from "./Comment";

export default interface Feedback {
  id: number;
  title: string;
  description: string;
  category: string;
  upvotes: number;
  status: string;
  comments?: Comment[];
}
