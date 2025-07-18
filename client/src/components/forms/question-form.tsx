"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Editor } from "@/components/editor";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AskQuestionSchema } from "@/lib/validations";

import { MultiSelect } from "../custom/multi-select";

export function QuestionForm() {
  const form = useForm<z.infer<typeof AskQuestionSchema>>({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  const handleCreateQuestion = (values: z.infer<typeof AskQuestionSchema>) => {
    console.log(values);
    const { title, content, tags } = values;
    console.log(title, content, tags);
    alert(JSON.stringify(values));
  };


  const frameworksList = [
    {
      value: "next.js",
      label: "Next.js",
    },
    {
      value: "sveltekit",
      label: "SvelteKit",
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js",
    },
    {
      value: "remix",
      label: "Remix",
    },
    {
      value: "astro",
      label: "Astro",
    },
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCreateQuestion)}
        className="flex w-full flex-col gap-10"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-medium text-dark400_light700">
                Question Title <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
                />
              </FormControl>
              <FormDescription className="body-regular text-light-500">
                Be specific and imagine you&apos;re asking a question to a
                course instructor.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-medium text-dark400_light700">
                Question Content <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Editor markdown={field.value} onChange={field.onChange} />
              </FormControl>
              <FormDescription className="body-regular text-light-500">
                Give a detailed description of your problem/question. Add any
                relevant code, examples, or links.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-medium text-dark400_light700">
                Tags <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <div className="flex-between gap-3">
                  <MultiSelect
                    options={frameworksList}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    placeholder="Select options"
                    variant="inverted"
                    animation={2}
                    maxCount={3}
                  />
                </div>
              </FormControl>
              <FormDescription className="body-regular text-light-500">
                Add up to 5 tags to describe what your question is about. You
                need to press enter to add a tag.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-16 flex justify-end">
          <Button
            type="submit"
            className="primary-gradient !text-light-900 w-fit"
          >
            Ask A Question
          </Button>
        </div>
      </form>
    </Form>
  );
}
