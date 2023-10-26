import { auth, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import PostThread from "@/components/forms/PostThread";
import { databases } from "@/lib/clientConfig";


async function Page() {
  const user = await currentUser();
  const {userId} = auth()
  if (!user) return null;

  // fetch organization list created by users
 // const userInfo = await clientsanity.fetch(`*[_type == "user" && id == "${userId}" ]`);

 const userInfo = await databases.getDocument('6531ae9269b930cf1b6f','6531aea7438566ac3a5a', `${userId}`);
  
  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <>
      <h1 className='head-text'>Create Thread</h1>

      <PostThread userId={userInfo.id}
        />
    </>
  );
}

export default Page;