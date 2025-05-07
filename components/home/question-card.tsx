import { TQuestion } from "@/app/data";
import { EyeIcon, MessageCircle, User } from "lucide-react";
import Link from "next/link";

function QuestionCard(props: { question: TQuestion }) {
  const { question } = props;
  return (
    <div className="flex flex-col gap-2 rounded-md bg-gray-200 p-3">
      <Link href={`/questions/${question.id}`}>
        <h2 className="text-sm font-semibold">{question.title}</h2>
      </Link>
      <p className="line-clamp-3 text-sm text-gray-600">
        {question.description}
      </p>
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2">
          {question.tags?.length
            ? question.tags.map((tag, idx) => (
                <p
                  key={idx}
                  className="rounded bg-gray-300 px-1 py-[1px] text-xs font-semibold text-gray-500"
                >
                  {tag}
                </p>
              ))
            : null}
        </div>
        <div className="inline-flex items-center gap-4">
          <div className="inline-flex items-center gap-1 text-xs text-gray-500">
            <EyeIcon size={12} />
            <p>{question.views} views</p>
          </div>
          <div className="inline-flex items-center gap-1 text-xs text-gray-500">
            <MessageCircle size={12} />
            <p>{question.answers?.length || 0} answers</p>
          </div>
          <div className="inline-flex items-center gap-1 text-xs text-gray-500">
            <User size={12} />
            <Link href={"#"} className="hover:text-black">
              <p>{question.user}</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;
