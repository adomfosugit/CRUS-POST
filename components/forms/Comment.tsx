"use client";

import { z } from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { usePathname } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { CommentValidation } from "@/lib/validations/thread";
import { databases } from "@/lib/clientConfig";
import { ID } from "appwrite";
import { useUser } from "@clerk/nextjs";


interface Props {
  threadId: string;
 
  currentUserId?: string;
}

function Comment({ threadId,  currentUserId }: Props) {
  const pathname = usePathname();

  function generateUniqueId() {
    const timestamp = Date.now().toString(36); // Convert current timestamp to base36
    const randomString = Math.random().toString(36).substr(2, 5); // Generate a random string
  
    return `${timestamp}${randomString}`;
  }
  
  const uniqueId = generateUniqueId();
  const form = useForm<z.infer<typeof CommentValidation>>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: "",
    },
  });
  const { user } = useUser();

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    const promise = databases.createDocument('6531ae9269b930cf1b6f', '6537bc2eb0e1588505c7', 
    ID.unique(), {
      text: values.thread,
      createdAt: new Date(),
      parentId: uniqueId,
      id:threadId,
      author:user?.id
     // communityId: organization ? organization.id : null,
      
    })
    form.reset()
    
  };

  return (
    <Form {...form}>
      <form className='comment-form' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='thread'
          render={({ field }) => (
            <FormItem className='flex w-full items-center gap-3'>
             
              <FormControl className='border-none bg-transparent'>
                <Input
                  type='text'
                  {...field}
                  placeholder='Comment...'
                  className='no-focus text-light-1 outline-none'
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type='submit' className='comment-form_btn'>
          Comment
        </Button>
      </form>
    </Form>
  );
}

export default Comment;
