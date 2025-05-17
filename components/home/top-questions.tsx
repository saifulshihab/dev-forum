import { getTopQuestions } from "@/app/data";
import Empty from "../ui/empty";
import TopQuestionCard from "./top-question-card";

async function TopQuestions() {
  const questions = await getTopQuestions();
  return (
    <div className="flex flex-col gap-3">
      {questions.length ? (
        questions.map((question) => (
          <TopQuestionCard key={question.id} question={question} />
        ))
      ) : (
        <Empty />
      )}
    </div>
  );
}

export default TopQuestions;
