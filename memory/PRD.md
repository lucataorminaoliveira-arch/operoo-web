# Operoo - Staff & Guest Management Platform

## Original Problem Statement
Build a full web application for Operoo — a Staff and Guest Management Platform for hospitality (hotels/resorts). Features include authentication (email/password + Google login), dashboard, staff management, appointments, clients, marketing, and shop/orders.

## Core Requirements
- Responsive layout (desktop/tablet/mobile)
- Multi-language support (English & Italian)
- Green color scheme (#7CB342) with Manrope font
- Guest QR code flow: direct access to guest section without login
- JWT email/password auth + Emergent Google OAuth

## Architecture
- **Frontend**: React 19 + Tailwind CSS + Shadcn/UI + react-i18next
- **Backend**: FastAPI + Motor (MongoDB async) + PyJWT + bcrypt
- **Database**: MongoDB (test_database)
- **Auth**: JWT httpOnly cookies + Emergent Google OAuth

## What's Been Implemented

### Phase 1 — Authentication & Foundation (Apr 15, 2026)
- [x] JWT email/password login & registration
- [x] Emergent Google OAuth integration
- [x] Access token + Refresh token via httpOnly cookies
- [x] Admin seeding on startup
- [x] Brute force protection
- [x] Protected routes + public routes with redirects
- [x] i18n setup (English & Italian)
- [x] Guest route `/guest/:token` without auth

### Phase 2 — Dashboard & Staff UI (Apr 15, 2026)
- [x] Enhanced dashboard: stats cards, quick actions, recent activity feed, staff overview
- [x] Full Staff Management UI: table with search, department/status filters
- [x] Staff CRUD: add, edit, delete via dialogs (frontend-only, MOCK data)
- [x] Responsive: desktop table, mobile card layout, collapsible sidebar
- [x] Placeholder pages for Appointments, Clients, Marketing, Shop

## Testing Status
- Phase 1: 100% backend (15/15) + frontend — PASSED
- Phase 2: 100% frontend (18/18) — PASSED

## Current State
- **Staff CRUD is MOCK** — uses React state with mock data, no backend API
- **Dashboard stats are MOCK** — hardcoded values, not from MongoDB
- User requested: validate frontend first, then connect backend step by step

## Prioritized Backlog

### P0 — Next (Backend integration)
- [ ] Staff Management backend API (CRUD endpoints)
- [ ] Connect Staff UI to backend APIs
- [ ] Connect dashboard stats to real MongoDB data

### P1
- [ ] Appointments system (backend + frontend)
- [ ] Clients database (backend + frontend)
- [ ] QR code generation for guest access
- [ ] Guest flow backend (validate tokens, load guest data)

### P2
- [ ] Marketing campaigns/promotions
- [ ] Shop/product catalog & order management
- [ ] Reports & analytics
- [ ] UI polish (animations, micro-interactions)
