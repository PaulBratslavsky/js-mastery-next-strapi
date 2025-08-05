import { Metadata } from "next";
import Link from "next/link";
import React from "react";

import { QuestionCard } from "@/components/cards/question-card";
import { HomeFilter } from "@/components/filters/home-filter";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
// import { handleError } from "@/lib/handlers/error";
import { api } from "@/data/api";
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

  const { query = "", category = "" } = resolvedSearchParams;


  const { data, meta } = await api.questions.getAllQuestions(query as string, category as string, 1);



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
        {data && data.map((question) => (
          <QuestionCard key={question.documentId} question={question} />
        ))}
      </div>
    </React.Fragment>
  );
}
