# Operoo - Staff & Guest Management Platform

## Original Problem Statement
Build a full web application for Operoo — a Staff and Guest Management Platform for hospitality.

## Architecture
- **Frontend**: React 19 + Tailwind CSS + Shadcn/UI + react-i18next
- **Backend**: FastAPI + Motor (MongoDB) + PyJWT + bcrypt
- **Auth**: JWT httpOnly cookies + Emergent Google OAuth

## Implemented Phases

### Phase 1 — Auth & Foundation
- [x] JWT login/register + Google OAuth, admin seeding, brute force, i18n

### Phase 2 — Admin Dashboard & Staff Management
- [x] Admin dashboard: stats, actions, activity, staff overview (MOCK)
- [x] Staff table: search, filters, add/edit/delete (MOCK)

### Phase 3 — Staff Role UI
- [x] Role-based sidebar (Admin / Staff), Staff Dashboard, Tasks, Calendar, Profile (MOCK)

### Phase 4 — Guest Chat Flow
- [x] QR → room/table entry → Front Desk chat (MOCK)

### Phase 5 — Auth Flow & Team Management
- [x] Registration = admin, Team page for inviting users (MOCK)

### Phase 6 — Premium Homepage
- [x] 6-section landing page with product previews, features, CTAs

### Phase 7 — Front Desk Chat (Admin) (Apr 15, 2026)
- [x] Split-screen: conversation list (left) + active chat (right)
- [x] 5 mock conversations (rooms + tables), unread badges, waiting status
- [x] Guest messages left, Front Desk messages right (green)
- [x] Send replies, clear unread on click
- [x] Mobile responsive: list ↔ chat toggle with back button
- [x] Admin-only access via sidebar

## Testing: All phases 100%
- Phases 1-7: 15+18+21+17+23+15+15 = 124 total tests passed

## Backlog

### P0 — Backend Integration
- [ ] Staff CRUD, Tasks, Clock-in/out, Guest chat (WebSocket), Team invite, Dashboard stats

### P1
- [ ] Appointments, Clients, QR code generation

### P2
- [ ] Marketing, Shop/Orders, Reports, UI polish
