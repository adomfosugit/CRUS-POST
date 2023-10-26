import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import Image from 'next/image'
import { Button } from '../ui/button';

type Props = {
    id :string;
    name :string;
    email:string;
    avatar:string;
}

const Usercard = ({id,name,email,avatar}: Props) => {
  return (
    <Card className='bg-dark-2 w-[300px] mb-2 border-primary-500 '>
  
  <CardContent className='flex items-center '>
    <div >
        <Image src= {avatar} alt='profile pic' width={60} height={60} className='rounded-full m-2 ' />
     
    </div>

    <div className='mx-auto'>
    <div className='text-light-3 m-2'>{name}</div>
    <div>
        
     <Button className='bg-primary-500'>Follow</Button>
    

    </div>

    </div>
  </CardContent>
 
 
</Card>

  )
}

export default Usercard