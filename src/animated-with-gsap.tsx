import React, { memo, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { AnimatedImageProps, AnimatedDivProps } from "./type";

gsap.registerPlugin(ScrollTrigger);

const getGsapFromOptions = (type: NonNullable<AnimatedImageProps["type"]>, options: { distance: number; duration: number; delay: number }) => {
  const { distance } = options;
  switch (type) {
    case "slide-bottom-to-top":
      return { autoAlpha: 0, y: distance };
    case "slide-top-to-bottom":
      return { autoAlpha: 0, y: -distance };
    case "slide-left-to-right":
      return { autoAlpha: 0, x: -distance };
    case "slide-right-to-left":
      return { autoAlpha: 0, x: distance };
    case "fade":
      return { autoAlpha: 0 };
  }
};

export const AnimatedGsapImage = memo((props: AnimatedImageProps) => {
  const { leftProps, ref } = useAnimatedGsapInView(props);
  return <img {...leftProps} ref={ref as React.RefObject<HTMLImageElement>} />;
});

export const AnimatedGsapDiv = memo((props: AnimatedDivProps) => {
  const { leftProps, ref } = useAnimatedGsapInView(props);
  return <div {...leftProps} ref={ref as React.RefObject<HTMLDivElement>} />;
});

function useAnimatedGsapInView(props: AnimatedImageProps | AnimatedDivProps) {
  const { distance = 100, delay = 200, type = "fade", duration = 600, animateDisabled = false, ...leftProps } = props;
  const ref = useRef<HTMLDivElement | HTMLImageElement>(null);
  const options = getGsapFromOptions(type, { duration, distance, delay });

  useLayoutEffect(() => {
    if (animateDisabled) return () => {};
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        options,
        {
          scrollTrigger: {
            trigger: ref.current,
          },
          autoAlpha: 1,
          x: 0,
          y: 0,
          duration: duration / 1000,
          delay: delay / 1000,
          ease: "power2",
        }
      )
    });
    return () => ctx.revert();
  }, []);

  return { leftProps, ref };
}
