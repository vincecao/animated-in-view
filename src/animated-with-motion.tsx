import React, { memo, useEffect, useMemo } from "react";
import { Variants, motion, useAnimation } from "framer-motion";
import { useInView } from "@react-spring/web";
import type { AnimatedImageProps, AnimatedDivProps } from "./type";

const getMotionTransition = (
  type: NonNullable<AnimatedImageProps["type"]>,
  options: { distance: number; delay: number, duration: number }
): Variants => {
  const { distance, delay, duration } = options;
  const transition = {
    delay: delay / 1000,
    duration: duration / 1000,
    type: "tween",
  };
  switch (type) {
    case "slide-bottom-to-top":
      return {
        visible: {
          opacity: 1,
          y: 0,
          transition,
        },
        hidden: {
          opacity: 0,
          y: distance,
          transition,
        },
      };
    case "slide-top-to-bottom":
      return {
        visible: {
          opacity: 1,
          y: 0,
          transition,
        },
        hidden: {
          opacity: 0,
          y: -distance,
          transition,
        },
      };
    case "slide-left-to-right":
      return {
        visible: {
          opacity: 1,
          x: 0,
          transition,
        },
        hidden: {
          opacity: 0,
          x: -distance,
          transition,
        },
      };
    case "slide-right-to-left":
      return {
        visible: {
          opacity: 1,
          x: 0,
          transition,
        },
        hidden: {
          opacity: 0,
          x: distance,
          transition,
        },
      };
    case "fade":
      return {
        visible: {
          opacity: 1,
          transition,
        },
        hidden: {
          opacity: 0,
          transition,
        },
      };
  }
};

export const AnimatedMotionImage = memo((props: AnimatedImageProps) => {
  const {
    leftProps: { animateDisabled, ...leftProps },
    ref,
    controls,
    variants,
  } = useAnimatedMotionInView(props);
  if (animateDisabled) return <img {...(leftProps as any)} />;
  return (
    <motion.img
      {...(leftProps as any)}
      animate={controls}
      initial="hidden"
      ref={ref}
      variants={variants}
    />
  );
});

export const AnimatedMotionDiv = memo((props: AnimatedDivProps) => {
  const {
    leftProps: { animateDisabled, ...leftProps },
    ref,
    controls,
    variants,
  } = useAnimatedMotionInView(props);
  if (animateDisabled) return <div {...leftProps} />;
  return (
    <motion.div
      {...(leftProps as any)}
      animate={controls}
      initial="hidden"
      ref={ref}
      variants={variants}
    />
  );
});

function useAnimatedMotionInView(props: AnimatedImageProps | AnimatedDivProps) {
  const {
    distance = 100,
    delay = 200,
    type = "fade",
    duration = 600,
    ...leftProps
  } = props;
  const [ref, inView] = useInView({ once: true });
  const controls = useAnimation();
  const variants = useMemo(
    () => getMotionTransition(type, { distance, delay, duration }),
    [type, distance, inView, delay]
  );
  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);
  return { leftProps, ref, controls, variants };
}
