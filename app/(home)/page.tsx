import QuestionCard from "@/components/home/question-card";
import { getQuestions } from "../api";

export default async function Home() {
  const questions = await getQuestions();
  return (
    <div className="flex flex-col gap-5">
      {questions.map((question) => (
        <QuestionCard key={question.id} question={question} />
      ))}
    </div>
  );
}
