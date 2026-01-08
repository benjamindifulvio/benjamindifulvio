# replit.md

## Overview

This is a personal portfolio website for Benjamin Di Fulvio, built as a modern single-page application with an Express backend. The portfolio showcases projects, includes an interactive tower defense game, and features a contact form that stores messages in a PostgreSQL database. The site uses scroll-driven animations and a neon-themed dark design aesthetic.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state and data fetching
- **Styling**: Tailwind CSS with a custom dark neon theme and CSS variables for theming
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Animations**: Framer Motion for scroll-based animations and transitions
- **Scroll Tracking**: react-intersection-observer for triggering section-based effects

### Backend Architecture
- **Framework**: Express.js running on Node.js
- **API Pattern**: RESTful endpoints with Zod schema validation shared between client and server
- **Route Definitions**: Centralized in `shared/routes.ts` with type-safe request/response schemas
- **Development Server**: Vite dev server with HMR proxied through Express

### Data Storage
- **Database**: PostgreSQL with Drizzle ORM
- **Schema Location**: `shared/schema.ts` - contains table definitions shared across frontend and backend
- **Migrations**: Managed via Drizzle Kit with `db:push` command
- **Current Tables**: `messages` table for contact form submissions

### Build System
- **Client Build**: Vite outputs to `dist/public`
- **Server Build**: esbuild bundles server code to `dist/index.cjs`
- **Shared Code**: The `shared/` directory contains schema and route definitions used by both client and server

### Project Structure
```
client/           # React frontend application
  src/
    components/   # UI components including shadcn/ui
    pages/        # Page components (Home, not-found)
    hooks/        # Custom React hooks
    lib/          # Utilities and query client
server/           # Express backend
  index.ts        # Server entry point
  routes.ts       # API route handlers
  storage.ts      # Database operations
  db.ts           # Database connection
shared/           # Shared code between client and server
  schema.ts       # Drizzle database schema
  routes.ts       # API route definitions with Zod schemas
```

## External Dependencies

### Database
- **PostgreSQL**: Required for message storage, connection via `DATABASE_URL` environment variable
- **Drizzle ORM**: Database toolkit for type-safe queries and schema management

### UI/Animation Libraries
- **Radix UI**: Headless UI primitives for accessible components
- **Framer Motion**: Animation library for scroll effects and transitions
- **canvas-confetti**: Celebration effects for the game feature

### Development Tools
- **Vite**: Frontend build tool with React plugin
- **esbuild**: Fast JavaScript bundler for server code
- **TypeScript**: Type checking across the entire codebase

### Deployment
- Configured for Vercel deployment via `vercel.json`
- GitHub Pages configuration in Vite config with base path `/benjamindifulvio/`