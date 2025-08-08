"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { TagSelect } from "@/components/custom/tag-select";
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
import { ROUTES } from "@/constants/routes"
import { action } from "@/data/api/actions";
import { AskQuestionSchema } from "@/lib/validations";

export function QuestionForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof AskQuestionSchema>>({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  const handleCreateQuestion = async (
    values: z.infer<typeof AskQuestionSchema>
  ) => {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("tags", JSON.stringify(values.tags));

    const response = await action.questions.createQuestion(formData);

    if (response.error)
      form.setError("root", { message: response.error.message });

    console.log(response)

    if (response.success && response.data?.data) {
      toast.success("Question Created Successfully");
      router.push(ROUTES.QUESTIONS(response.data.data.documentId));
    }

  };

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
                  <TagSelect
                    onValueChange={field.onChange}
                    defaultValue={field.value?.map((tag) => tag.value) || []}
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
        {form.formState.errors.root && (
          <div className="text-red-500 text-sm mt-2">
            {form.formState.errors.root.message}
          </div>
        )}
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
