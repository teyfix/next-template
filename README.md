# Next.js App Router Starter Template

This is a **personal Next.js App Router starter template** for quickly
bootstrapping projects with commonly used tools and patterns. It's designed to
save setup time while maintaining flexibility for different project needs.

---

## Current Features

- **Database:** `Drizzle ORM` with `Neon` (Postgres) integration

- **Localization:** `next-intl` for multi-language support

- **Theming:** `next-themes` with light/dark mode

- **Server State:** `React Query` with default caching and refetching strategies

- **Dashboard Layout:** reusable sidebar, header, footer, and utility UI
  components

- **Code Quality:**
  - Biome for formatting and linting
  - Prettier for additional file extensions
  - Integrated with Lefthook during commits
  - Lefthook for Git hooks with pre-commit and commit-msg checks

  Example Lefthook configuration:

- **Icons/UI:** `shadcn` components using `Radix UI`, `Lucide` icons,
  `Tailwind CSS` utilities, and `react-icons`

All providers (intl, theme, React Query, Nuqs adapter) are organized under a
single `Providers` component for easy setup.

---

## Planned Additions

- **Authentication:** `Better Auth` integration
- **CSS-in-JS:** `@tw-classed/react` will be added soon

---

## Development & Deployment

- Supports **Docker-based development**
- Exposed via **Traefik** for easy reverse proxy configuration
- Includes a lightweight dev service for local testing

> [!TIP]  
> Checkout [teyfix/traefik](https://github.com/teyfix/traefik) for SSL-enabled
> local development

---

## Purpose

This repo is **my personal template** to quickly spin up Next.js projects with:

- Multi-language support
- Dashboard-ready UI
- Built-in theming and server state management
- Easy Docker + Traefik deployment
- Preconfigured code quality and commit workflow
