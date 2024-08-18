'use client'
import React, { useEffect } from 'react';
import { gsap } from 'gsap';

const Cursor = () => {
  useEffect(() => {
    const cursor = document.getElementById('custom-cursor');
    const links = document.querySelectorAll('a');
    const paras = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p');

    const onMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      gsap.to(cursor, { x: clientX, y: clientY });
    };

    const onMouseEnterLink = (event: Event) => {
      const link = event.target as HTMLElement;
      if (link.classList.contains('view') || link.closest('.view')) {
        gsap.to(cursor, { scale: 4 });
      }
    };

    const onMouseLeaveLink = () => {
      gsap.to(cursor, { scale: 1 });
    };

    document.addEventListener('mousemove', onMouseMove as EventListener);

    links.forEach((link) => {
      link.addEventListener('mouseenter', onMouseEnterLink as EventListener);
      link.addEventListener('mouseleave', onMouseLeaveLink as EventListener);
    });

    paras.forEach((para) => {
      para.addEventListener('mouseenter', onMouseEnterLink as EventListener);
      para.addEventListener('mouseleave', onMouseLeaveLink as EventListener);
    });

    return () => {
      document.removeEventListener('mousemove', onMouseMove as EventListener);
      links.forEach((link) => {
        link.removeEventListener('mouseenter', onMouseEnterLink as EventListener);
        link.removeEventListener('mouseleave', onMouseLeaveLink as EventListener);
      });
      paras.forEach((para) => {
        para.removeEventListener('mouseenter', onMouseEnterLink as EventListener);
        para.removeEventListener('mouseleave', onMouseLeaveLink as EventListener);
      });
    };
  }, []);

  return (
    <div id="custom-cursor" className="hidden fixed top-0 left-0 size-[20px] rounded-full pointer-events-none z-[9999999] mix-blend-difference p-2 sm:flex justify-center items-center bg-white">
    </div>
  );
};

export default Cursor;