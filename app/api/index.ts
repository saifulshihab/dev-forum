import { sleep } from "@/lib/utils";
import { questions } from "../data";

export async function getQuestions() {
  await sleep(1000);
  return questions;
}

export async function getQuestion(id: string) {
  await sleep(1000);
  return questions.find((question) => question.id === id);
}
