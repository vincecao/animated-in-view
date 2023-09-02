import React, { memo } from "react";
import { useInView } from "@react-spring/web";
import { Transition } from "react-transition-group";
import type { AnimatedImageProps, AnimatedDivProps } from "./type";

type TransitionStyleKeys = "entering" | "entered" | "exiting" | "exited";

const getReactTransition = (type: NonNullable<AnimatedImageProps["type"]>, options: { distance: number; duration: number }) => {
  const { distance, duration } = options;
  const initialStyles = {
    transition: `all ${duration}ms ease-in-out`,
    opacity: 0,
    transform: "translate(0)"
  };
  switch (type) {
    case "slide-bottom-to-top":
      return [
        initialStyles,
        {
          entering: { transform: `translateY(${distance}px)` },
          entered: { opacity: 1 },
          exiting: {},
          exited: {},
        },
      ];
    case "slide-top-to-bottom":
      return [
        initialStyles,
        {
          entering: { transform: `translateY(-${distance}px)` },
          entered: { opacity: 1 },
          exiting: {},
          exited: {},
        },
      ];
    case "slide-left-to-right":
      return [
        initialStyles,
        {
          entering: { transform: `translateX(-${distance}px)` },
          entered: { opacity: 1 },
          exiting: {},
          exited: {},
        },
      ];
    case "slide-right-to-left":
      return [
        initialStyles,
        {
          entering: { transform: `translateX(${distance}px)` },
          entered: { opacity: 1 },
          exiting: {},
          exited: {},
        },
      ];
    case "fade":
      return [
        initialStyles,
        {
          entering: { opacity: 1 },
          entered: { opacity: 1 },
          exiting: { opacity: 0 },
          exited: { opacity: 0 },
        },
      ];
  }
};

export const AnimatedTransitionImage = memo((props: AnimatedImageProps) => {
  const {
    leftProps: { animateDisabled, ...leftProps },
    getStyle,
    inProp,
    timeout,
    ref,
  } = useAnimatedTransitionInView(props);
  if (animateDisabled) return <img {...leftProps} ref={ref} />;
  return (
    <Transition nodeRef={ref} in={inProp} timeout={timeout}>
      {(state: TransitionStyleKeys) => (
        <img
          {...leftProps}
          ref={ref}
          style={{
            ...getStyle(state),
            ...(leftProps.style ?? {}),
          }}
        />
      )}
    </Transition>
  );
});

export const AnimatedTransitionDiv = memo((props: AnimatedDivProps) => {
  const {
    leftProps: { animateDisabled, ...leftProps },
    getStyle,
    inProp,
    timeout,
    ref,
  } = useAnimatedTransitionInView(props);
  if (animateDisabled) return <div {...leftProps} ref={ref} />;
  return (
    <Transition nodeRef={ref} in={inProp} timeout={timeout}>
      {(state: TransitionStyleKeys) => (
        <div
          {...leftProps}
          ref={ref}
          style={{
            ...getStyle(state),
            ...(leftProps.style ?? {}),
          }}
        />
      )}
    </Transition>
  );
});

function useAnimatedTransitionInView(props: AnimatedImageProps | AnimatedDivProps) {
  const { distance = 100, delay = 200, type = "fade", duration = 600, ...leftProps } = props;
  const [ref, inProp] = useInView({ once: true });
  const [defaultStyle, transitionStyles] = getReactTransition(type, { duration, distance });
  const getStyle = (state: TransitionStyleKeys) => ({
    ...defaultStyle,
    ...transitionStyles[state],
  });

  return { leftProps, ref, getStyle, inProp, timeout: duration };
}
