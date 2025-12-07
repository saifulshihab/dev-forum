import QuestionList from "@/components/question/question-list";
import prisma from "@/lib/prisma";

async function Page() {
  const questions = await prisma.question.findMany({
    include: {
      user: true,
      _count: { select: { answers: { where: { parentId: null } } } }
    }
  });
  return <QuestionList questions={questions} />;
}

export default Page;
