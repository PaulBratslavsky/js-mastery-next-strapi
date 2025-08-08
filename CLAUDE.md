# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
cd client && npm run dev          # Start dev server with Turbopack
cd client && npm run build        # Production build
cd client && npm run start        # Start production server
cd client && npm run lint         # Run ESLint validation
```

### Testing
```bash
cd client && npm run test         # Run Playwright tests
cd client && npm run test:headed  # Run tests with browser UI
cd client && npm run test:ui      # Run tests with Playwright UI
cd client && npm run test:report  # Show test report
```

### Working Directory
Always navigate to the `client/` directory for development commands as this is where the Next.js application resides.

## Architecture Overview

This is a **Next.js 15 application** using the **App Router** with TypeScript and Tailwind CSS. The project follows a monorepo structure with the main application in the `client/` directory.

### Tech Stack
- **Next.js 15.3.2** with App Router and Turbopack
- **React 19.0.0** with modern features
- **TypeScript 5** with strict configuration
- **Tailwind CSS v4** with extensive custom design system
- **NextAuth v5.0.0-beta** for GitHub OAuth authentication
- **shadcn/ui** components built on Radix UI primitives
- **React Hook Form + Zod** for form validation

### Route Structure
The app uses **route groups** for organization:
- `app/(auth)/` - Authentication pages (sign-in, sign-up)
- `app/(root)/` - Main application with dashboard layout
- `app/api/` - API routes (NextAuth configuration)
- Dynamic routes: `[url]`, `[id]` for user profiles

### Component Organization
- `src/components/ui/` - shadcn/ui components (Button, Input, etc.)
- `src/components/forms/` - Form components with validation
- `src/components/navigation/` - Navigation and layout components
- `src/components/cards/` - Content display components
- `src/components/search/` - Search functionality components

### Authentication Architecture
Uses **NextAuth v5** with:
- GitHub OAuth provider configuration
- Middleware-based route protection (`middleware.ts`)
- Session management integrated with React components
- Environment variables for OAuth credentials in `.env.local`

### Styling System
**Tailwind CSS v4** with comprehensive design system:
- Custom CSS properties in `src/app/globals.css`
- Utility classes for spacing, colors, typography
- Dark/light theme support via `next-themes`
- Component-specific styling follows utility-first approach

### Type Safety
- Path aliases configured (`@/` maps to `src/`)
- Zod schemas for runtime validation in `src/lib/validation.ts`
- TypeScript strict mode with comprehensive type checking
- Custom type definitions in `src/types/`

### Key Configuration Files
- `next.config.ts` - Image optimization for localhost:1337 (likely Strapi backend)
- `components.json` - shadcn/ui configuration with custom paths
- `middleware.ts` - Route protection and authentication middleware
- `tailwind.config.ts` - Design system configuration

### Form Handling Pattern
Forms use React Hook Form + Zod validation:
```typescript
const form = useForm<z.infer<typeof ValidationSchema>>({
  resolver: zodResolver(ValidationSchema),
  defaultValues: { /* ... */ }
})
```

### API Integration
The Next.js app appears designed to work with a backend API (port 1337 configured in next.config.ts suggests Strapi CMS integration).

## Development Notes

- Always work within the `client/` directory for Next.js development
- Use Turbopack for faster development builds (`npm run dev`)
- Follow the existing component patterns when creating new UI elements
- Authentication state is managed through NextAuth sessions
- Theme switching is handled by `next-themes` provider
- Form validation should always use Zod schemas for type safety