'use client'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const Animation = () => {
    const frames = {
        currentIndex: 0,
        maxIndex: 304,
      };
      let imagesloaded = 0;
      const canvasRef = useRef<HTMLCanvasElement>(null);
      const parentRef = useRef<HTMLDivElement>(null);
      const images: HTMLImageElement[] = [];
      const [loadingProgress, setLoadingProgress] = useState(0);
      const [isLoaded, setIsLoaded] = useState(false);
    
      const loadImage = (index: number) => {
        if (index >= 0 && index <= frames.maxIndex) {
          const img: HTMLImageElement = images[index];
          const canvas = canvasRef.current;
          const context = canvas?.getContext("2d");
    
          if (canvas && context) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
    
            const scaleX = canvas.width / img.width;
            const scaleY = canvas.height / img.height;
            const scale = Math.max(scaleX, scaleY);
            const newWidth = img.width * scale;
            const newHeight = img.height * scale;
            const offsetX = (canvas.width - newWidth) / 2;
            const offsetY = (canvas.height - newHeight) / 2;
    
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.imageSmoothingEnabled = true;
            context.imageSmoothingQuality = "high";
            context.drawImage(img, offsetX, offsetY, newWidth, newHeight);
            frames.currentIndex = index;
          }
        }
      };
    
      const preloadImages = () => {
        for (let i = 1; i <= frames.maxIndex; i++) {
          const imageUrl = `./Images/${i.toString().padStart(3, "0")}.jpg`;
          const img = new Image();
          img.src = imageUrl;
          img.onload = () => {
                imagesloaded++;
                const progress = Math.floor((imagesloaded / frames.maxIndex) * 100);
                setLoadingProgress(progress);
                setTimeout(() => {
                    console.log('hello')
                }, 5000);
                if (imagesloaded === frames.maxIndex) {
                  setIsLoaded(true);
                  loadImage(frames.currentIndex);
                  startAnimation();
                }
          };
          images.push(img);
        }
      };
    
      const startAnimation = () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: parentRef.current,
            start: "top top",
            scrub: 2,
            // markers: true,
            invalidateOnRefresh: true,
          },
        });
    
        tl.to(frames, {
          currentIndex: frames.maxIndex,
          onUpdate: function () {
            loadImage(Math.floor(frames.currentIndex));
          },
        });
      };
    
      useEffect(() => {
        preloadImages();
      }, []);
  return (
    <div className="w-full bg-zinc-900">
      {!isLoaded && (
        <div className="fixed top-0 left-0 w-full h-full flex items-end justify-start bg-black z-50">
          <p className="text-white text-9xl font-extrabold p-14">{loadingProgress}%</p>
        </div>
      )}
      <div className="parent relative top-0 left-0 w-full h-[700vh]" ref={parentRef}>
        <div className="w-full h-screen sticky top-0 left-0">
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>
      </div>
    </div>
  )
}

export default Animation