"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useOrganization } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { ThreadValidation } from "@/lib/validations/thread";
import { databases } from "@/lib/clientConfig";



interface Props {
  userId: string;
}

function PostThread({ userId }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const { organization } = useOrganization();
  function generateUniqueId() {
    const timestamp = Date.now().toString(36); // Convert current timestamp to base36
    const randomString = Math.random().toString(36).substr(2, 5); // Generate a random string
  
    return `${timestamp}${randomString}`;
  }
  
  const uniqueId = generateUniqueId();
  

  const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
  
    const promise = databases.createDocument('6531ae9269b930cf1b6f', '6537bc2eb0e1588505c7', 
    uniqueId, {
      text: values.thread,
      author: userId,
      id: uniqueId,
      createdAt: new Date()
     // communityId: organization ? organization.id : null,
      
    });

promise.then(function (response) {
  console.log(response); // Success
}, function (error) {
  console.log(error); // Failure
}); 


    router.push("/");
  };

  return (
    <Form {...form}>
      <form
        className='mt-10 flex flex-col justify-start gap-10'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='thread'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                Content
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
                <Textarea rows={15} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='bg-primary-500'>
          Post Thread
        </Button>
      </form>
    </Form>
  );
}

export default PostThread;
