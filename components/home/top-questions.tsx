import { getTopQuestions } from "@/app/api";
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
        <p className="text-xs text-zinc-600">No data</p>
      )}
    </div>
  );
}

export default TopQuestions;
