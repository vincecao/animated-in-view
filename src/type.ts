import React from "react";

export interface AnimatedInViewProps {
  animateDisabled?: boolean;
  distance?: number;
  delay?: number;
  duration?: number;
  type?:
    | "fade"
    | "slide-bottom-to-top"
    | "slide-left-to-right"
    | "slide-right-to-left"
    | "slide-top-to-bottom";
}

export interface AnimatedImageProps
  extends React.DetailedHTMLProps<
      React.ImgHTMLAttributes<HTMLImageElement>,
      HTMLImageElement
    >,
    AnimatedInViewProps {}

export interface AnimatedDivProps
  extends React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    AnimatedInViewProps {}
