"use client";

import { SignInRequest, useSignIn } from "@/api/auth/use-sign-in";
import { signInSchema } from "@/schema/schema";
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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/store";

export const SignInFrom = () => {
  const router = useRouter();
  const signIn = useSignIn();
  const setAuth = useAuthStore((state) => state.setAuth);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof signInSchema>) => {
    const user: SignInRequest = {
      ...values,
    };
    signIn.mutate(user, {
      onSuccess: (data) => {
        setAuth({ accessToken: data.accessToken, user: data.user });
        router.replace("/");
        toast.success("Signed in successfully");
      },
    });
  };

  return (
    <div className="bg-[#1b1b1b] px-4 py-8 rounded-lg w-full h-full">
      <h1 className="text-xl text-white font-bold text-center pb-4">
        Welocome back!!
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div
            className="flex flex-col
            gap-y-4"
          >
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
              Login
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};
