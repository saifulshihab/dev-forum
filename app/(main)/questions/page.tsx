import Question from "@/components/question/question";
import Empty from "@/components/ui/empty";
import prisma from "@/lib/prisma";

async function Page() {
  const questions = await prisma.question.findMany({
    include: {
      user: true,
      answers: {
        where: { parentId: null }
      }
    }
  });
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

export default Page;
