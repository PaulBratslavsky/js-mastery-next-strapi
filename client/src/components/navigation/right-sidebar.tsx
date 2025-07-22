import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

import { ROUTES } from "@/constants/routes";

import { TagCard } from "../cards/tag-card";

const topQuestions = [
  {
    documentId: "1",
    title: "What is the best way to learn React?",
  },
  {
    documentId: "2",
    title: "What is the best way to learn React?",
  },
  {
    documentId: "3",
    title: "What is the best way to learn React?",
  },
  {
    documentId: "4",
    title: "What is the best way to learn React?",
  },
  {
    documentId: "5",
    title: "What is the best way to learn React?",
  },
  {
    documentId: "6",
    title: "What is the best way to learn React?",
  },
  {
    documentId: "7",
    title: "What is the best way to learn React?",
  },
];

const popularTags = [
  {
    documentId: "1",
    label: "react",
    value: "react",
    questions: 20,
    showCount: true,
    compact: false,
  },
  {
    documentId: "2",
    label: "javascript",
    value: "javascript",
    questions: 15,
    showCount: true,
    compact: false,
  },
  {
    documentId: "3",
    label: "nextjs",
    value: "nextjs",
    questions: 10,
    showCount: true,
    compact: false,
  },
  {
    documentId: "4",
    label: "typescript",
    value: "typescript",
    questions: 8,
    showCount: true,
    compact: false,
  },
  {
    documentId: "5",
    label: "nodejs",
    value: "nodejs",
    questions: 6,
    showCount: true,
    compact: false,
  },
];

export function RightSidebar() {
  return (
    <section className="background-light800_dark300 sticky left-0 top-0 flex h-screen w-[300px] flex-col gap-6 overflow-y-auto p-6 pt-36 max-sm:hidden custom-scrollbar">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="flex flex-col w-full mt-7 gap-[15px] custom-scrollbar">
          {topQuestions.map(({ documentId, title }) => (
            <Link
              href={ROUTES.QUESTIONS(documentId)}
              key={documentId}
              className="flex items-center justify-between gap-4 cursor-pointer"
            >
              <ArrowRight className="text-dark200_light900" />
              <p className="body-medium text-dark500_light700">{title}</p>
            </Link>
          )).slice(0, 5)}
        </div>
      </div>
      <div>
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="flex flex-wrap gap-2 mt-7">
          {popularTags.map(({ documentId, label, value, questions, showCount, compact }) => (
            <TagCard key={documentId} data={{ documentId, label, value, questions, showCount, compact }} />
          ))}
        </div>
      </div>
    </section>
  );
}
