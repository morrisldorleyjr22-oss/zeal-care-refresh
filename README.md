# Zeal Care Liberia Website

This repository contains the public website and administration portal for Zeal Care Liberia, a nonprofit organization supporting education, empowerment, leadership, and community development.

The application gives visitors clear access to the organization's work, impact, media, and giving opportunities. Authorized administrators can manage website content, media, users, and global settings through a protected dashboard.

## Features

### Public Experience

- Organization overview, mission, leadership, and impact
- Program and empowerment information
- Ways to give and donation guidance
- News, media, and article pages
- Contact information and engagement pathways
- English, French, and Arabic language support
- Responsive layouts for desktop and mobile devices

### Administration

- Supabase-based administrator authentication
- Protected administration routes
- Dashboard for content operations
- Page-content management
- Media and article management
- Global website settings
- Administrator user management

## Technology Stack

| Layer | Technology |
| --- | --- |
| Frontend | React 18, TypeScript, Vite |
| Styling | Tailwind CSS, Radix UI |
| Routing | React Router |
| Data fetching | TanStack Query |
| Forms and validation | React Hook Form, Zod |
| Backend services | Supabase Database, Authentication, and Storage |
| Testing | Vitest, Testing Library |

## Prerequisites

- Node.js 20 LTS or newer
- npm
- A Supabase project
- Supabase CLI for migrations and backend management

## Local Setup

1. Clone the repository.

   ```bash
   git clone https://github.com/morrisldorleyjr22-oss/zeal-care-refresh.git
   cd zeal-care-refresh
   ```

2. Install dependencies.

   ```bash
   npm install
   ```

3. Create a local environment file with the required public Supabase values.

   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
   ```

4. Start the development server.

   ```bash
   npm run dev
   ```

Use the local address shown by Vite to open the application.

## Supabase Setup

Link the repository to the correct Supabase project before applying database changes.

```bash
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
```

The migration history is stored in `supabase/migrations`. Review every migration and confirm the target environment before applying production changes.

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run build:dev` | Create a development-mode build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint checks |
| `npm test` | Run the test suite once |
| `npm run test:watch` | Run tests in watch mode |

## Project Structure

```text
src/
  assets/              Website images and media
  components/          Shared interface components
  data/                Structured article content
  hooks/               Authentication, language, and content hooks
  integrations/        Supabase client and generated types
  lib/                 Content, localization, and utility modules
  pages/               Public and administration pages
  test/                Automated test setup
supabase/
  migrations/          Database schema and security migrations
public/                Public icons and static files
```

## Application Routes

Public routes cover the home page, organization profile, empowerment work, programs, ways to give, media, articles, and contact information. The `/admin` area contains protected routes for content, media, global settings, and user management.

The application uses hash-based routing, which supports static hosting without additional server rewrite rules.

## Quality Checks

Run these checks before submitting changes or deploying:

```bash
npm run lint
npm test
npm run build
```

Also verify authentication, protected routes, content updates, media operations, localization, and responsive layouts in the target environment.

## Security

- Never commit production secrets, service-role keys, or private credentials.
- Expose only the Supabase public client key to the frontend.
- Keep administrator authorization enforced by database policies and server-side checks.
- Maintain Row Level Security for protected tables and storage resources.
- Review administrator access regularly.
- Treat supporter, user, and contact information as sensitive data.

## Deployment

Run `npm run build` and deploy the generated `dist` directory to a compatible static hosting provider. Configure the Supabase environment variables in the hosting platform before building.

Validate authentication, administration access, content loading, media delivery, and public navigation after every production deployment.

## Maintainer

Developed and maintained by [Morris L. Dorley Jr.](https://morris.innova-lib.com) through [Innova Liberia](https://innova-lib.com).
