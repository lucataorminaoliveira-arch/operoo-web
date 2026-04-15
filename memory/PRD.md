# Operoo - Staff & Guest Management Platform

## Original Problem Statement
Build a full web application for Operoo — a Staff and Guest Management Platform for hospitality. Features include authentication, role-based dashboards, staff management, guest QR chat, appointments, clients, marketing, and shop/orders.

## Core Requirements
- Responsive layout (desktop/tablet/mobile)
- Multi-language (English & Italian)
- Green color scheme (#7CB342), Manrope font
- Guest QR → room number → chat with reception (no login)
- JWT email/password auth + Emergent Google OAuth
- Role-based UI: Admin vs Staff views
- Roles: admin, manager, staff, guest (QR only)
- Homepage registration = admin role
- Only admin can invite/create users

## Architecture
- **Frontend**: React 19 + Tailwind CSS + Shadcn/UI + react-i18next
- **Backend**: FastAPI + Motor (MongoDB) + PyJWT + bcrypt
- **Database**: MongoDB (test_database)
- **Auth**: JWT httpOnly cookies + Emergent Google OAuth

## Implemented Phases

### Phase 1 — Auth & Foundation (Apr 15)
- [x] JWT login/register + Google OAuth
- [x] Admin seeding, brute force, protected routes, i18n

### Phase 2 — Admin Dashboard & Staff Management (Apr 15)
- [x] Admin dashboard: stats, actions, activity, staff overview
- [x] Staff table: search, filters, add/edit/delete (MOCK)

### Phase 3 — Staff Role UI (Apr 15)
- [x] Role-based sidebar (Admin 7 items / Staff 4 items)
- [x] Staff Dashboard: shift, clock-in/out, tasks, events
- [x] Tasks, Calendar, Profile pages (MOCK)

### Phase 4 — Guest Chat Flow (Apr 15)
- [x] QR → room number → chat with Reception
- [x] Mobile-first chat UI, auto-reply (MOCK)

### Phase 5 — Auth Flow & Team Management (Apr 15)
- [x] Registration assigns "admin" role automatically
- [x] Team page: admin invites/creates users with role selection (MOCK)
- [x] Role summary cards (Admin/Manager/Staff counts)
- [x] Staff blocked from Team page

## Testing: All phases 100% pass rate
- Phase 1: 15/15 backend + frontend
- Phase 2: 18/18 frontend
- Phase 3: 21/21 frontend
- Phase 4: 17/17 frontend
- Phase 5: 13/13 backend + 10/10 frontend

## Backlog

### P0 — Backend Integration
- [ ] Staff CRUD API + connect UI
- [ ] Tasks API + connect
- [ ] Clock-in/out persistence
- [ ] Guest chat backend (WebSocket/polling)
- [ ] Team invite backend (create users with roles)
- [ ] Dashboard stats from real data

### P1 — Features
- [ ] Appointments system
- [ ] Clients database
- [ ] QR code generation (admin)

### P2 — Future
- [ ] Marketing, Shop/Orders, Reports, UI polish
