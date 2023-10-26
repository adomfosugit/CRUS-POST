

import AccountProfile from "@/components/forms/AccountProfile";
import { databases } from "@/lib/clientConfig";

import {auth, currentUser} from '@clerk/nextjs'
import { Client } from "appwrite";
import { redirect } from "next/navigation";

 async function Page() {
    const user = await currentUser();
    const {userId} = auth()


   // const userInfo = {}
   if (!userId) {
    // Handle the case where the user ID is not available
    return null;
  }
  
  const userInfo = await databases.getDocument('6531ae9269b930cf1b6f', '6531aea7438566ac3a5a', `${userId}`);
  
  if (!userInfo) {
    // Handle the case where user information doesn't exist in the database
    return null;
  } else {
    if (userInfo) {
      // If the user is onboarded, redirect to a specific page
      redirect("/");
    }
  }

    const userData = {
        id: user?.id,
        objectId: userInfo?._id,
        username: userInfo ? userInfo?.username : user?.username,
        name: userInfo ? userInfo?.name : user?.firstName ?? "",
        bio: userInfo ? userInfo?.bio : "",
        image: userInfo ? userInfo?.image : user?.imageUrl,
      };

   
    return (
        <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
            <h1 className="head-text"> Onboarding</h1>
            <p className="mt-3 text-base-regular text-light-2">
                Complete your profile now, to use Threads. {userId}
            </p>
            <section className="mt-9 bg-dark-2 p-10">
                <AccountProfile user= {userData}
                btnTitle = 'continue'/>
            </section>
              
        </main>
    )
 }
 export default Page;