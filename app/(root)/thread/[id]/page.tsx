'use client'
import ThreadCard from '@/components/cards/ThreadCard'
import { databases } from '@/lib/clientConfig'
import { Query } from 'appwrite'
import React, { useEffect, useState } from 'react'
import { Data } from '../../page'
import Comment from '@/components/forms/Comment'
import { useUser } from '@clerk/nextjs'



const page = ({params}:{ params: {id:string}} ) => {
    if(!params.id) return null
    const [thread, setThreads] = useState<Data[]>([])
    const { user } = useUser();
    const [userAuth, setUserAuth] = useState({})
    useEffect(() => {
      const promise = databases.listDocuments('6531ae9269b930cf1b6f', '6537bc2eb0e1588505c7', [
        Query.equal("id",[`${params.id}`])
      ])
    
      promise.then(
        function(response){
          const documents = response.documents;
          const [{author}] = documents
         setUserAuth(author) 
         
          
          setThreads(documents) 
            console.log(thread)
          
          
        },
        function(error){
          console.log(error)
        }
      )
    }, [])
    
  return (
    <section className='relative'>
        <div>
        {thread.map((tweet) => (
       <div className='mb-3'>

      
       <ThreadCard  
       key={tweet.id}
       text= {tweet.text} 
       id = {tweet.id}
       createdAt={tweet.createdAt}
       author = {userAuth}
       

       

       />
       </div>
      ))}
      
        </div>
        <div className='mt-7'>
            <Comment
            currentUserId= {user?.id} 
            threadId= {params.id} />

        </div>
        
    </section>
  )
}

export default page