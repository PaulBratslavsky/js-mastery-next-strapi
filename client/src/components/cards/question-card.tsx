import Link from "next/link";
import React, { useMemo } from "react";

import { TagCard } from "@/components/cards/tag-card";
import { Metric } from "@/components/shared/metric";
import { ROUTES } from "@/constants/routes";
import { getTimeStamp } from "@/lib/utils";
import { Question, UserProfile } from "@/types";

import { StrapiImage } from "../custom/strapi-image";

interface QuestionCardProps {
  question: Question;
}

export function QuestionCard({ question }: QuestionCardProps) {
  const {
    documentId,
    title,
    tags,
    userProfile,
    createdAt,
    upvotes,
    answers,
    views,
  } = question;
  const formattedTimestamp = getTimeStamp(new Date(createdAt));

  const metrics = useMemo(() => [
    { imgUrl: "/icons/like.svg", alt: "like", value: upvotes, title: " Votes" },
    { imgUrl: "/icons/message.svg", alt: "answers", value: answers, title: " Answers" },
    { imgUrl: "/icons/eye.svg", alt: "views", value: views, title: " Views" },
  ], [upvotes, answers, views]);  
  

  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {formattedTimestamp}
          </span>

          <Link href={ROUTES.QUESTIONS(documentId)}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>
      </div>

      {tags && (
        <div className="mt-3.5 flex w-full flex-wrap gap-2">
          {tags.map((tag) => (
            <TagCard key={tag.documentId} data={tag} />
          ))}
        </div>
      )}

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        {renderUserInfo(userProfile, formattedTimestamp)}

        <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
          {metrics.map((metric) => (
            <Metric
              key={metric.alt}
              imgUrl={metric.imgUrl}
              alt={metric.alt}
              value={metric.value}
              title={metric.title}
              textStyles="small-medium text-dark400_light800"
            />
          ))}
        </div>
      </div>
    </div>
  );
}


function renderUserInfo(userProfile: UserProfile | undefined, formattedTimestamp: string) {
  if (!userProfile)
    return <span>{`Anonymous • asked ${formattedTimestamp}`}</span>;

  return (
    <StrapiImage
      src={userProfile.image?.url}
      width={26}
      height={26}
      alt={userProfile.name}
      className="rounded-full object-contain"
    />
  );
};