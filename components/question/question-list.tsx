import { Prisma } from "@/generated/prisma";
import Empty from "../ui/empty";
import Question from "./question";

type Props = {
  questions: Prisma.QuestionGetPayload<{
    include: { user: true; _count: { select: { answers: true } } };
  }>[];
};

function QuestionList(props: Props) {
  const { questions } = props;
  return (
    <div className="space-y-3">
      {questions.length ? (
        questions.map((question) => (
          <Question key={question.id} question={question} />
        ))
      ) : (
        <Empty text="No questions yet" />
      )}
    </div>
  );
}

export default QuestionList;
