'use client'
import ThreadCard from "@/components/cards/ThreadCard";
import AccountProfile from "@/components/forms/AccountProfile";
import { databases } from "@/lib/clientConfig";
import { useUser } from "@clerk/nextjs";
import { Query } from "appwrite";
import { useEffect, useState } from "react";



export interface Data {
  text: string;
  $databaseId: string;
  $collectionId: string;
  id:string;
  createdAt:Date;
  author:object;
  
}



export default  function Home() {
  const {user,isSignedIn} = useUser()
  
  
  
  


  const [thread, setThreads] = useState<Data[]>([])
  const [userAuth, setUserAuth] = useState({})
  

  useEffect(() => {
    const promise = databases.listDocuments('6531ae9269b930cf1b6f', '6537bc2eb0e1588505c7', [
      
      Query.isNull('parentId'),
      Query.orderDesc('createdAt')
    ])
    promise.then(
      function(response){
        const documents = response.documents;
        const [{author}] = documents
        setUserAuth(author) 
        
        setThreads(documents) 

        
        
      },
      function(error){
        console.log(error)
      }
    )
  }, [])
  
 
 console.log(thread)
 console.log(userAuth)


  
 


  
  

     
    
     
  return (
    < >
     <h1 className="head-text text-left">
      Home 
     </h1>
     
     
     <section className="mt-9 flex flex-col gap-10">
      {thread.length === 0 ? (<p className="text-light-2">No Todos found</p>) : 

      (<>
      
      {thread.map((tweet) => (
       
       <ThreadCard  
       key={tweet.id}
       text= {tweet.text} 
       id = {tweet.id}
       createdAt={tweet.createdAt}
       author = {userAuth}
       

       

       />
      ))}
      
      
      </>) }
     </section>
    </> 
  )
}
  