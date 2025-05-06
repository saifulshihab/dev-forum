import Question from "@/components/home/question";
import { getQuestions } from "../api";

export default async function Home() {
  const questions = await getQuestions();
  return (
    <div className="flex flex-col gap-5">
      {questions.map((question) => (
        <Question key={question.id} question={question} />
      ))}
    </div>
  );
}
