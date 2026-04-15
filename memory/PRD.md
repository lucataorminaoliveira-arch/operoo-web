# Operoo - Staff & Guest Management Platform

## Original Problem Statement
Build a full web application for Operoo — a Staff and Guest Management Platform for hospitality. Features include authentication, role-based dashboards, staff management, guest QR chat, team management, and a premium homepage.

## Core Requirements
- Responsive layout (desktop/tablet/mobile)
- Multi-language (English & Italian)
- Green color scheme (#7CB342), Manrope font
- Guest QR → room number → chat with reception (no login)
- JWT email/password auth + Emergent Google OAuth
- Roles: admin, manager, staff, guest (QR only)
- Homepage registration = admin role
- Only admin invites/creates users

## Architecture
- **Frontend**: React 19 + Tailwind CSS + Shadcn/UI + react-i18next
- **Backend**: FastAPI + Motor (MongoDB) + PyJWT + bcrypt
- **Database**: MongoDB (test_database)
- **Auth**: JWT httpOnly cookies + Emergent Google OAuth

## Implemented Phases

### Phase 1 — Auth & Foundation
- [x] JWT login/register + Google OAuth, admin seeding, brute force, i18n

### Phase 2 — Admin Dashboard & Staff Management
- [x] Admin dashboard: stats, actions, activity, staff overview (MOCK)
- [x] Staff table: search, filters, add/edit/delete (MOCK)

### Phase 3 — Staff Role UI
- [x] Role-based sidebar (Admin 7 items / Staff 4 items)
- [x] Staff Dashboard: shift, clock-in/out, tasks, events (MOCK)
- [x] Tasks, Calendar, Profile pages (MOCK)

### Phase 4 — Guest Chat Flow
- [x] QR → room number → chat with Reception (MOCK)

### Phase 5 — Auth Flow & Team Management
- [x] Registration = admin role, Team page for inviting users (MOCK)

### Phase 6 — Premium Homepage (Apr 15, 2026)
- [x] Hero section: headline, subheadline, 2 CTAs, hotel image
- [x] Product Preview: 3 UI mockups (Admin, Staff, Guest Chat)
- [x] How It Works: 3 steps
- [x] Features: 6 cards (Staff, QR, Chat, Schedules, Multi-device, RBAC)
- [x] Responsive section with device frames
- [x] Final CTA: "Create Admin Account"
- [x] Footer with brand
- [x] Logged-in users redirect to /dashboard

## Testing: All phases 100% pass rate
- Phase 1-6: All passed (15+18+21+17+23+15 tests)

## Backlog

### P0 — Backend Integration
- [ ] Staff CRUD API, Tasks API, Clock-in/out, Guest chat backend, Team invite backend, Live dashboard stats

### P1 — Features
- [ ] Appointments system, Clients database, QR code generation

### P2 — Future
- [ ] Marketing, Shop/Orders, Reports, UI polish
