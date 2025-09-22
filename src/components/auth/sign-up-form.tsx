"use client";

import { SignUpRequest, useSignUp } from "@/api/auth/use-sign-up";
import { signUpSchema } from "@/schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/store";
import { toast } from "sonner";

export const SignUpFrom = () => {
  const router = useRouter();
  const signUp = useSignUp();
  const setAuth = useAuthStore((state) => state.setAuth);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof signUpSchema>) => {
    const user: SignUpRequest = {
      ...values,
    };
    signUp.mutate(user, {
      onSuccess: (data) => {
        setAuth({ accessToken: data.accessToken, user: data.user });
        router.replace("/");
        toast.success("Signed in successfully");
      },
    });
  };

  return (
    <div className="bg-[#1b1b1b] px-4 py-8 rounded-lg w-full h-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div
            className="flex flex-col
            gap-y-4"
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>firstName</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="firstName" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>lastName</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="lastName" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Email address" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="Password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button
              type="submit"
              className="bg-sky-400 w-full py-2 rounded-lg text-white font-bold text-lg"
            >
              Register
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};
