import { sleep } from "@/lib/utils";
import { projects, questions } from "../data";

export async function getQuestions() {
  await sleep(1000);
  return questions;
}

export async function getQuestion(id: string) {
  await sleep(1000);
  return questions.find((question) => question.id === id);
}

export async function getTopQuestions() {
  await sleep(1000);
  return questions.slice(0, 3);
}

export async function getProjects() {
  await sleep(500);
  return projects;
}
