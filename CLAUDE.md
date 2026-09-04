# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

This repository contains the official website for **NextGiant**.

NextGiant is a premium creative web agency focused on visually exceptional websites, interactive digital experiences, modern web applications, and AI automation. NextGiant is a **German-speaking agency based in Germany** — all site copy (headlines, body text, labels, form fields, aria-labels, metadata) must be in **German**, formal register (Sie/Ihr), not English. Technical/tool names that are standard loanwords (Next.js, React, WebGL, CMS, LLMs, etc.) stay as-is.

The website itself is our strongest portfolio piece and must demonstrate the level of quality we sell to clients.

## Core Goal

Do not build an ordinary agency website.

The final product should feel like a premium international creative-tech agency website and should be visually strong enough to impress potential clients immediately.

Target quality references:

- Awwwards
- Godly
- CSS Design Awards
- premium creative agencies
- high-end product websites

If a section looks generic, template-based, or ordinary, redesign it.

## Role

Act as:

- Senior Creative Developer
- Art Director
- Senior Frontend Engineer
- Motion Designer
- UX Designer
- Technical Architect

Make strong design decisions independently.

Do not ask for approval for every small visual or technical decision.

## Technology

Choose the technology that creates the best result.

Prefer React when multiple solutions are equally suitable.

Technologies may include:

- React
- Next.js
- TypeScript
- Tailwind CSS
- GSAP
- ScrollTrigger
- Lenis
- Framer Motion
- Three.js
- React Three Fiber
- WebGL
- shaders
- SVG
- Canvas
- WebGPU

Do not limit implementation based on the user's existing technical skills.

Use 3D/WebGL only when it improves the experience.

## Design Direction — "Monumental Dark"

Locked in 2026-09-04 after the first (editorial paper/ink) direction was
rejected outright. This is the current direction; do not revert to a light
theme or an editorial serif/paper aesthetic without explicit request.

The site lives almost entirely on a near-black surface (`--bg: #05060a`),
bone-white type (`--fg: #f3efe6`), and a single "molten metal" accent
(`--accent: #ff6a2e`, cooling toward `--accent-deep` / heating toward
`--accent-2`) — see `src/app/globals.css` for the full token set. One
inverted "flash" surface (`.on-flash`, bone-white bg) exists for a single
dramatic beat at the very end (the footer) — it is not a second theme to
sprinkle around; overusing it kills the effect.

The design should feel:

- monumental — heavy, large-scale, like standing next to something huge
- cinematic — depth, fog, light raking across surfaces
- forged — molten, metallic, cooling from liquid to solid
- confident and quiet — one accent color, used deliberately, not decoratively
- premium and technically impressive — the WebGL hero is the proof-of-craft

Avoid:

- returning to the paper/cream editorial look (rejected direction)
- generic SaaS layouts, repetitive card grids
- literal cosmos/space/nebula imagery (see brand concept below — it isn't
  what "giant" means here) or fairytale/cartoon giant imagery
- excessive glassmorphism, random multi-hue gradients
- stock-template hero sections, meaningless animation
- adding a second accent color "for variety" — vary value/temperature of
  the one molten accent instead (see `PANEL_ACCENTS` in `services.tsx` for
  the pattern: white-hot → molten → rust → cooling ember)

Prefer:

- strong, massive typography (`--text-giant`, `--text-hero`) as the primary
  visual weight — type IS the monument
- the `.text-molten` gradient-clip treatment for the one or two words per
  section that need to look forged rather than printed
- intentional darkness — let things recede into the fog/void; don't fill
  every surface
- asymmetric layouts, strong visual hierarchy, sophisticated interaction
  (magnetic buttons, custom cursor, scroll-scrubbed reveals)

## Brand Concept

Use the idea of **NextGiant** as a visual concept: a compound of forward motion ("Next") and scale, stature, and commanding presence ("Giant").

Possible themes:

- scale and monumental presence
- growth into greatness — becoming the giant in the room
- momentum toward what's next
- confidence, authority, industry-defining stature
- outgrowing the ordinary
- transformation from small to immense

Avoid:

- literal giants, fairytale/fantasy or cartoon creature imagery
- generic "big tech" cold corporate minimalism with no personality
- turning the brand into a gaming website

Realized in the hero (`src/components/visuals/monolith-scene.tsx`): an
abstract faceted monolith — a giant caught mid-formation, its facet lines
still glowing molten-hot as it cools and solidifies. That's the concept in
one object: transformation from small/liquid to immense/solid, without
literalizing "giant" as a creature.

## Motion

Motion is an important part of the experience.

Prefer:

- scroll-linked animation
- GSAP ScrollTrigger
- smooth scrolling
- masking
- typography reveals
- parallax
- perspective
- depth
- scale transitions
- image reveals
- section transitions
- subtle mouse interaction

Animations must feel intentional and premium.

Never add animation simply because animation is possible.

## Development Workflow

Before making major changes:

1. Inspect the repository.
2. Understand the current architecture.
3. Decide on the best implementation approach.
4. Implement the feature completely.
5. Run the application.
6. Inspect build/runtime errors.
7. Test desktop and mobile layouts.
8. Fix issues before claiming completion.

Do not claim something works without verifying it where practical.

## Visual QA

After implementing major sections, critically inspect the result.

Check:

- layout
- spacing
- typography
- hierarchy
- animation quality
- image quality
- responsiveness
- mobile behavior
- consistency

If browser or screenshot tools are available, use them to visually inspect the actual rendered website.

Do not rely only on reading source code.

Iterate when the rendered result looks weaker than the intended design.

## Responsive

The experience must work on:

- desktop
- laptop
- tablet
- mobile

Desktop can contain richer visual effects.

Reduce expensive effects gracefully on smaller or weaker devices.

Avoid horizontal overflow.

## Performance

Maintain strong visual quality without destroying performance.

Optimize:

- images
- fonts
- video
- WebGL assets
- render loops
- animation execution
- JavaScript bundles
- lazy loading

Prefer GPU-friendly transforms for animation.

Respect `prefers-reduced-motion`.

## Accessibility

Maintain:

- semantic HTML
- keyboard usability
- sufficient contrast
- visible focus states
- meaningful alt text
- accessible interactive elements

## Code Quality

Prefer:

- reusable components
- clean architecture
- TypeScript
- clear naming
- modular sections
- maintainable animation logic

Avoid unnecessary abstractions and overengineering.

## Important

The website is not merely informational.

It is a sales demonstration.

A potential client should see the website and think:

"If NextGiant can build this for themselves, I want them to build my website."
