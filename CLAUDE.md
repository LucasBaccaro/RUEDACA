# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server (localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Architecture Overview

This is a **Next.js 16 (App Router)** portfolio application with bilingual support (Spanish/English), AI chatbot integration, and email contact form.

### Key Technologies
- **Framework**: Next.js 16.0.2 with App Router
- **UI**: React 19.2.0, Tailwind CSS v4, Framer Motion
- **AI**: OpenAI ChatKit (`@openai/chatkit-react`)
- **Email**: Resend service
- **Styling**: CVA (Class Variance Authority) for component variants
- **i18n**: Custom Context-based translation system

### Directory Structure

```
app/
├── api/
│   ├── contact/route.ts          # Resend email handler
│   └── chatkit/
│       ├── session/route.ts      # ChatKit session creation
│       └── refresh/route.ts      # ChatKit token refresh
├── globals.css                   # Design system + Tailwind config
├── layout.tsx                    # Root layout with I18nProvider
└── page.tsx                      # Home page (composes all sections)

components/
├── ui/                           # Reusable UI primitives
│   ├── button.tsx                # CVA-based button with 6 variants
│   ├── navbar.tsx                # Responsive nav with mobile menu
│   ├── chatbot.tsx               # ChatKit wrapper component
│   └── language-selector.tsx    # Animated language switcher
└── sections/                     # Page sections
    ├── hero.tsx
    ├── about.tsx
    ├── projects.tsx
    ├── skills.tsx
    └── contact.tsx

lib/
├── i18n-context.tsx              # i18n provider + translations
└── utils.ts                      # Utility functions (cn helper)
```

## Internationalization (i18n)

**Pattern**: Context-based client-side translation system

- **Provider**: `I18nProvider` wraps app in `layout.tsx`
- **Hook**: `useI18n()` returns `{ language, setLanguage, t }`
- **Languages**: Spanish (`es`) and English (`en`)
- **Persistence**: localStorage saves language preference
- **Usage**: `t("nav.home")`, `t("hero.welcome")` with dot notation

All user-facing text must be added to the translation object in `lib/i18n-context.tsx` under both `es` and `en` keys.

## API Routes

### Contact Form (`POST /api/contact`)
- Sends emails via **Resend** service
- Requires: `RESEND_API_KEY` environment variable
- Domain verified: `ruedaca.com`
- Sender: `noreply@ruedaca.com`
- Recipient: `ruedaca97@gmail.com`
- Validates all form fields (name, email, subject, message)

### ChatKit Session (`POST /api/chatkit/session`)
- Creates OpenAI ChatKit session for new users
- Requires: `OPENAI_API_KEY` environment variable
- Fixed workflow ID: `wf_69164cb6b4c88190a251d7eed0c7219e06196a28825722ba`
- Returns `client_secret` for frontend initialization

### ChatKit Refresh (`POST /api/chatkit/refresh`)
- Refreshes expired ChatKit tokens
- Currently creates new session instead of refreshing existing
- Uses same workflow ID as session endpoint

## Design System

### Color System
All colors use **HSL format** with CSS custom properties defined in `globals.css`:

- **Primary**: Purple (`#D797EE` / `285 72% 76%`)
- **Accent**: Lime Yellow (`#EAFE61` / `68 92% 66%`)
- **Secondary**: Sky Blue (`#9BC3FF` / `214 100% 81%`)

Each color has `-dark`, `-glow`, and `-foreground` variants. Example:
```css
var(--primary)           /* Base color */
var(--primary-dark)      /* Hover state */
var(--primary-glow)      /* Glow effects */
```

### Spacing System
8px base unit (multiples of `0.5rem`):
- `--spacing-xs` through `--spacing-3xl` (8px → 96px)

### Component Variants
Use **CVA** (Class Variance Authority) for type-safe component variants:
```typescript
const buttonVariants = cva(baseClasses, {
  variants: { variant: {...}, size: {...} }
})
```

Button component has 6 variants: `default`, `hero`, `accent`, `secondary`, `ghost`, `outline`, `soft`

### Animations
Extensive animation system in `globals.css`:
- Entrance: `fade-in-up`, `fade-in-down`, `fade-in-left`, `fade-in-right`, `scale-in`
- Ambient: `float`, `float-slow`, `rotate-slow`
- Attention: `glow`, `pulse-glow`
- 3D: `tilt-3d`

All animations respect `prefers-reduced-motion` for accessibility.

## State Management

No external state library (Redux/Zustand). Uses:

1. **Context API**: `I18nContext` for global language state
2. **Local State**: Component-level `useState` for UI state
3. **Framer Motion**: Animation state
4. **ChatKit**: Message state managed by library

## Key Architectural Patterns

### 1. Composition Over Inheritance
`page.tsx` composes all sections (Navbar, Hero, About, Projects, Skills, Contact, Footer, Chatbot). Each section is a self-contained client component.

### 2. Client Components with Server Root
- Root `layout.tsx` is server component providing `I18nProvider`
- Child components use `"use client"` directive for interactivity
- Leverages Next.js 13+ hybrid rendering

### 3. API Route Abstraction
All external integrations (OpenAI ChatKit, Resend) go through `/app/api` routes. Frontend components never call external APIs directly. This enables:
- Secure credential management via environment variables
- Request validation and error handling
- Consistent response format

### 4. Mobile-First Responsive Design
All components use Tailwind breakpoints (`md:`, `lg:`) for progressive enhancement from mobile base styles.

## Environment Variables

Required for full functionality:

```bash
OPENAI_API_KEY=sk-...        # ChatKit AI integration
RESEND_API_KEY=re_...        # Email sending via Resend
```

## Important Notes

1. **ChatKit Integration**: The workflow ID is hardcoded in the API routes. If you need to change the ChatKit behavior, update the workflow in OpenAI's dashboard and update the ID in both `/api/chatkit/session/route.ts` and `/api/chatkit/refresh/route.ts`.

2. **Email Configuration**: The contact form sends from `noreply@ruedaca.com` (verified domain) to `ruedaca97@gmail.com`. The domain `ruedaca.com` is verified in Resend with all DNS records configured.

3. **Translation Updates**: When adding new UI text, you MUST add translations to both `es` and `en` objects in `lib/i18n-context.tsx`. Use nested dot notation (e.g., `"section.subsection.key"`).

4. **Tailwind v4**: This project uses Tailwind CSS v4 via PostCSS. Import directive is `@import "tailwindcss";` in `globals.css`, not the traditional Tailwind config file pattern.

5. **TypeScript Strict Mode**: The project uses strict TypeScript. All components and functions should be properly typed.

6. **Client Component Requirement**: Any component using hooks (`useState`, `useEffect`, `useI18n`, Framer Motion) must have `"use client"` directive at the top.
