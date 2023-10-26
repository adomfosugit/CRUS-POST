'use client'
import { sidebarLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import React from 'react'

type Props = {} 

const Bottombar = (props: Props) => {
  const router = useRouter() 
  const pathname = usePathname()
  return (
    <section className='bottombar'>
      <div className='bottombar_container'>

        {sidebarLinks.map((link) => {
         //check if link is currently active 
         const isActive = (pathname.includes(link.route) && link.route.length > 1 ) || pathname === link.route
          
        return (
          <Link href={link.route}
          key={link.label}
          className={`bottombar_link ${isActive && 'bg-primary-500'}`}>
            <Image src= {link.imgURL} alt='pic' width={24} height={24}/>
            <p className='text-light-1 max-lg:hidden'>{link.label.split(/\s+/)}</p>
          </Link>
        )}
        )} 

      </div>

    </section>
  )
}

export default Bottombar