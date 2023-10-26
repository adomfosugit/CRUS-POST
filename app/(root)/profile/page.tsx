import { UserButton, UserProfile } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
        <UserProfile 
              appearance={{
                baseTheme: dark,
                
              }}
         />
    </div>
  )
}

export default page