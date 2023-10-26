'use client'
import React, { useEffect, useState } from 'react'
//import faker from "@faker-js/faker"
import { faker } from '@faker-js/faker/locale/de'
//import * as faker from '@faker-js/faker';
import ThreadCard from '../cards/ThreadCard';
import Usercard from '../cards/Usercard';

type Props = {}
export interface data  {
  userId:string;
  username:string;
  email:string;
  avatar:string;
}

const RightSidebar = (props: Props) => {
  const [suggestions, setSuggestions] = useState<data[]>([]);
  useEffect(() => {
    const suggestions = [...Array(6)].map((_, i) => ({
      userId: faker.datatype.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      
    }));
    setSuggestions(suggestions);
  }, []);

  
  return (
    <section className='custom-scrollbar rightsidebar'>
      <div className=' flex flex-1 flex-col justify-start'>
        <h3 className='text-heading4-medium text-light-1'>Suggested Users</h3>
 </div>
      <div>
          {suggestions.map((profile) => (
            
            <Usercard
            key={profile.userId} 
            id = {profile.userId} 
            name = {profile.username} 
            email = {profile.email} 
            avatar = {profile.avatar} />
          ))}
      </div>
    

    </section>
  ) 
}

export default RightSidebar