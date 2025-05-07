import { TQuestion } from "@/app/data";
import Link from "next/link";

function TopQuestionCard(props: { question: TQuestion }) {
  const { question } = props;
  return (
    <div className="flex flex-col gap-1 rounded-md bg-gray-200 p-3">
      <Link href={`/questions/${question.id}`}>
        <h2 className="line-clamp-2 text-sm font-semibold">{question.title}</h2>
      </Link>
      <p className="line-clamp-1 text-sm text-gray-600">
        {question.description}
      </p>
    </div>
  );
}

export default TopQuestionCard;
