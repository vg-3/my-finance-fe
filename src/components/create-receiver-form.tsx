"use client";

import z from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createReceiverSchema } from "@/schema/schema";
import { Input } from "./ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import {
  ReceiverCreateRequest,
  useCreateReceiver,
} from "@/api/use-create-receiver";

export const CreateReceiverForm = () => {
  const createReceiver = useCreateReceiver();
  const form = useForm<z.infer<typeof createReceiverSchema>>({
    resolver: zodResolver(createReceiverSchema),
    defaultValues: {
      name: "",
      contact: "",
    },
  });

  const onSubmit = (values: z.infer<typeof createReceiverSchema>) => {
    const receiver: ReceiverCreateRequest = {
      ...values,
      lenderId: 1,
    };
    createReceiver.mutate(receiver, {
      onSuccess: () => {
        form.reset();
        toast.success("Receiver created successfully");
      },
      onError: () => {
        toast.error("Falied to create receiver");
      },
    });
  };
  return (
    <Accordion type="single" collapsible className="px-4">
      <AccordionItem value="item-1">
        <AccordionTrigger>Create new receiver</AccordionTrigger>
        <AccordionContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div
                className="flex flex-col
            gap-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Receiver Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Receiver Name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Contact Number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <button
                  type="submit"
                  disabled={false}
                  className="bg-sky-400 w-full py-2 rounded-lg text-white font-bold text-lg"
                >
                  Add Receiver
                </button>
              </div>
            </form>
          </Form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
