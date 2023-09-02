import React, { memo, useEffect, useMemo } from "react";
import { useControls } from "leva";
import { z } from "zod";
import { AnimatedSpringImage, AnimatedMotionImage, AnimatedSpringDiv, AnimatedMotionDiv, AnimatedTransitionImage, AnimatedTransitionDiv, AnimatedGsapImage, AnimatedGsapDiv } from "@vinceocao/animated-in-view";
import websiteLogo from "url:./assets/personal-website-logo.png?as=webp&width=20";

const controlSchema = z.object({
  animateDisabled: z.boolean(),
  distance: z.number(),
  delay: z.number(),
  duration: z.number(),
  type: z.enum(["fade", "slide-bottom-to-top", "slide-left-to-right", "slide-right-to-left", "slide-top-to-bottom"]),
});

const CONTROL_SCHEMA_KEY = "control-schema";

function getControlSchema() {
  const initial = {
    animateDisabled: false,
    distance: 100,
    delay: 300,
    duration: 1500,
    type: "fade",
  };
  try {
    const match = localStorage.getItem(CONTROL_SCHEMA_KEY);
    if (match) return { ...initial, ...(JSON.parse(match) ?? {}) };
  } catch (e) {}
  return initial;
}

export default function App() {
  const sectionProps = useControls(getControlSchema());

  const [validProps, error] = useMemo(() => {
    const result = controlSchema.safeParse(sectionProps);
    if (result.success) {
      return [result.data, undefined];
    } else {
      return [{}, result.error];
    }
  }, [sectionProps]);

  useEffect(() => {
    localStorage.setItem(CONTROL_SCHEMA_KEY, JSON.stringify(validProps));
  }, [validProps]);

  if (error) {
    return <pre className="font-mono">{JSON.stringify(JSON.parse(String(error)), null, 4)}</pre>;
  }

  return (
    <>
      <Section>
        <AnimatedSpringDiv type="slide-bottom-to-top" className="flex flex-col gap-3">
          <h1 className="text-2xl">
            <code className="font-mono border dark:border-gray-600 rounded-lg px-2 py-1 bg-black text-white mr-1">animated-in-view</code> Examples
          </h1>
          <Caption>Please update controller and then refresh the browser window to see the animation changes</Caption>
          <span className="flex space-x-2">
            <a href="http://vince-amazing.com">
              <img src={websiteLogo} alt="Personal website" height="20" />
            </a>
            <a href="https://badge.fury.io/js/@vincecao%2Fanimated-in-view">
              <img src="https://badge.fury.io/js/@vincecao%2Fanimated-in-view.svg" alt="npm version" height="18" />
            </a>
            <a href="https://badge.fury.io/gh/vincecao%2Fanimated-in-view">
              <img src="https://badge.fury.io/gh/vincecao%2Fanimated-in-view.svg" alt="GitHub version" height="18" />
            </a>
          </span>
        </AnimatedSpringDiv>
      </Section>

      <Section>
        <AnimatedSpringDiv type="slide-bottom-to-top">
          <div>
            Animated with
            <a className="ml-1 text-blue-500" href="https://www.react-spring.dev" target="__blank">
              React Spring
            </a>
          </div>
          <Caption>Keep scrolling...</Caption>
        </AnimatedSpringDiv>
      </Section>
      <Section>
        <AnimatedSpringImage {...validProps} src="https://fakeimg.pl/300x300/?retina=1&text=Hello&font=noto" className="w-[300px] h-[300px]" />
        <AnimatedSpringDiv {...validProps} className="p-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quam tortor, interdum vel velit id, aliquam pharetra nibh. Donec fermentum nunc in rutrum vulputate. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla tempor nibh nisl, a sodales elit dignissim ut. Suspendisse potenti. Nulla ut pharetra nulla, vitae feugiat ligula. Aliquam
          tincidunt quam augue, eget porta massa facilisis consequat. Phasellus eget mollis ante. Curabitur vulputate euismod leo, nec blandit nibh mattis sed. Quisque blandit mauris nibh.
        </AnimatedSpringDiv>
      </Section>

      <Section>
        <AnimatedMotionDiv type="slide-bottom-to-top">
          <div>
            Animated with
            <a className="ml-1 text-blue-500" href="https://www.framer.com/motion/" target="__blank">
              Framer Motion
            </a>
          </div>
          <Caption>Keep scrolling...</Caption>
        </AnimatedMotionDiv>
      </Section>
      <Section>
        <AnimatedMotionImage {...validProps} src="https://fakeimg.pl/300x300/?retina=1&text=Hello&font=noto" className="w-[300px] h-[300px]" />
        <AnimatedMotionDiv {...validProps} className="p-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quam tortor, interdum vel velit id, aliquam pharetra nibh. Donec fermentum nunc in rutrum vulputate. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla tempor nibh nisl, a sodales elit dignissim ut. Suspendisse potenti. Nulla ut pharetra nulla, vitae feugiat ligula. Aliquam
          tincidunt quam augue, eget porta massa facilisis consequat. Phasellus eget mollis ante. Curabitur vulputate euismod leo, nec blandit nibh mattis sed. Quisque blandit mauris nibh.
        </AnimatedMotionDiv>
      </Section>

      <Section>
        <AnimatedTransitionDiv type="slide-bottom-to-top">
          <div>
            Animated with
            <a className="ml-1 text-blue-500" href="https://reactcommunity.org/react-transition-group/transition" target="__blank">
              React Transition Group
            </a>
          </div>
          <Caption>Keep scrolling...</Caption>
        </AnimatedTransitionDiv>
      </Section>
      <Section>
        <AnimatedTransitionImage {...validProps} src="https://fakeimg.pl/300x300/?retina=1&text=Hello&font=noto" className="w-[300px] h-[300px]" />
        <AnimatedTransitionDiv {...validProps} className="p-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quam tortor, interdum vel velit id, aliquam pharetra nibh. Donec fermentum nunc in rutrum vulputate. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla tempor nibh nisl, a sodales elit dignissim ut. Suspendisse potenti. Nulla ut pharetra nulla, vitae feugiat ligula. Aliquam
          tincidunt quam augue, eget porta massa facilisis consequat. Phasellus eget mollis ante. Curabitur vulputate euismod leo, nec blandit nibh mattis sed. Quisque blandit mauris nibh.
        </AnimatedTransitionDiv>
      </Section>

      <Section>
        <AnimatedGsapDiv type="slide-bottom-to-top">
          <div>
            Animated with
            <a className="ml-1 text-blue-500" href="https://greensock.com/" target="__blank">
              gsap
            </a>
          </div>
          <Caption>Keep scrolling...</Caption>
        </AnimatedGsapDiv>
      </Section>
      <Section>
        <AnimatedGsapImage {...validProps} src="https://fakeimg.pl/300x300/?retina=1&text=Hello&font=noto" className="w-[300px] h-[300px]" />
        <AnimatedGsapDiv {...validProps} className="p-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quam tortor, interdum vel velit id, aliquam pharetra nibh. Donec fermentum nunc in rutrum vulputate. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla tempor nibh nisl, a sodales elit dignissim ut. Suspendisse potenti. Nulla ut pharetra nulla, vitae feugiat ligula. Aliquam
          tincidunt quam augue, eget porta massa facilisis consequat. Phasellus eget mollis ante. Curabitur vulputate euismod leo, nec blandit nibh mattis sed. Quisque blandit mauris nibh.
        </AnimatedGsapDiv>
      </Section>
    </>
  );
}

const Section = memo((props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) => {
  return <section {...props} className="h-screen w-full flex flex-col md:flex-row justify-center items-center space-5" />;
});

const Caption = memo((props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>) => {
  return <span {...props} className="italic text-gray-600 dark:text-gray-300" />;
});
