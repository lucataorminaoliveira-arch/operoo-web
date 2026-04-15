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

## What's Been Implemented (Phase 1) — Apr 15, 2026

### Authentication
- [x] JWT email/password login & registration
- [x] Emergent Google OAuth integration
- [x] Access token (15min) + Refresh token (7day) via httpOnly cookies
- [x] Admin seeding on startup
- [x] Brute force protection (5 attempts = 15min lockout)
- [x] Auth callback for Google OAuth
- [x] Protected routes + public routes with redirects

### Dashboard
- [x] Stats cards (Total Staff, Active Guests, Today's Appointments, Revenue)
- [x] Quick actions (Add Staff, New Appointment, View Reports)
- [x] Recent activity section

### Navigation & Layout
- [x] Collapsible sidebar with 6 nav items
- [x] Top bar with language switcher (EN/IT) + user avatar
- [x] Mobile responsive with overlay sidebar
- [x] All nav placeholder pages (Staff, Appointments, Clients, Marketing, Shop)

### i18n
- [x] English and Italian translations
- [x] Language persisted in localStorage

### Guest Flow
- [x] /guest/:token route accessible without auth
- [x] Guest page with services, appointments, info, profile cards

## Testing Status
- Phase 1: 100% backend (15/15) + 100% frontend — PASSED

## Prioritized Backlog

### P0
- [ ] Staff Management CRUD (list, add, edit, delete staff members)
- [ ] Dynamic dashboard stats from real data

### P1
- [ ] Appointments system (create, view, manage bookings)
- [ ] Clients database with profiles
- [ ] QR code generation for guest access
- [ ] Guest flow backend (validate tokens, load guest data)

### P2
- [ ] Marketing campaigns/promotions
- [ ] Shop/product catalog & order management
- [ ] Reports & analytics
- [ ] UI polish (animations, micro-interactions)
