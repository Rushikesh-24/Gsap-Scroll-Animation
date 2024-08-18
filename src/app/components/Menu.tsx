'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import Logo from '../../../public/logo.png'
import Link from 'next/link'
const Menu = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

  return (
    <header className='sticky top-0 z-50 left-0'>
        <div className="flex relative justify-between w-auto items-center m-5">
        <Link href={'/'} className='size-32 view'>
            <Image src={Logo} alt='' className='size-fit'/>
        </Link>
        <Link href={'#'} onClick={toggleMenu} className="cursor-pointer size-32 flex flex-col justify-center items-center view">
        <div className={` w-10 h-0.5 rounded-md bg-white  my-1 duration-500 transform ${menuOpen?"rotate-[45deg] translate-y-0.5":"translate-y-0"}`}></div>
        <div className={` w-10 h-0.5 bg-white rounded-md  my-1 duration-500 transform ${menuOpen?"-rotate-[45deg] -translate-y-2":"translate-y-0"}`}></div>
      </Link>
        </div>
        
    </header>
  )
}

export default Menu