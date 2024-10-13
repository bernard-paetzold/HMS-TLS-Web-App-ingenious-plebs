"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { assignment, feedback } from "@/lib/definitions";
import { submitFeedback } from "@/lib/actions/feedbackRequests";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  mark: z.number().min(0),
  comment: z.string().max(500, "Comment must be shorter than 500 characters."),
});

export function FeedbackForm({
  initialFeedback,
  submissionId,
  assignment,
}: {
  initialFeedback: feedback | null;
  submissionId: number;
  assignment: assignment;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mark: initialFeedback?.mark ?? 0,
      comment: initialFeedback?.comment ?? "",
    },
  });

  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      await submitFeedback({
        ...values,
        submissionId: submissionId,
        feedbackId: initialFeedback?.id ?? 0,
      });
      toast.success(
        initialFeedback
          ? "Feedback updated successfully"
          : "Feedback submitted successfully",
      );

      router.refresh();
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <h2 className="text-xl font-semibold">
            {initialFeedback ? "Edit Feedback" : "Create Feedback"}
          </h2>
          <FormField
            control={form.control}
            name="mark"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Marks: (0 - {assignment.marks})</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    min={0}
                    max={assignment.marks}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comment</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={4} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Submitting..."
              : initialFeedback
                ? "Update Feedback"
                : "Submit Feedback"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
