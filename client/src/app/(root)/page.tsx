import { Metadata } from "next";
import Link from "next/link";
import React from "react";

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

interface Question {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  author: {
    _id: string;
    name: string;
    createdAt: Date;
  };
  upvotes: number;
  views: number;
  answers: number;
  createdAt: Date;
}

function QuestionCard({ question }: { question: Question }) {
  return (
    <div>
      <h2>{question.title}</h2>
      <p>{question.description}</p>
      <p>{question.tags.join(", ")}</p>
    </div>
  );
}

export default async function HomeRoute({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  console.log(resolvedParams, "resolvedParams");
  console.log(resolvedSearchParams, "resolvedSearchParams");



  const mockQuestions = [
    {
      _id: "1",
      title: "What is React.js?",
      description: "React.js is a JavaScript library for building user interfaces.",
      tags: ["JavaScript", "React"],
      author: {
        _id: "1",
        name: "John Doe",
        createdAt: new Date(),
      },
      upvotes: 10,
      views: 100,
      answers: 10,
      createdAt: new Date(),
    },
    {
      _id: "2",
      title: "What is Next.js?",
      description: "Next.js is a React framework for building server-side rendered applications.",
      tags: ["JavaScript", "React"],
      author: {
        _id: "1",
        name: "John Doe",
        createdAt: new Date(),
      },
      upvotes: 10,
      views: 100,
      answers: 10,
      createdAt: new Date(),
    },
    {
      _id: "3",
      title: "What is TypeScript?",
      description: "TypeScript is a superset of JavaScript that adds static typing.",
      tags: ["JavaScript", "TypeScript", "React"],
      author: {
        _id: "1",
        name: "John Doe",
        createdAt: new Date(),
      },
      upvotes: 10,
      views: 100,
      answers: 10,
      createdAt: new Date(),
    },
    {
      _id: "4",
      title: "What is Node.js?",
      description: "Node.js is a runtime environment for executing JavaScript code outside of a browser.",
      tags: ["JavaScript", "Node.js", "React"],
      author: {
        _id: "1",
        name: "John Doe",
        createdAt: new Date(),
      },
      upvotes: 10,
      views: 100,
      answers: 10,
      createdAt: new Date(),
    },
    {
      _id: "5",
      title: "What is MongoDB?",
      description: "MongoDB is a NoSQL database that uses JSON-like documents with schemas.",
      tags: ["JavaScript", "Node.js", "React"],
      author: {
        _id: "1",
        name: "John Doe",
        createdAt: new Date(),
      },  
      upvotes: 10,
      views: 100,
      answers: 10,
      createdAt: new Date(),
    },
    {
      _id: "6",
      title: "What is Express.js?",
      description: "Express.js is a web application framework for Node.js.",
      tags: ["JavaScript", "Node.js", "React"], 
      author: {
        _id: "1",
        name: "John Doe",
        createdAt: new Date(),
      },
      upvotes: 10,
      views: 100,
      answers: 10,
      createdAt: new Date(),
    },
  ];

  const filteredQuestions = mockQuestions.filter((question) => {
    if (resolvedSearchParams.query) {
      const searchQuery = resolvedSearchParams.query.toString().toLowerCase();
      console.log(searchQuery, "searchQuery");
      return question.title.toLowerCase().includes(searchQuery) || question.description.toLowerCase().includes(searchQuery) || question.tags.some((tag) => tag.toLowerCase().includes(searchQuery));
    }
    return question;
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
      <section className="mt-11">LocalSearch</section>
      HomeFilter
      <div className="mt-10 flex w-full flex-col gap-6">
        {filteredQuestions.map((question) => (
          <QuestionCard key={question._id} question={question} />
        ))}
      </div>
    </React.Fragment>
  );
}
