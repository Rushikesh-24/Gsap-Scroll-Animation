"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Logo from "../../../public/logo.png";
import Link from "next/link";
import gsap from "gsap";
import TransitionLink from "./TransitionLink";
const Menu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const circleRefs = useRef<HTMLSpanElement[]>([]);

  const toggleMenu = () => {
    if (!menuOpen) {
      setMenuOpen(true);
    } else {
      const animation = gsap.to(circleRefs.current, {
        scale: 0,
        duration: 1,
        stagger: {
          grid: [3, 3],
          from: "random",
          each: 0.2,
        },
        onComplete: () => {
          setMenuOpen(false);
        },
      });
      animation.play();
    }
  };
  
  useEffect(() => {
    if (menuOpen) {
      gsap.to(circleRefs.current, {
        scale: 2,
        duration: 1.3,
        stagger: {
          grid: [3, 3],
          from: "random",
          each: 0.2,
        },
      });
    }
  }, [menuOpen]);

  return (
    <header className={`sticky top-0 z-30 left-0`}>
      <div className="flex relative justify-between w-auto items-center p-5 z-50">
        <Link href={"/"} className="md:size-32 size-20 view">
          <Image src={Logo} alt="" className={`size-fit transition-all ease-out duration-[2s] ${menuOpen?"hue-rotate-180 invert":""}`} />
        </Link>
        <div
          onClick={(event) => {
            event.preventDefault();
            toggleMenu();
          }}
          className="cursor-pointer md:size-32 size-10 flex flex-col justify-center items-center view"
        >
          <div
            className={` sm:w-10 w-7 h-0.5 rounded-md my-1 duration-500 transform ${
              menuOpen ? "rotate-[45deg] translate-y-0.5 bg-black" : "translate-y-0 bg-white"
            }`}
          ></div>
          <div
            className={` sm:w-10 w-7 h-0.5 rounded-md my-1 duration-500 transform ${
              menuOpen ? "-rotate-[45deg] -translate-y-2 bg-black " : "translate-y-0 bg-white"
            }`}
          ></div>
        </div>
      </div>
      <div className={`fixed top-0 left-0 w-full h-full z-40 transition-all ease-in-out duration-[2s] ${menuOpen?"flex opacity-100 translate-y-0":"hidden opacity-0"}`}>
      <div className="circles">
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className={`inline-block size-[45rem] absolute bg-gray-300 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
              ref={(el: HTMLSpanElement | null) => { circleRefs.current[i] = el!; }}
              style={{ scale: 0 }}
            ></span>
          ))}
        </div>
        {menuOpen &&
      <div className="h-screen w-screen bg-transparent z-40 absolute top-0 flex justify-center items-center  ">
        <div onClick={() => setMenuOpen(false)}>

        <TransitionLink href={'/Test'} className="hover:underline text-7xl"  label="NewPage"></TransitionLink>
        </div>
      </div>

      }
      </div>
    </header>
  );
};

export default Menu;
