import { databases } from '@/lib/clientConfig';
import { currentUser, useUser } from '@clerk/nextjs';
import { Query } from 'appwrite';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button';


type Props = {
    text:string;
    id:string;
    createdAt:Date,
    author: {
        id:string,
        username:string,
        name:string;
        image:string;
        bio:string;
    }
    
}



const ThreadCard = ({text,id,createdAt,author}: Props) => {
    const { user } = useUser();
    
    


    
    
  return (
    <article className='flex w-full flex-col rounded-xl bg-dark-2 p-7'>
        <div className='flex items-start justify-between'>
            <div className='flex w-full flex-1 flex-row gap-4 '>
                <div className='flex flex-col items-center '>
                    <Link href= {`/profile/${user?.id}` } className = 'relative h-11 w-11' 
                    >
                    
                        {author && <Image  src = {author.image} alt='profile pic' fill className='cursor-pointer rounded-full'/>}

                    </Link>
                    <div className='thread-card_bar'/>

                </div>
                <div className='flex w-full flex-col'> 
                <Link href= {`/profile/${user?.id}` } className='w-fit'
                    >
                      {author &&  <h4 className='cursor-pointer text-base-semibold text-light-1'>{author.name}</h4>}
                    
                     

                    </Link>
                    <p className='mt-2 text-small-regular text-light-2'>{text}</p>
                    <div className='mt-5 flex flex-col gap-3'>
                        <div className='flex gap-3.5'>
                            
                            <Link href={`/thread/${id}`}>
                            <Button>
                            <p className='text-white'>Comment</p>
                            </Button>
                            
                            </Link>
                           
                            
                            
                        </div>

                    </div>
                </div>


            </div>
        </div>
        

    </article>
  )
}

export default ThreadCard