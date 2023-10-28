

import AccountProfile from "@/components/forms/AccountProfile";
import { databases } from "@/lib/clientConfig";

import {auth, currentUser} from '@clerk/nextjs'
import Link from "next/link";

import { redirect } from "next/navigation";

 async function Page() {
    const user = await currentUser();
    const {userId} = auth()


   
    if (!user) return null;
    
   //const userInfo = await databases.getDocument('6531ae9269b930cf1b6f','6531aea7438566ac3a5a', `${userId}`);
    //if(!userInfo) return null;
     //if (userInfo.onboarded) redirect("/");

     

   const userInfo = databases.getDocument('6531ae9269b930cf1b6f','6531aea7438566ac3a5a', `${userId}`)

        userInfo.then(function (response) {
            //if (response.onboarded) redirect("/")

    console.log(response); // Success
    }, function (error) {
    console.log(error); // Failure
        });

    const userData = {
        id: user.id,
        objectId: userId,
        username: user.username,
        name: user.firstName,
        bio:  "",
        image: user.imageUrl,
      };

   
    return (
        <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
            <h1 className="head-text"> Onboarding</h1>
            <p className="mt-3 text-base-regular text-light-2">
                Complete your Profile  
            </p>
            <Link href='/'>
            <p className="text-light-3 font-bold ">Already a user?...Skip</p>
            </Link>
            <section className="mt-9 bg-dark-2 p-10">
                <AccountProfile user= {userData}
                btnTitle = 'continue'/>
            </section>
              
        </main>
    )
 }
 export default Page;