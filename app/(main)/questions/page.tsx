import QuestionCard from "@/components/question/question-card";
import Empty from "@/components/ui/empty";
import { getQuestions } from "@/lib/data";

async function Page() {
  const questions = await getQuestions();
  return (
    <div>
      <div className="flex h-[3.125rem] items-center border-b border-dashed px-4">
        <h1 className="text-2xl font-semibold leading-none">Questions</h1>
      </div>
      <div className="h-[calc(100vh-3.125rem)] space-y-3 overflow-y-auto p-3">
        {questions.length ? (
          questions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))
        ) : (
          <Empty text="No questions yet" />
        )}
      </div>
    </div>
  );
}

export default Page;
