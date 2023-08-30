# Animated in view

## Install
```bash
npm i @vincecao/animated-in-view
yarn add @vincecao/animated-in-view
pnpm i @vincecao/animated-in-view
```

# props
- `animateDisabled`: boolean = `false`
- `distance`: number = `100`
- `delay`: number = `200`
- `duration`: number = `600`
- `type`: `"fade" | "slide-bottom-to-top" | "slide-left-to-right" | "slide-right-to-left" | "slide-top-to-bottom"`

# usage
```tsx
// animate image element using react spring
<AnimatedSpringImage src="..." />

// animate div element using react spring
<AnimatedSpringDiv>...</AnimatedSpringDiv>

// animate image element using framer-motion
<AnimatedMotionImage src="..." />

// animate div element using framer-motion
<AnimatedMotionDiv>...</AnimatedMotionDiv>
```
