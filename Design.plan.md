# Design Plan — **FULL STACK / FULL DEPTH**

> A build-ready creative direction for Smit Gadhiya’s next personal portfolio.
>
> Research snapshot: **18 August 2026**  
> Deliverable type: immersive single-page portfolio with a persistent 3D world, scroll-directed storytelling, project case studies, and an optional mini-game.

---

## 1. Executive summary

The site should not look like a conventional portfolio with 3D objects placed inside separate cards. It should feel like one continuous, explorable system.

The central idea is **FULL STACK / FULL DEPTH**: a single persistent 3D object called the **Stack Core** remains present from the first hero frame to the final contact frame. The Core represents Smit’s full-stack thinking. It contains five visible layers—Interface, API, Services, Data, and Intelligence—and changes form as the user scrolls through real projects, skills, experience, and a short architecture game.

The site’s visual spectacle will therefore communicate a professional point:

> **Smit does not only build the visible interface. He understands and engineers the full system behind it.**

This plan intentionally combines:

- Apple/Samsung-style product storytelling: one premium object, precisely staged through scroll.
- Awwwards/Codrops-style continuous WebGL worldbuilding.
- Clear recruiter-friendly project outcomes and decision narratives.
- A small game that demonstrates system architecture rather than acting as an unrelated gimmick.
- 2026 material language: liquid refraction, color-responsive shaders, chrome, smoky glass, bold typography, and tactile micro-interactions.
- Progressive enhancement so the portfolio remains usable, readable, and impressive on mobile and lower-powered devices.

---

## 2. What the August 2026 research says

### 2.1 The useful trends

| Research signal | What is happening in 2026 | Decision for this portfolio |
| --- | --- | --- |
| Immersive 3D | Figma identifies 3D/immersive elements, experimental navigation, vibrant palettes, bold typography, motion, and gamification among the major 2026 directions. [Figma: Top Web Design Trends for 2026](https://www.figma.com/resource-library/web-design-trends/) | Build one persistent 3D narrative, not isolated visual tricks. |
| Scroll as spatial travel | A 2026 Codrops gallery uses Z-depth, scroll velocity, and palette changes so scrolling feels like moving through a mood rather than advancing a slideshow. [Codrops: Scroll-Reactive 3D Gallery](https://tympanus.net/codrops/2026/03/09/building-a-scroll-reactive-3d-gallery-with-three-js-velocity-and-mood-based-backgrounds/) | Use depth, camera travel, and controlled color states to connect every chapter. |
| A portfolio as a place | A 2026 Codrops case study argues that an immersive portfolio should feel like entering an environment, with the technology serving an underlying message. [Codrops: More Than a Portfolio](https://tympanus.net/codrops/2026/04/28/more-than-a-portfolio-building-a-scroll-driven-3d-world-with-something-to-say/) | Every transformation of the Stack Core must explain a real engineering capability. |
| Technical craft is visible | Current Awwwards portfolio listings prominently recognize Developer Awards and Sites of the Day, confirming that implementation craft is part of the portfolio’s message. [Awwwards Portfolio Collection](https://www.awwwards.com/websites/portfolio/) | Make the implementation itself evidence of creative-development ability. |
| Visuals are not enough | Wall of Portfolios’ July 2026 selections praise editorial identity, AI product thinking, measurable outcomes, clear storytelling, refined interaction, and ease of exploration. [Wall of Portfolios](https://www.wallofportfolios.in/?company=All) | Pair every 3D world with a concise problem, role, architecture, and result. |
| Case-study decisions matter | UXfolio recommends clear decision trails, explicit ownership, measurable impact, and problem → exploration → solution → outcome narratives. [UXfolio Portfolio Guide](https://blog.uxfol.io/ux-portfolio-examples/) | Project chapters must explain why the system was designed that way, not only list technologies. |
| Wow factor must remain usable | Webflow’s portfolio analysis favors animation and playful interaction when navigation remains intuitive and the work is easy to reach. [Webflow UX Portfolio Examples](https://webflow.com/blog/ux-designer-portfolio) | Keep a visible chapter navigator, skip controls, and readable DOM content throughout. |
| Playfulness is professionally relevant | Apple’s 2026 Design Awards recognize Delight and Fun, Inclusivity, Innovation, Interaction, and Visuals/Graphics as separate qualities; winning examples also include motion and sensory controls. [Apple Design Awards 2026](https://www.apple.com/newsroom/2026/06/apple-reveals-winners-of-the-2026-apple-design-awards/) | Make the mini-game delightful, short, optional, accessible, and connected to Smit’s engineering identity. |
| 3D is already crowded | Behance contains thousands of immersive developer and 3D portfolio concepts, and Dribbble is saturated with visually impressive but often shallow 3D website shots. [Behance: Immersive 3D Websites](https://www.behance.net/search/projects/immersive%20website%203d), [Dribbble: Three.js Portfolio Example](https://dribbble.com/shots/21415072-Three-js-WEBGL-Portfolio-Website-Example) | Avoid the generic “floating chrome sphere + tech badges” formula. Use a distinct story, real architecture, and project-specific worlds. |

### 2.2 The strategic conclusion

The strongest opportunity is not “more 3D.” It is **3D with meaning**.

The site should prove four things within the first minute:

1. Smit can create polished, unusual product experiences.
2. He understands complete systems, not only front-end presentation.
3. His work has real operational outcomes.
4. He can balance experimentation with performance, clarity, and accessibility.

### 2.3 Trends to use carefully

- **Liquid glass:** use it as a material for the Stack Core and small HUD surfaces, not on every card. Excessive blur reduces clarity and mobile performance.
- **Maximalism:** use visual density inside controlled 3D moments; keep the content layer editorial and calm.
- **Experimental navigation:** offer it as exploration, while retaining a normal chapter menu.
- **AI interfaces:** demonstrate actual extraction, search, RAG, and automation work. Do not add a generic chatbot merely because it is fashionable.
- **WebGPU:** use only as an enhancement. MDN still recommends feature detection and compatibility handling. [MDN: WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- **Scroll hijacking:** reject it. Use native page scroll with scrubbed animation, not a custom scroll behavior that traps or delays the visitor.

---

## 3. Positioning and audience

### Primary audience

- Engineering managers hiring a full-stack developer.
- Founders who need one person to understand product, backend, AI, and automation.
- Technical recruiters scanning for evidence of impact and ownership.

### Secondary audience

- Creative-development studios looking for developers who can bridge WebGL and product engineering.
- Other developers who may share the site and extend its reach.

### Desired visitor reaction

1. **First 5 seconds:** “This developer has unusually strong creative and technical range.”
2. **First 30 seconds:** “The 3D is explaining his stack, not covering weak content.”
3. **First 2 minutes:** “He has shipped systems with scale, AI, queues, caching, RBAC, and measurable outcomes.”
4. **Final action:** open a case study, visit GitHub/LinkedIn, or email Smit.

### Brand statement

> **I build the interface, the intelligence, and everything in between.**

### Hero headline

> **FULL STACK.**  
> **FULL DEPTH.**

### Supporting copy

> I engineer expressive product interfaces, resilient backend systems, and useful AI workflows—then connect them into products that hold up in the real world.

### Primary CTA

**Enter the system** → scrolls into the first chapter.

### Secondary CTA

**View selected work** → jumps directly to the project navigator without disabling the 3D context.

---

## 4. North-star concept: The Stack Core

### 4.1 What it is

The **Stack Core** is one real-time 3D hero object that persists behind or beside the content for the entire landing page.

It begins as a compact, closed, dark-chrome object. During the journey it opens into five nested layers:

1. **Interface shell** — translucent responsive surface.
2. **API ring** — connection and request routing.
3. **Services lattice** — event-driven modules and queues.
4. **Data chamber** — database, cache, and search structures.
5. **Intelligence seed** — AI, vector search, extraction, and automation.

Each layer has its own material, motion behavior, and accent color. By the final section, all five layers work together as one complete system.

### 4.2 Why it is distinctive

- It gives the entire page one visual memory instead of many unrelated 3D scenes.
- It makes “full-stack” physically understandable.
- It can transform into project-specific diagrams without disappearing.
- It behaves like the product object in an Apple/Samsung launch page, but the “product” is Smit’s engineering mind.
- It allows one renderer and one shared lighting system, improving visual consistency and performance.

### 4.3 Persistent companion: Byte

**Byte** is a small, optional developer drone that appears around the Stack Core.

- It wakes the Core in the hero.
- It carries data packets between layers.
- It points toward meaningful UI details.
- It becomes the controllable character in the mini-game.
- It docks inside the Core in the contact section.

Byte should have personality through movement, not speech bubbles or cartoon dialogue. The design should feel premium and slightly playful—not childish.

---

## 5. Visual identity

### 5.1 Art direction

**“Precision hardware meets living software.”**

The visual world mixes:

- Dark anodized metal.
- Smoked translucent glass.
- Color-responsive refraction.
- Soft rubberized/matte structural elements.
- Thin light filaments carrying data.
- Occasional grain and halftone texture in the DOM layer.
- Large editorial typography that remains readable while the 3D world moves behind it.

Avoid generic cyberpunk interfaces, excessive neon, star-field backgrounds, code rain, and random floating logos.

### 5.2 Custom color system

The palette uses one stable neutral system plus a controlled chapter accent. Color changes should feel like light moving through material, not a CSS gradient slideshow.

| Token | Hex | Role |
| --- | --- | --- |
| Void Ink | `#06070B` | Primary environment and dark UI. |
| Carbon | `#11131A` | Panels, shadows, depth. |
| Cloud Mineral | `#F2F0E8` | Primary text and bright surface. |
| Electric Iris | `#7B66FF` | Product/interface chapter. |
| Transform Teal | `#00C7B5` | Systems, services, healthcare, and scale. |
| Signal Lime | `#CFFF47` | Live state, success, interaction, CTA. |
| Thermal Coral | `#FF6177` | AI energy, alerts, transformation. |
| Data Blue | `#62D9FF` | Streams, links, search, and vector space. |

### 5.3 Color morphism rules

- The background begins near-black and never becomes a distracting rainbow.
- Each chapter has one dominant accent and one secondary accent.
- Shader uniforms interpolate between chapter palettes as the camera crosses transition zones.
- Glass tints itself from the environment behind it.
- High-value metrics use Signal Lime consistently.
- Error states and game hazards use Thermal Coral, but important content never relies on color alone.
- Project pages inherit the project’s chapter color so the experience remains coherent.

### 5.4 Typography

- **Display:** a variable grotesk with width and weight animation. Use a licensed face if available; otherwise retain Geist and create distinction through scale, spacing, and outline treatment.
- **Body:** Geist Sans or equivalent, 16–20 px desktop, 16–18 px mobile.
- **System labels:** Geist Mono, uppercase, 10–12 px, generous tracking.
- **Hero typography:** very large, but kept in the DOM so it loads immediately and remains selectable and accessible.
- Animate variable width or letter spacing subtly; never deform body copy.

### 5.5 Interface surface language

- Navigation and essential text sit on quiet opaque or semi-opaque surfaces.
- Liquid/refraction effects belong to the 3D material and a few action controls.
- Buttons use magnetic hover only on precise-pointer devices.
- The custom cursor changes label by context: `EXPLORE`, `DRAG`, `OPEN`, `PLAY`.
- Touch devices receive explicit controls instead of hover-dependent behavior.

---

## 6. Full landing-page journey

The page is one native vertical document with a fixed 3D canvas behind the DOM. Each chapter owns a scroll range and a camera state. Text and links remain normal HTML.

### Chapter map

| Chapter | Approx. scroll | DOM story | Stack Core / 3D action | Visitor interaction | Palette |
| --- | ---: | --- | --- | --- | --- |
| 00. Wake | 0–8% | Name, role, availability, hero headline, two CTAs. | A closed Core floats in darkness. Byte wakes it; five seams illuminate. | Pointer creates subtle light refraction. Scroll begins the opening sequence. | Void Ink + Electric Iris. |
| 01. The complete stack | 8–20% | One sentence for Interface, API, Services, Data, Intelligence. | Camera moves through the Core like an exploded hardware view. Each layer separates and labels itself. | Hover/keyboard focus highlights one layer and its related skills. | Iris → Data Blue. |
| 02. Selected systems | 20–58% | Four project chapters with problem, role, architecture, decision, and outcome. | The same Core docks into four project worlds and becomes part of each system. | Drag slightly to inspect; open full case study via visible button. | One controlled accent per project. |
| 03. Capability constellation | 58–68% | Full technology stack grouped by how tools work together. | Core explodes into an orbital dependency map; related technologies connect as constellations. | Hover a capability to isolate its real production chain. | Data Blue + Signal Lime. |
| 04. AI / automation lab | 68–76% | AI extraction, RAG/search, n8n workflows, and the principle “AI where it creates value.” | Data enters as raw fragments, becomes embeddings, moves through retrieval, and returns as structured output. | Toggle `Raw → Retrieve → Reason → Result`. | Thermal Coral + Iris. |
| 05. Packet Run mini-game | 76–84% | Optional “Play a 30-second architecture challenge.” | Byte leaves the Core. The layers become a short playable request pipeline. | Keyboard, pointer, or touch. Skip always visible. | Signal Lime + Thermal Coral. |
| 06. Commit trail | 84–92% | Experience, education, and operating principles. | Core travels along a luminous commit path; milestones assemble behind it. | Focus a milestone for role and responsibility details. | Cloud Mineral + Teal. |
| 07. Ship / contact | 92–100% | Availability, email, GitHub, LinkedIn, resume, location. | All layers close into a finished Core, then open into a portal/SG monogram. Byte docks. | `Start a conversation` energizes the portal before opening email. | Cloud Mineral + Signal Lime. |

### 6.1 Chapter 00 — Hero: Wake the system

#### Layout

- Full viewport, but the text is immediately visible before 3D finishes loading.
- Hero copy sits left/foreground on desktop and above the Core on mobile.
- A small vertical chapter rail shows `00 / 07`.
- Top navigation: Work, Stack, Play, Journey, Contact.
- Availability remains visible but quiet.

#### Motion

- No long mandatory preloader.
- The Core appears first as a low-detail silhouette, then gains material detail progressively.
- Pointer movement changes the key light by a few degrees; it does not wildly rotate the object.
- First scroll separates the Core shell into five layers.

#### Microcopy

- `FULL-STACK DEVELOPER / SURAT, INDIA`
- `PRODUCT · BACKEND · AI · AUTOMATION`
- `SCROLL TO COMPILE`

### 6.2 Chapter 01 — The complete stack

The Core becomes an exploded engineering diagram. Each layer maps directly to Smit’s experience:

| Core layer | Content | Visual behavior |
| --- | --- | --- |
| Interface | React, Next.js, TypeScript, Tailwind, state and data fetching. | Flexible glass shell responds to viewport aspect ratio. |
| API | Node.js, Express, REST, auth, WebSockets/SSE. | Routing ring receives and redirects request particles. |
| Services | Microservices, events, queues, background processing. | Modular blocks detach and communicate asynchronously. |
| Data | PostgreSQL, MongoDB, Redis, Elasticsearch, vector databases. | Dense data chamber switches between storage, cache, and search modes. |
| Intelligence | OpenAI, RAG, n8n, extraction, recommendations. | Small luminous seed grows connections only when supplied with retrieved context. |

This section should explain the portfolio’s visual metaphor within one scroll, ensuring the experience is understandable rather than merely abstract.

### 6.3 Chapter 02 — Project worlds

Each project gets a pinned 100–140vh sequence. The global camera and Core move into the next world; the canvas never cuts to a separate unrelated scene.

#### Project 01 — Levelios / **Orbital Organization**

- **World:** modular orbital station made of teams, employees, projects, and skills.
- **Core behavior:** becomes the authorization nucleus.
- **Signature interaction:** switch among Admin, Manager, and Employee. Station doors open or remain locked to demonstrate scoped RBAC.
- **AI moment:** a resume fragment enters the AI chamber and exits as structured candidate data.
- **Content proof:** full-stack SaaS architecture, RBAC, approval workflows, AI-assisted recommendations, resume parsing.
- **Case-study headline:** `One organization. Many roles. The right data for each.`
- **Decision narrative:** why role boundaries, approval states, and asynchronous AI work required separate system concerns.

#### Project 02 — My Ayur / **Pulse Network**

- **World:** a calm healthcare network with a central pulse and thousands of small user nodes.
- **Core behavior:** becomes the queue and cache controller.
- **Signature interaction:** a burst of notification packets first creates congestion; enabling queue workers and Redis reorganizes the traffic into smooth flows.
- **Content proof:** 7,000+ users, 20,000+ notifications/day, 4–5 services, and 40–50% API response-time improvement through caching.
- **Case-study headline:** `Making healthcare traffic feel calm at scale.`
- **Decision narrative:** why queues, caching, authentication, and service boundaries were used.

#### Project 03 — Quiz Prep / **Question Foundry**

- **World:** a floating taxonomy made of approximately 400 category cells.
- **Core behavior:** becomes an AI generation reactor connected to a workflow track.
- **Signature interaction:** the user selects Category + Subcategory + Count; particles travel through n8n and the AI chamber, then return as structured question blocks.
- **Content proof:** admin/user roles, category management, exam practice, and automated question generation.
- **Case-study headline:** `Turning a large taxonomy into a renewable question engine.`
- **Decision narrative:** why administrators remain in control of generation inputs and review.

#### Project 04 — NancyPackes / **Living Grid**

- **World:** a compact skyline of 40+ abstract properties sitting on an operational data grid.
- **Core behavior:** becomes a reusable table engine.
- **Signature interaction:** buildings flatten into rows and columns, then reorganize through sorting, pagination, role views, and export.
- **Content proof:** legacy migration, 40+ properties, reusable data table, infinite scroll, dynamic columns, Excel export, and four user roles.
- **Case-study headline:** `Turning dense property operations into a reusable interface system.`
- **Decision narrative:** how component architecture replaced repeated legacy UI patterns.

#### Project content template

Every project must expose these six items without requiring animation:

1. Problem.
2. Smit’s role and ownership.
3. Key technical decision.
4. System diagram.
5. Measurable or concrete outcome.
6. Link to full case study, repository, or a clearly marked private-work explanation.

### 6.4 Chapter 03 — Capability constellation

Do not display a wall of disconnected technology logos.

The scene should show practical production relationships:

- `Next.js → API → PostgreSQL`
- `API → Redis → response`
- `Event → Queue → Worker → notification`
- `Document → Embedding → Vector DB → Retrieval → LLM`
- `Webhook → n8n → API → business action`
- `Commit → GitHub Actions → Docker → cloud`

Hovering or focusing a capability dims unrelated nodes and displays a one-sentence example from Smit’s work. This proves understanding of systems rather than keyword collection.

### 6.5 Chapter 04 — AI / automation lab

This section must avoid the generic glowing brain visual.

Use a four-stage spatial pipeline:

1. **Raw:** resume, document, or business event enters.
2. **Retrieve:** search/vector nodes find relevant context.
3. **Reason:** the intelligence seed processes bounded context.
4. **Result:** structured candidate data, generated question, recommendation, or automated task exits.

The DOM explains Smit’s principle:

> **Use AI where it removes friction or improves a decision—not where it only adds a label.**

### 6.6 Chapter 05 — Mini-game: Packet Run

#### Game premise

Byte must ship one user request through a stable architecture before the latency meter fills.

#### Duration

- 25 seconds per run.
- One short level.
- Optional replay for a higher build score.

#### Flow

1. Byte enters through the Interface layer with 100% request integrity.
2. The route advances through Auth/API, Cache/Queue, Workers, and Delivery.
3. Eight corrupted packets (“bugs”) occupy changing lanes.
4. Each clean dodge adds to the build score; each collision removes 25% integrity.
5. Deliver the request before integrity reaches zero.

#### Controls

- Desktop: arrow keys or `A/D`, plus pointer drag.
- Pointer/mobile: horizontal swipe or two large left/right controls.
- Keyboard instructions appear before play.
- `Skip game` and `Exit` remain visible.
- Pause on lost focus.

#### Reward

- Each collected module lights one layer of the Stack Core.
- Completion message: `REQUEST SHIPPED / SYSTEM HEALTHY`.
- Unlock a small “System Builder” stamp beside the final contact CTA for the current session.
- No login, leaderboard, personal data, or server persistence.

#### Why this game belongs

The game demonstrates architectural judgment—request flow, caching, queues, and delivery. It makes Smit’s backend thinking playable instead of adding an unrelated platformer.

### 6.7 Chapter 06 — Commit trail

- Experience appears as a luminous path with meaningful commits rather than a generic timeline.
- Bigscal Technologies: interface components, responsive applications, Redux/RTK Query, and data-fetching optimization.
- Empiric Infotech: backend systems, databases, event-driven work, queues, AI/search, and automation.
- Education appears as the origin commit, not the visual climax.
- Principles appear as system invariants: Maintainable, Scalable, Automated, Useful AI, End-to-End.

### 6.8 Chapter 07 — Contact: Ship the next system

#### Headline

> **HAVE A SYSTEM**  
> **WORTH BUILDING?**

#### Supporting line

> Bring the product idea, the messy workflow, or the scaling problem. I’ll help turn it into something clear, reliable, and real.

#### Actions

- Primary: email Smit.
- Secondary: LinkedIn, GitHub, downloadable resume.
- Final 3D action: all Stack Core layers synchronize and open into an SG-shaped portal.
- Scrolling past the end is not required to see contact information.

---

## 7. Interaction and motion system

### 7.1 Master scroll behavior

- Use native vertical scrolling.
- A single master timeline maps normalized page progress to camera position, Core transforms, shader palettes, and chapter state.
- Scrubbed animation must reverse correctly when the user scrolls upward.
- Scroll velocity may influence small particles, light streak length, or camera easing—but never text readability.
- Camera travel follows a pre-authored spline with clearly composed “hero frames” at chapter stops.
- DOM entrances use CSS scroll-driven animations where supported; MDN notes that scroll timelines can reduce main-thread work compared with JavaScript listeners. [MDN: Scroll-Driven Animation Timelines](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations/Timelines)

### 7.2 Transition vocabulary

- **Open:** the Core separates into system layers.
- **Dock:** the Core connects to a project world.
- **Route:** particles move between system components.
- **Compile:** fragments assemble into structured output.
- **Explode:** layers become a skill constellation.
- **Resolve:** the system returns to one stable object.

Use these six verbs repeatedly so motion feels like a designed language.

### 7.3 Pointer response

- Maximum object tilt: 4–6 degrees.
- Light response: slightly larger than object movement to create material depth.
- No global custom cursor on touch devices.
- Hover interaction must never be required to reveal essential text.

### 7.4 Sound

- Off by default.
- Optional `Sound on` control after the hero is interactive.
- Short synthetic ticks, low pulses, routing sounds, and one game completion cue.
- Never play music automatically.
- Persist the preference locally only.

---

## 8. Navigation and readable content layer

### Desktop navigation

- Compact SG mark.
- Chapter rail with current section and progress.
- Visible links: Work, Stack, Play, Journey, Contact.
- Motion toggle and optional sound toggle.
- Availability/contact action.

### Mobile navigation

- Standard full-screen menu with large tap targets.
- Chapter titles and a one-line description.
- `Skip to work` and `Contact` remain immediate.
- Do not use a hidden radial menu as the only navigation.

### Content rules

- All project names, descriptions, metrics, links, and experience text remain semantic HTML.
- Canvas contains atmosphere and explanatory visualization, not the only copy.
- No paragraph longer than roughly 70 characters per line.
- Every pinned section has enough actual page height to preserve normal browser scrolling.
- Case studies may open as separate routes with a smooth shared-element transition, but the landing page itself remains complete.

---

## 9. Technical architecture

### 9.1 Recommended stack

- Keep Next.js App Router, React, TypeScript, and Tailwind.
- Retain `three` as the rendering foundation.
- Add `@react-three/fiber` for scene composition and React lifecycle management.
- Add `@react-three/drei` only for selected helpers; avoid importing broad unused utilities.
- Use GSAP + ScrollTrigger for the deterministic master 3D timeline.
- Retain Framer Motion for small DOM transitions only, or remove it if GSAP replaces all of its uses.
- Use Blender for modeling and animation authoring.
- Export glTF/GLB with Meshopt or Draco geometry compression and KTX2/Basis texture compression.
- Keep WebGL2 as the baseline. Experiment with WebGPU only behind feature detection and an automatic fallback.

### 9.2 Rendering structure

```text
App page
├── Accessible DOM chapters
│   ├── Hero
│   ├── Stack explanation
│   ├── Project chapters
│   ├── Capability constellation copy
│   ├── AI / automation copy
│   ├── Mini-game controls
│   ├── Experience
│   └── Contact
└── Fixed ExperienceCanvas (one renderer)
    ├── CameraRig
    ├── StackCore
    ├── ByteCompanion
    ├── ProjectWorldManager
    ├── DataParticles
    ├── LightingRig
    ├── PaletteController
    ├── QualityController
    └── GameMode
```

### 9.3 Scene state

- `scrollProgress`: normalized global progress.
- `activeChapter`: content and scene state.
- `qualityTier`: high, balanced, reduced, static.
- `motionEnabled`: OS preference plus manual override.
- `soundEnabled`: explicit user preference.
- `gameState`: idle, instructions, playing, paused, complete.
- `focusedEntity`: project/layer selected through pointer or keyboard.

Keep durable portfolio content in `lib/content.ts`; keep scene choreography in a separate typed timeline configuration.

### 9.4 Asset streaming

- Load the low-detail Core first.
- Load detailed Core materials after the hero text is visible.
- Preload only the next project world, not every world at startup.
- Dispose project-specific geometry and high-resolution textures after leaving distant chapters when memory pressure is detected.
- Pause the render loop when the document is hidden.
- Reduce render frequency when the canvas is visually static.

### 9.5 Case-study routes

Recommended routes:

```text
/
/work/levelios
/work/my-ayur
/work/quiz-prep
/work/nancypackes
```

Each route should use a lighter 3D header derived from the project world, followed by a conventional readable case study. Do not repeat the full landing-page journey on every route.

---

## 10. 3D production specification

### Core model

- Hero silhouette must remain recognizable at 160 px wide.
- Five separable layers with clean pivots.
- No tiny mechanical details that disappear after compression.
- Materials: smoky glass, dark chrome, satin polymer, emissive filaments.
- Use baked normals/curvature where possible instead of geometry-heavy detail.

### Project worlds

- Each world uses one modular kit rather than a completely unique high-poly scene.
- Reuse the same data particles, glass panels, connection lines, and lighting rig.
- Give each project one unmistakable silhouette:
  - Levelios: orbital organization station.
  - My Ayur: pulse network.
  - Quiz Prep: category foundry.
  - NancyPackes: property/grid skyline.

### Byte model

- 8–15k triangles maximum at highest LOD.
- Strong silhouette, two articulated arms/tools, one central status light.
- Three animation groups: idle, route/fly, success.
- No lip sync or dialogue system.

### Post-processing

- Subtle bloom only on selected emissive materials.
- Very light chromatic separation during chapter transitions only.
- Contact shadows or baked ambient occlusion for grounding.
- No full-screen depth-of-field while the user is reading.
- Disable expensive effects on balanced/reduced tiers.

---

## 11. Performance budget

A full 3D portfolio is only impressive when it feels responsive.

### Experience targets

- LCP: **≤ 2.5 s at the 75th percentile**, matching web.dev’s “good” target. [web.dev: Largest Contentful Paint](https://web.dev/articles/lcp)
- INP: **≤ 200 ms**.
- CLS: **≤ 0.1**.
- Desktop animation: target 60 fps.
- Modern mobile animation: target stable 30–45 fps.
- First meaningful DOM content must not wait for WebGL.

### Asset budgets

- Initial Core GLB: ≤ 1.5 MB compressed.
- Total 3D assets loaded across the complete visit: target ≤ 6 MB compressed.
- Initial critical textures: ≤ 2 MB.
- Maximum texture size: 2048 only for a hero-critical atlas; prefer 1024.
- Visible triangles: target ≤ 180k desktop and ≤ 65k mobile.
- One WebGL/WebGPU renderer for the page.
- Device pixel ratio cap: 1.5 desktop, 1.25 mobile.
- No autoplay video backgrounds.

### Adaptive quality tiers

| Tier | Conditions | Experience |
| --- | --- | --- |
| High | Strong desktop GPU, WebGL2/WebGPU available, no reduced-motion preference. | Full materials, particles, selective post-processing, 60 fps target. |
| Balanced | Most laptops and modern phones. | Lower DPR, reduced particles, simplified shadows, 30–45 fps target. |
| Reduced | Low memory, thermal pressure, low frame rate, or data-saving mode. | Low-poly worlds, no post-processing, fewer animated objects. |
| Static | WebGL unavailable or motion disabled. | Pre-rendered scene frames plus complete DOM storytelling. |

The quality controller should step down automatically after sustained slow frames and never announce an error to the visitor.

---

## 12. Accessibility and comfort

WCAG guidance requires a way to disable non-essential interaction-triggered motion, and specifically identifies parallax as a possible vestibular trigger. [W3C: Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions)

### Required behavior

- Respect `prefers-reduced-motion` on first visit.
- Add a visible `Motion: full / reduced` setting.
- Reduced mode replaces camera travel with crossfades and static project compositions.
- Allow all auto-moving decorative content to pause.
- Game is optional and fully skippable.
- Keyboard navigation reaches every link, project, setting, and game control.
- Provide a text alternative describing the purpose of each 3D scene.
- Maintain WCAG AA text contrast on top of every palette state.
- Never encode status using color alone.
- Minimum touch target: 44 × 44 px.
- Avoid flashes and rapid full-screen luminance changes.
- Sound remains off until explicitly enabled.
- Provide a `Skip immersive intro` link that moves directly to selected work.

---

## 13. Responsive behavior

### Desktop ≥ 1200 px

- Full persistent canvas.
- Split compositions with text and Core changing sides.
- Pointer lighting and small drag inspection.
- Full project-world detail and optional post-processing.

### Tablet 768–1199 px

- Core occupies a stable upper or central field.
- Text chapters use shorter pinned sequences.
- No custom cursor.
- Reduced particles and simpler camera parallax.

### Mobile < 768 px

- Keep the Core genuinely 3D, but use simplified LODs.
- DOM content always leads the composition.
- Each project becomes a shorter scene with a clear static resting frame.
- Use touch drag only where it adds understanding.
- Game uses two large controls or drag input.
- Avoid fixed viewport traps and browser-address-bar jumps.
- Use the static quality tier automatically on devices that cannot maintain the minimum frame rate.

---

## 14. Content upgrades required before implementation

The current content is strong enough to establish the structure, but several items should be improved before final production.

### For every project

- Exact role and team context.
- Project duration.
- What Smit personally owned.
- One difficult technical decision and its trade-off.
- One architecture diagram verified for accuracy.
- One measurable outcome where available.
- Whether the work is public, private, or under NDA.
- Screenshots or UI assets that can be safely shown.

### Priority content gaps

- Levelios needs a concrete outcome beyond feature coverage.
- Quiz Prep needs a measurable generation or admin-efficiency result if available.
- NancyPackes needs clearer migration impact and the correct project spelling/brand confirmation.
- Experience entries need one high-value achievement each, not only technology lists.
- Add a downloadable resume.
- Add GitHub repository links or short explanations when code is private.
- Confirm `hello@smitgadhiya.com` and all external links before launch.

---

## 15. Build sequence

### Phase 0 — Proof of concept

- Prototype the Core silhouette and five-layer opening.
- Test one 200vh scroll timeline with reversible motion.
- Validate desktop/mobile frame rates before modeling project worlds.
- Test full-motion and reduced-motion modes immediately.

### Phase 1 — Design system and content

- Finalize palette, materials, typography, grid, and HUD.
- Rewrite hero and project case-study copy.
- Produce project storyboards and camera frames.
- Lock the exact chapter scroll lengths.

### Phase 2 — Persistent world

- Build one fixed canvas and camera rig.
- Implement the Core, Byte, lighting, palette morphing, and quality tiers.
- Connect chapter progress to scene configuration.
- Keep DOM content usable without the canvas.

### Phase 3 — Project worlds

- Build worlds in order: My Ayur, Levelios, Quiz Prep, NancyPackes.
- My Ayur goes first because it has the clearest measurable scale story.
- Add project-specific interactions only after the base transition works.

### Phase 4 — Capability and AI chapters

- Build dependency constellation.
- Build Raw → Retrieve → Reason → Result pipeline.
- Add keyboard/focus equivalents for hover behavior.

### Phase 5 — Mini-game

- Implement Packet Run as a mode within the existing canvas.
- Add input abstraction for keyboard, pointer, and touch.
- Add pause, skip, reduced-motion, and completion behavior.

### Phase 6 — Case-study routes

- Build the readable long-form templates.
- Add project visual headers and shared-element transitions.
- Verify every metric and ownership claim.

### Phase 7 — Optimization and QA

- Compress geometry and textures.
- Add adaptive quality controller.
- Test Safari, Chrome, Firefox, Edge, iOS, and Android.
- Test keyboard, screen reader order, reduced motion, zoom, and contrast.
- Run performance profiling on at least one low/mid-tier Android device.

---

## 16. Acceptance criteria

The redesign is complete only when all of the following are true:

- The same Stack Core is visually present from hero through contact.
- Every major 3D transformation maps to a real skill, project, or system concept.
- All four projects expose problem, role, decision, architecture, and outcome.
- A visitor can jump directly to work or contact without playing through the experience.
- The mini-game is optional, under 45 seconds, and usable with keyboard and touch.
- Reduced-motion mode removes camera travel and non-essential spatial movement.
- Essential content remains available when WebGL is disabled.
- The hero text appears before the high-detail 3D assets finish loading.
- The site uses one renderer and adaptive quality tiers.
- Mobile maintains a stable experience without overheating or trapping scroll.
- The visual system uses the defined custom palette rather than unrelated project colors.
- No mandatory audio, long intro loader, hidden-only navigation, or hover-only content.
- Core Web Vitals and accessibility targets are verified before launch.

---

## 17. Explicit “do not build” list

- Do not create a separate 3D canvas for every section.
- Do not use generic floating technology logos as the main skills section.
- Do not build a fake AI chatbot with no useful portfolio function.
- Do not autoplay music or force an “Enter experience” gate.
- Do not make the game required to reach projects or contact details.
- Do not use smooth-scroll hijacking that changes expected wheel/touch behavior.
- Do not hide metrics and case-study content inside the canvas.
- Do not use glass blur on every surface.
- Do not use WebGPU without a WebGL/static fallback.
- Do not sacrifice legibility for constant animation.
- Do not copy a Dribbble, Behance, Apple, Samsung, or Awwwards composition literally.

---

## 18. Final design decision

The recommended direction is:

> **A cinematic, persistent 3D “Stack Core” journey that physically reveals Smit’s complete engineering stack, docks into four project worlds, becomes a playable request pipeline, and resolves into a contact portal.**

This direction is more defensible and memorable than a collection of trendy 3D objects because the visual system is inseparable from Smit’s actual story: product interfaces on the outside, reliable architecture underneath, and useful intelligence at the center.
