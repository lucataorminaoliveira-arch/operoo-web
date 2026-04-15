# Operoo - Staff & Guest Management Platform

## Original Problem Statement
Build a full web application for Operoo — a Staff and Guest Management Platform for hospitality. Features include authentication (email/password + Google login), role-based dashboards, staff management, appointments, clients, marketing, and shop/orders.

## Core Requirements
- Responsive layout (desktop/tablet/mobile)
- Multi-language support (English & Italian)
- Green color scheme (#7CB342) with Manrope font
- Guest QR code flow: direct access to guest section without login
- JWT email/password auth + Emergent Google OAuth
- Role-based UI: Admin vs Staff views

## Architecture
- **Frontend**: React 19 + Tailwind CSS + Shadcn/UI + react-i18next
- **Backend**: FastAPI + Motor (MongoDB async) + PyJWT + bcrypt
- **Database**: MongoDB (test_database)
- **Auth**: JWT httpOnly cookies + Emergent Google OAuth

## What's Been Implemented

### Phase 1 — Authentication & Foundation (Apr 15, 2026)
- [x] JWT email/password login & registration
- [x] Emergent Google OAuth integration
- [x] Admin seeding, brute force protection
- [x] Protected/public routes, i18n (EN/IT)
- [x] Guest route `/guest/:token`

### Phase 2 — Admin Dashboard & Staff Management UI (Apr 15, 2026)
- [x] Admin dashboard: stats cards, quick actions, activity feed, staff overview
- [x] Staff Management: table, search, filters, add/edit/delete dialogs (MOCK data)
- [x] Responsive: desktop table + mobile card layout

### Phase 3 — Staff Role UI (Apr 15, 2026)
- [x] Role-based sidebar: Admin (6 items) vs Staff (4 items)
- [x] Staff Dashboard: today's shift, clock-in/out button, task counts, today's tasks, upcoming events
- [x] Tasks & Activities: 8 mock tasks, tab filtering, Start/Mark Done status changes
- [x] Calendar: week view with shifts/appointments, list view toggle, week navigation
- [x] Profile: personal info, language selector, change password form
- [x] Route protection: staff cannot access admin routes (redirected to /dashboard)
- [x] All features use MOCK data (React state only)

## Testing Status
- Phase 1: 100% backend (15/15) + frontend — PASSED
- Phase 2: 100% frontend (18/18) — PASSED
- Phase 3: 100% frontend (21/21) — PASSED

## Current State
- Frontend-only with mock data — user requested to validate UI/UX before backend integration
- Clock-in/out, tasks, calendar, profile all use React state (not persisted)

## Prioritized Backlog

### P0 — Backend Integration
- [ ] Staff Management backend API (CRUD endpoints)
- [ ] Connect Staff UI to backend
- [ ] Connect dashboard stats to real MongoDB data
- [ ] Tasks backend API + connect
- [ ] Clock-in/out backend persistence

### P1 — New Features
- [ ] Appointments system (backend + frontend)
- [ ] Clients database (backend + frontend)
- [ ] QR code generation for guest access
- [ ] Guest flow backend (validate tokens, load data)

### P2 — Future
- [ ] Marketing campaigns/promotions
- [ ] Shop/product catalog & order management
- [ ] Reports & analytics
- [ ] UI polish (animations, micro-interactions)
