# Operoo - Staff & Guest Management Platform

## Original Problem Statement
Build a full web application for Operoo — a Staff and Guest Management Platform for hospitality. Features include authentication, role-based dashboards, staff management, guest QR chat, appointments, clients, marketing, and shop/orders.

## Core Requirements
- Responsive layout (desktop/tablet/mobile)
- Multi-language (English & Italian)
- Green color scheme (#7CB342), Manrope font
- Guest QR code → direct chat with reception (no login)
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

### Phase 2 — Admin Dashboard & Staff Management UI (Apr 15, 2026)
- [x] Admin dashboard: stats, quick actions, activity feed, staff overview
- [x] Staff Management: table, search, filters, add/edit/delete (MOCK data)

### Phase 3 — Staff Role UI (Apr 15, 2026)
- [x] Role-based sidebar: Admin (6 items) vs Staff (4 items)
- [x] Staff Dashboard: shift info, clock-in/out, task counts, tasks, events
- [x] Tasks & Activities: tabs, Start/Mark Done status changes
- [x] Calendar: week/list views, shift/appointment display
- [x] Profile: personal info, language selector, change password
- [x] Route protection: staff blocked from admin routes

### Phase 4 — Guest Chat Flow (Apr 15, 2026)
- [x] QR code → `/guest/:token` loads directly (no login/homepage)
- [x] Room number entry screen (clean, mobile-first)
- [x] Chat with Reception: header with online status, room label
- [x] Send/receive messages, auto-reply mock
- [x] Back button returns to room entry
- [x] No extra sections — chat only

## Testing Status
- Phase 1: 100% (15/15 backend + frontend) — PASSED
- Phase 2: 100% (18/18 frontend) — PASSED
- Phase 3: 100% (21/21 frontend) — PASSED
- Phase 4: 100% (17/17 frontend) — PASSED

## Current State
- Frontend complete with mock data
- All CRUD, chat, clock-in/out use React state (not persisted)

## Prioritized Backlog

### P0 — Backend Integration
- [ ] Staff CRUD backend API + connect UI
- [ ] Tasks backend + connect
- [ ] Clock-in/out persistence
- [ ] Guest chat backend (WebSocket or polling)
- [ ] Dashboard stats from real data

### P1 — New Features
- [ ] Appointments system (backend + frontend)
- [ ] Clients database (backend + frontend)
- [ ] QR code generation (admin generates QR per property)

### P2 — Future
- [ ] Marketing campaigns
- [ ] Shop/orders
- [ ] Reports & analytics
- [ ] UI polish
