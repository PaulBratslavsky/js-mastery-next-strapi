import { Metadata } from "next";
import Link from "next/link";
import React from "react";

import { QuestionCard } from "@/components/cards/qustion-card";
import { HomeFilter } from "@/components/filters/home-filter";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { Params, SearchParams } from "@/types";

export const metadata: Metadata = {
  title: "Home",
  description: "Home",
};

interface PageProps {
  params: Params;
  searchParams: SearchParams;
}

export default async function HomeRoute({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const { query = "", filters = "" } = resolvedSearchParams;

  console.log(resolvedParams, "resolvedParams");
  console.log(resolvedSearchParams, "resolvedSearchParams");

  const mockQuestions = [
    {
      documentId: "1",
      title: "What is React.js?",
      description:
        "React.js is a JavaScript library for building user interfaces.",
      tags: [{
        documentId: "1",
        name: "JavaScript",
        questions: 10,
        showCount: true,
        compact: true,
      }, {
        documentId: "1",
        name: "React",
        questions: 10,
        showCount: true,
        compact: true,
      }],
      upvotes: 10,
      views: 100,
      answers: 10,
      createdAt: new Date(),
      author: {
        documentId: "1",
        name: "John Doe",
        image: "https://robohash.org/Paul",
      },
    },
    {
      documentId: "2",
      title: "What is Next.js?",
      description:
        "Next.js is a React framework for building server-side rendered applications.",
      tags: [{
        documentId: "1",
        name: "JavaScript",
        questions: 10,
        showCount: true,
        compact: true,
      }, {
        documentId: "1",
        name: "React",
        questions: 10,
        showCount: true,
        compact: true,
      }],
      upvotes: 10,
      views: 100,
      answers: 10,
      createdAt: new Date(),
      author: {
        documentId: "1",
        name: "John Doe",
        image: "https://robohash.org/Paul",
      },
    },
    {
      documentId: "3",
      title: "What is TypeScript?",
      description:
        "TypeScript is a superset of JavaScript that adds static typing.",
      tags: [{
        documentId: "1",
        name: "JavaScript",
        questions: 10,
        showCount: true,
        compact: true,
      }, {
        documentId: "1",
        name: "TypeScript",
        questions: 10,
        showCount: true,
        compact: true,
      }],
      upvotes: 10,
      views: 100,
      answers: 10,
      createdAt: new Date(),
      author: {
        documentId: "1",
        name: "John Doe",
        image: "https://robohash.org/Paul",
      },
    },
    {
      documentId: "4",
      title: "What is Node.js?",
      description:
        "Node.js is a runtime environment for executing JavaScript code outside of a browser.",
      tags: [{
        documentId: "1",
        name: "JavaScript",
        questions: 10,
        showCount: true,
        compact: true,
      }, {
        documentId: "1",
        name: "Node.js",
        questions: 10,
        showCount: true,
        compact: true,
      }],
      upvotes: 10,
      views: 100,
      answers: 10,
      createdAt: new Date(),
      author: {
        documentId: "1",
        name: "John Doe",
        image: "https://robohash.org/Paul",
      },
    },
    {
      documentId: "5",
      title: "What is MongoDB?",
      description:
        "MongoDB is a NoSQL database that uses JSON-like documents with schemas.",
      tags: [{
        documentId: "1",
        name: "Node.js",
        questions: 10,
        showCount: true,
        compact: true,
      }],
      author: {
        documentId: "1",
        name: "John Doe",
        image: "https://robohash.org/Paul",
      },
      upvotes: 10,
      views: 100,
      answers: 10,
      createdAt: new Date(),
    },
    {
      documentId: "6",
      title: "What is Express.js?",
      description: "Express.js is a web application framework for Node.js.",
      tags: [{
        documentId: "1",
        name: "Node.js",
        questions: 10,
        showCount: true,
        compact: true,
      }],
      author: {
        documentId: "1",
        name: "John Doe",
        image: "https://robohash.org/Paul",
      },
      upvotes: 10,
      views: 100,
      answers: 10,
      createdAt: new Date(),
    },
  ];

  const filteredQuestions = mockQuestions.filter((question) => {
    const matchesQuery = question.title.toLowerCase().includes(query.toString()) || question.description.toLowerCase().includes(query.toString());
    const matchesTags = question.tags.some((tag) => tag.name.toLowerCase().includes(filters.toString()));
    return matchesQuery && matchesTags;
  });


  return (
    <React.Fragment>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Button
          className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900"
          asChild
        >
          <Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
        </Button>
      </section>
      <section className="mt-11">
        <HomeFilter />
      </section>
      <div className="mt-10 flex w-full flex-col gap-6">
        {filteredQuestions.map((question) => (
          <QuestionCard key={question.documentId} question={question} />
        ))}
      </div>
    </React.Fragment>
  );
}
