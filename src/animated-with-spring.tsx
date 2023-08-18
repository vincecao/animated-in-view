import React, { memo, useMemo } from "react";
import { useInView, useSpring, animated } from "@react-spring/web";
import type { AnimatedImageProps, AnimatedDivProps } from "./type";

const getSpringTransition = (
  type: NonNullable<AnimatedImageProps["type"]>,
  options: { distance: number }
) => {
  const { distance } = options;
  switch (type) {
    case "slide-bottom-to-top":
      return {
        false: {
          opacity: 0,
          transform: `translateY(${distance}px)`,
        },
        true: {
          opacity: 1,
          transform: "translateX(0)",
        },
      };
    case "slide-top-to-bottom":
      return {
        false: {
          opacity: 0,
          transform: `translateY(-${distance}px)`,
        },
        true: {
          opacity: 1,
          transform: "translateX(0)",
        },
      };
    case "slide-left-to-right":
      return {
        false: {
          opacity: 0,
          transform: `translateX(-${distance}px)`,
        },
        true: {
          opacity: 1,
          transform: "translateX(0)",
        },
      };
    case "slide-right-to-left":
      return {
        false: {
          opacity: 0,
          transform: `translateX(${distance}px)`,
        },
        true: {
          opacity: 1,
          transform: "translateX(0)",
        },
      };
    case "fade":
      return {
        false: {
          opacity: 0,
        },
        true: {
          opacity: 1,
        },
      };
  }
};

export const AnimatedSpringImage = memo((props: AnimatedImageProps) => {
  const {
    leftProps: { animateDisabled, ...leftProps },
    ref,
    animation,
  } = useAnimatedSpringInView(props);
  if (animateDisabled) return <img {...(leftProps as any)} />;
  return <animated.img {...leftProps} ref={ref} style={animation} />;
});

export const AnimatedSpringDiv = memo((props: AnimatedDivProps) => {
  const {
    leftProps: { animateDisabled, ...leftProps },
    ref,
    animation,
  } = useAnimatedSpringInView(props);
  if (animateDisabled) return <div {...leftProps} />;
  return <animated.div {...leftProps} ref={ref} style={animation} />;
});

function useAnimatedSpringInView(props: AnimatedImageProps | AnimatedDivProps) {
  const {
    distance = 100,
    delay = 200,
    type = "fade",
    duration = 600,
    ...leftProps
  } = props;
  const [ref, inView] = useInView({ once: true });
  const config = useMemo(
    () => getSpringTransition(type, { distance })[String(inView)],
    [type, distance, inView]
  );
  const animation = useSpring({
    ...config,
    delay,
    config: { duration },
  });
  return { leftProps, ref, animation };
}
