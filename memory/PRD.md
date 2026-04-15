# Operoo - Staff & Guest Management Platform

## Architecture
- **Frontend**: React 19 + Tailwind CSS + Shadcn/UI + react-i18next + qrcode.react
- **Backend**: FastAPI + Motor (MongoDB) + PyJWT + bcrypt
- **Auth**: JWT httpOnly cookies + Emergent Google OAuth

## Implemented Phases

### Phase 1 — Auth & Foundation
### Phase 2 — Admin Dashboard & Staff Management (MOCK)
### Phase 3 — Staff Role UI (MOCK)
### Phase 4 — Guest Chat Flow (MOCK)
### Phase 5 — Auth Flow & Team Management (MOCK)
### Phase 6 — Premium Homepage
### Phase 7 — Front Desk Chat Admin (MOCK)
### Phase 8 — QR Code System (Apr 15, 2026) (MOCK)
- [x] QR Codes page with summary cards (Rooms/Tables counts)
- [x] 5 mock QR codes for rooms + tables
- [x] Generate QR dialog: type (Room/Table) + number → unique token
- [x] Each QR: mini preview, label, type badge, link, copy/delete
- [x] Large preview panel with full QR and copyable guest link
- [x] QR links to /guest/:token → room entry → Front Desk chat
- [x] Admin sidebar nav item

## Testing: All phases 100% — 138 total tests passed

## Backlog
### P0 — Backend Integration
- [ ] Staff CRUD, Tasks, Clock-in/out, Guest chat, Team invite, QR persistence, Dashboard stats
### P1
- [ ] Appointments, Clients
### P2
- [ ] Marketing, Shop/Orders, Reports, UI polish
