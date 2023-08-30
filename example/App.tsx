import React, { memo, useEffect, useMemo } from "react";
import { useControls } from 'leva';
import { z } from "zod";
import { AnimatedSpringImage, AnimatedMotionImage, AnimatedSpringDiv, AnimatedMotionDiv } from "@vinceocao/animated-in-view";

const controlSchema = z.object({
  animateDisabled: z.boolean(),
  distance: z.number(),
  delay: z.number(),
  duration: z.number(),
  type: z.enum(["fade", "slide-bottom-to-top", "slide-left-to-right", "slide-right-to-left", "slide-top-to-bottom"]),
});

const CONTROL_SCHEMA_KEY = 'control-schema'

function getControlSchema() {
  const initial = {
    animateDisabled: false,
    distance: 100,
    delay: 300,
    duration: 1500,
    type: 'fade'
  }
  try {
    const match = localStorage.getItem(CONTROL_SCHEMA_KEY)
    if (match) return { ...initial, ...(JSON.parse(match) ?? {}) }
  } catch (e) { }
  return initial
}

export default function App() {
  const sectionProps = useControls(getControlSchema());

  const [validProps, error] = useMemo(() => {
    const result = controlSchema.safeParse(sectionProps)
    if (result.success) {
      return [result.data, undefined]
    } else {
      return [{}, result.error]
    }
  }, [sectionProps])

  useEffect(() => {
    localStorage.setItem(CONTROL_SCHEMA_KEY, JSON.stringify(validProps))
  }, [validProps])

  if (error) {
    return <pre className="font-mono">{JSON.stringify(JSON.parse(String(error)), null, 4)}</pre>
  }

  return (
    <>
      <Section>
        <h1>
          <code className="font-mono">Animated-in-view</code> example and doc
        </h1>
      </Section>
      <Section>
        <AnimatedSpringImage {...validProps} src="https://fakeimg.pl/300x300/?retina=1&text=Hello&font=noto" className="w-[300px] h-[300px]" />
        <AnimatedSpringDiv {...validProps} className="p-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quam tortor, interdum vel velit id, aliquam pharetra nibh. Donec fermentum nunc in rutrum vulputate. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla tempor nibh nisl, a sodales elit dignissim ut. Suspendisse potenti. Nulla ut pharetra nulla, vitae feugiat ligula. Aliquam
          tincidunt quam augue, eget porta massa facilisis consequat. Phasellus eget mollis ante. Curabitur vulputate euismod leo, nec blandit nibh mattis sed. Quisque blandit mauris nibh.
        </AnimatedSpringDiv>
      </Section>
      <Section>
        <AnimatedMotionImage {...validProps} src="https://fakeimg.pl/300x300/?retina=1&text=Hello&font=noto" className="w-[300px] h-[300px]" />
        <AnimatedMotionDiv {...validProps} className="p-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quam tortor, interdum vel velit id, aliquam pharetra nibh. Donec fermentum nunc in rutrum vulputate. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla tempor nibh nisl, a sodales elit dignissim ut. Suspendisse potenti. Nulla ut pharetra nulla, vitae feugiat ligula. Aliquam
          tincidunt quam augue, eget porta massa facilisis consequat. Phasellus eget mollis ante. Curabitur vulputate euismod leo, nec blandit nibh mattis sed. Quisque blandit mauris nibh.
        </AnimatedMotionDiv>
      </Section>
    </>
  );
}

const Section = memo((props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) => {
  return <section {...props} className="h-screen w-full flex justify-center items-center space-x-5" />;
});
