"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { assignment, module } from "@/lib/definitions";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  createAssignment,
  updateAssignment,
} from "@/lib/actions/assignmentRequest";
import { Textarea } from "@nextui-org/react";
import { toast } from "react-hot-toast";
import { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import DeleteAssignmentWithConfirmation from "../ui/delete-assignment-confirmation";

const formSchema = z.object({
  name: z
    .string()
    .min(1, "Please enter a name for the assignment.")
    .max(50, "Name must be shorter than 50 characters."),
  subject: z
    .string()
    .min(1, "Please select a subject.")
    .max(7, "Please select a subject."),
  due_date: z
    .date()
    .min(new Date(), "Due date must be later than the current date and time."),
  marks: z.number().min(0),
  assignment_info: z
    .string()
    .max(500, "Assignment information must be shorter than 500 characters."),
});

export function AssignmentForm({
  assignment,
  modules,
  isEditing,
}: {
  assignment: assignment | null;
  modules: module[];
  isEditing: boolean;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: assignment?.subject ?? "",
      name: assignment?.name ?? "",
      due_date: assignment?.due_date
        ? hasTimeComponent(new Date(assignment.due_date))
          ? new Date(assignment.due_date)
          : (() => {
              const date = new Date(assignment.due_date);
              date.setHours(12, 0, 0, 0); // Set to noon
              return date;
            })()
        : new Date(),
      marks: assignment?.marks ?? 0,
      assignment_info: assignment?.assignment_info ?? "",
    },
    mode: "onChange",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function hasTimeComponent(date: Date): boolean {
    return (
      date.getHours() !== 0 ||
      date.getMinutes() !== 0 ||
      date.getSeconds() !== 0
    );
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    if (isEditing && assignment?.id) {
      updateAssignment(values, assignment.id)
        .then(() => {
          toast.success("Assignment updated successfully");
          setIsDialogOpen(true);
          setOpen(false);
        })
        .catch((error) => {
          console.error("Error updating assignment:", error);
          toast.error("Failed to update assignment. Please try again.");
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    } else {
      assignment = {
        ...values,
        id: assignment?.id ?? 0,
        created_at: new Date(),
        lecturer_id: assignment?.lecturer_id ?? 0,
      };
      createAssignment(values)
        .then(() => {
          toast.success("Assignment created successfully");
          setIsDialogOpen(true);
          setOpen(false);
        })
        .catch((error) => {
          console.error("Error creating assignment:", error);
          toast.error("Failed to create assignment. Please try again.");
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  }

  const resetForm = useCallback(() => {
    if (isEditing && assignment) {
      form.reset({
        subject: assignment.subject ?? "",
        name: assignment.name ?? "",
        due_date: assignment?.due_date
          ? hasTimeComponent(new Date(assignment.due_date))
            ? new Date(assignment.due_date)
            : (() => {
                const date = new Date(assignment.due_date);
                date.setHours(12, 0, 0, 0); // Set to noon
                return date;
              })()
          : new Date(),
        marks: assignment.marks ?? 0,
        assignment_info: assignment.assignment_info ?? "",
      });
    } else {
      form.reset({
        subject: "",
        name: "",
        due_date: undefined,
        marks: 0,
        assignment_info: "",
      });
    }
  }, [isEditing, assignment, form]);

  function handleDateSelect(date: Date | undefined) {
    if (date) {
      form.setValue("due_date", date);
    }
  }

  function handleTimeChange(type: "hour" | "minute" | "ampm", value: string) {
    const currentDate = form.getValues("due_date") || new Date();
    const newDate = new Date(currentDate);

    if (type === "hour") {
      const hour = parseInt(value, 10);
      newDate.setHours(newDate.getHours() >= 12 ? hour + 12 : hour);
    } else if (type === "minute") {
      newDate.setMinutes(parseInt(value, 10));
    } else if (type === "ampm") {
      const hours = newDate.getHours();
      if (value === "AM" && hours >= 12) {
        newDate.setHours(hours - 12);
      } else if (value === "PM" && hours < 12) {
        newDate.setHours(hours + 12);
      }
    }

    form.setValue("due_date", newDate);
  }

  //Reset form
  function handleNewAssignment() {
    setIsDialogOpen(false);
    resetForm();
  }

  const router = useRouter();

  //Navigate to home
  function handleGoHome() {
    router.push("/home");
  }

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (isEditing && assignment) {
      form.reset({
        subject: assignment.subject ?? "",
        name: assignment.name ?? "",
        due_date: assignment?.due_date
          ? hasTimeComponent(new Date(assignment.due_date))
            ? new Date(assignment.due_date)
            : (() => {
                const date = new Date(assignment.due_date);
                date.setHours(12, 0, 0, 0); // Set to noon
                return date;
              })()
          : new Date(),
        marks: assignment.marks ?? 0,
        assignment_info: assignment.assignment_info ?? "",
      });
    } else {
      resetForm();
    }
  }, [isEditing, assignment, form, resetForm]);

  console.log(assignment?.due_date);

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col h-[calc(100vh-100px)]"
        >
          <div className="flex-grow overflow-y-auto pr-4">
            <div className="space-y-8">
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-[200px] justify-between"
                          >
                            {field.value
                              ? modules.find(
                                  (module) => module.code === field.value,
                                )?.code
                              : "Select module..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search modules..." />
                            <CommandList>
                              <CommandEmpty>No modules found.</CommandEmpty>
                              <CommandGroup>
                                {modules.map((module) => (
                                  <CommandItem
                                    key={module.code}
                                    value={module.code}
                                    onSelect={(currentValue) => {
                                      field.onChange(currentValue);
                                      setOpen(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        field.value === module.code
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
                                    {module.code}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Assignment name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="due_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Enter due date & time</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "MM/dd/yyyy hh:mm aa")
                            ) : (
                              <span>MM/DD/YYYY hh:mm aa</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <div className="sm:flex">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={handleDateSelect}
                            initialFocus
                          />
                          <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                            <ScrollArea className="w-64 sm:w-auto">
                              <div className="flex sm:flex-col p-2">
                                {Array.from({ length: 12 }, (_, i) => i + 1)
                                  .reverse()
                                  .map((hour) => (
                                    <Button
                                      key={hour}
                                      size="icon"
                                      variant={
                                        field.value &&
                                        field.value.getHours() % 12 ===
                                          hour % 12
                                          ? "default"
                                          : "ghost"
                                      }
                                      className="sm:w-full shrink-0 aspect-square"
                                      onClick={() =>
                                        handleTimeChange(
                                          "hour",
                                          hour.toString(),
                                        )
                                      }
                                    >
                                      {hour}
                                    </Button>
                                  ))}
                              </div>
                              <ScrollBar
                                orientation="horizontal"
                                className="sm:hidden"
                              />
                            </ScrollArea>
                            <ScrollArea className="w-64 sm:w-auto">
                              <div className="flex sm:flex-col p-2">
                                {Array.from(
                                  { length: 12 },
                                  (_, i) => i * 5,
                                ).map((minute) => (
                                  <Button
                                    key={minute}
                                    size="icon"
                                    variant={
                                      field.value &&
                                      field.value.getMinutes() === minute
                                        ? "default"
                                        : "ghost"
                                    }
                                    className="sm:w-full shrink-0 aspect-square"
                                    onClick={() =>
                                      handleTimeChange(
                                        "minute",
                                        minute.toString(),
                                      )
                                    }
                                  >
                                    {minute.toString().padStart(2, "0")}
                                  </Button>
                                ))}
                              </div>
                              <ScrollBar
                                orientation="horizontal"
                                className="sm:hidden"
                              />
                            </ScrollArea>
                            <ScrollArea className="">
                              <div className="flex sm:flex-col p-2">
                                {["AM", "PM"].map((ampm) => (
                                  <Button
                                    key={ampm}
                                    size="icon"
                                    variant={
                                      field.value &&
                                      ((ampm === "AM" &&
                                        field.value.getHours() < 12) ||
                                        (ampm === "PM" &&
                                          field.value.getHours() >= 12))
                                        ? "default"
                                        : "ghost"
                                    }
                                    className="sm:w-full shrink-0 aspect-square"
                                    onClick={() =>
                                      handleTimeChange("ampm", ampm)
                                    }
                                  >
                                    {ampm}
                                  </Button>
                                ))}
                              </div>
                            </ScrollArea>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="marks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marks</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Marks assignment is worth"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="assignment_info"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Assignment information."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="pt-4 sticky bottom-10 bg-white flex justify-between items-center">
            <div>
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                className="mr-2"
              >
                Reset
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? "Submitting..."
                  : isEditing
                    ? "Update"
                    : "Submit"}
              </Button>
            </div>
            {isEditing ? (
              <DeleteAssignmentWithConfirmation assignment={assignment} />
            ) : null}
          </div>
        </form>
      </Form>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Assignment Updated" : "Assignment Submitted"}
            </DialogTitle>
            <DialogDescription>
              Your assignment has been successfully{" "}
              {isEditing ? "updated" : "submitted"}.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleNewAssignment}>
              {isEditing ? "Return to editing" : "Create New Assignment"}
            </Button>
            <Button onClick={handleGoHome}>Go to Home</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
