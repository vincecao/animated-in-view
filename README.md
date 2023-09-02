# Animated in view

Make experiments with different libraries for component appearing animations.

<a href="https://badge.fury.io/js/@vincecao%2Fanimated-in-view">
  <img src="https://badge.fury.io/js/@vincecao%2Fanimated-in-view.svg" alt="npm version" height="18" />
</a>
<a href="https://badge.fury.io/gh/vincecao%2Fanimated-in-view">
  <img src="https://badge.fury.io/gh/vincecao%2Fanimated-in-view.svg" alt="GitHub version" height="18" />
</a>

[Check live demo here](https://animated-in-view.vercel.app)

### Installation
```bash
npm i @vincecao/animated-in-view
yarn add @vincecao/animated-in-view
pnpm i @vincecao/animated-in-view
```

### Props
- `animateDisabled`: boolean = `false`
- `distance`: number = `100`
- `delay`: number = `200`
- `duration`: number = `600`
- `type`: `"fade" | "slide-bottom-to-top" | "slide-left-to-right" | "slide-right-to-left" | "slide-top-to-bottom"`

### Usage
```tsx
// animate image element using React Spring
<AnimatedSpringImage src="..." />

// animate div element using React spring
<AnimatedSpringDiv>...</AnimatedSpringDiv>

// animate image element using Framer Motion
<AnimatedMotionImage src="..." />

// animate div element using Framer Motion
<AnimatedMotionDiv>...</AnimatedMotionDiv>

// animate image element using React Transition Group
<AnimatedTransitionImage src="..." />

// animate div element using React Transition Group
<AnimatedTransitionDiv>...</AnimatedTransitionDiv>

// animate image element using GSAP
<AnimatedTransitionImage src="..." />

// animate div element using GSAP
<AnimatedTransitionDiv>...</AnimatedTransitionDiv>
```

### Animation libraries in examples
- [React Spring](https://www.react-spring.dev/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Transition Group](https://reactcommunity.org/react-transition-group/transition)
- [gsap](https://greensock.com/)
