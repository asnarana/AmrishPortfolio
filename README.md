# AmrishPortfolio


## Overview

This is a modern full-stack portfolio application showcasing an AI Developer and Software Engineer's professional profile. The application is built using React with TypeScript for the frontend, Express.js for the backend, and designed to be deployed with PostgreSQL database integration. The portfolio features a responsive design with dark/light theme support, contact form functionality, and comprehensive sections for skills, projects, and experience.

## System Architecture

The application follows a monorepo structure with clear separation between client, server, and shared components:

- **Frontend**: React with TypeScript, using Vite as the build tool
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack Query for server state management
- **Theme System**: Custom theme provider with dark/light mode support

## Key Components

### Frontend Architecture
- **Component Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and responsive design
- **Routing**: Wouter for client-side routing
- **Forms**: React Hook Form with Zod validation
- **Theming**: Context-based theme provider with localStorage persistence
- **Animations**: CSS animations and transitions for enhanced UX

### Backend Architecture
- **Server Framework**: Express.js with TypeScript
- **API Design**: RESTful API endpoints for contact form submission
- **Database Layer**: Drizzle ORM with PostgreSQL
- **Storage Interface**: Abstracted storage layer with in-memory fallback
- **Error Handling**: Centralized error handling middleware
- **Development**: Vite integration for hot module replacement

### Database Schema
- **Users Table**: Basic user authentication structure (extensible)
- **Contact Messages Table**: Stores form submissions with timestamp tracking
- **Schema Validation**: Zod schemas for type-safe database operations

### UI Components
- **Design System**: Consistent component library with variants
- **Accessibility**: ARIA-compliant components via Radix UI
- **Responsive Design**: Mobile-first approach with breakpoint management
- **Interactive Elements**: Hover states, focus management, and smooth transitions

## Data Flow

1. **Client-Side**: React components manage local state and trigger API calls
2. **API Layer**: Express routes handle HTTP requests and validate data
3. **Storage Layer**: Abstracted interface allows switching between storage implementations
4. **Database**: PostgreSQL stores persistent data with Drizzle ORM managing queries
5. **Response**: Structured JSON responses with error handling

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Component Library**: Radix UI primitives with shadcn/ui styling
- **State Management**: TanStack Query for server state caching
- **Form Handling**: React Hook Form with Hookform Resolvers
- **Validation**: Zod for runtime type checking
- **Styling**: Tailwind CSS with PostCSS processing
- **Icons**: Lucide React for consistent iconography

### Backend Dependencies
- **Runtime**: Node.js with TypeScript compilation
- **Framework**: Express.js for HTTP server functionality
- **Database**: PostgreSQL with Neon serverless driver
- **ORM**: Drizzle ORM for type-safe database operations
- **Session Management**: connect-pg-simple for PostgreSQL session storage
- **Development**: tsx for TypeScript execution and hot reloading

### Development Tools
- **TypeScript**: Strict type checking across the entire codebase
- **Build System**: Vite for frontend, esbuild for backend bundling
- **Database Migrations**: Drizzle Kit for schema management
- **Code Quality**: ESLint-compatible setup through component library

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite compiles React application to static assets
2. **Backend Build**: esbuild bundles Express server for production
3. **Database Setup**: Drizzle migrations ensure schema consistency
4. **Asset Optimization**: Vite handles code splitting and asset optimization

### Production Configuration
- **Environment Variables**: DATABASE_URL for PostgreSQL connection
- **Static Serving**: Express serves built frontend assets in production
- **Database Connection**: Neon serverless PostgreSQL for scalability
- **Session Storage**: PostgreSQL-backed sessions for user state persistence

### Scalability Considerations
- **Database**: PostgreSQL with connection pooling via Neon
- **Frontend**: Static assets can be served via CDN
- **Backend**: Stateless Express server enables horizontal scaling
- **Caching**: TanStack Query provides client-side caching

## Changelog

```
Changelog:
- June 30, 2025. Initial setup
- June 30, 2025. Expanded backend with comprehensive CMS functionality:
  * Added PostgreSQL database with full schema
  * Created database tables for projects, blog posts, experiences, skills
  * Implemented complete CRUD operations for all content types
  * Added RESTful API endpoints for content management
  * Updated technical expertise section with databases category
  * Applied user-requested skill level adjustments (Java: 95%, Python: 85%)
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```