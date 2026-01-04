# 🏋️‍♀️ Gym Management System (Frontend MVP)

A frontend-first **Gym Management System** built with **React, TypeScript, and Tailwind CSS**, designed to handle real-world gym operations such as member management, membership tracking, renewals, payments, role-based access, and reporting.

This project was built as a **production-minded MVP**, focusing on clean architecture, scalability, and business logic rather than just UI.

---

## 🚀 Live Demo
> _(Add link here once deployed – Vercel / Netlify)_

---

## 📌 Project Overview

The Gym Management System helps gym owners and staff:

- Track members and their memberships
- Automatically calculate membership expiry
- Identify expiring and expired memberships
- Renew memberships and record payments
- View operational insights via a dashboard
- Export reports for offline use
- Control access based on user roles (Admin vs Staff)

---

## 🎯 Core Features

### 👥 Member Management
- Add and view members
- View individual member profiles
- Track phone numbers, plans, join dates, and expiry dates

### 📅 Membership Plans
Supported plans:
- Monthly
- Quarterly
- Semi-Annual
- Annual

Each plan defines its duration and is used to automatically calculate expiry dates.

---

### ⏳ Expiry & Status Intelligence
Membership status is **derived automatically**:

- **Active** → Membership valid
- **Expiring Soon**
  - 7 days remaining (warning)
  - 3 days remaining (urgent)
- **Expired** → Membership lapsed

This logic powers:
- Status badges
- Filters
- Dashboard alerts
- Renewal prioritization

---

### 💳 Renewals & Payments
- One-click membership renewal
- Automatically extends expiry date
- Records payment history (amount, plan, date)

> Payments are frontend-managed but structured for easy backend integration.

---

### 📊 Dashboard
Real-time operational metrics:
- Total members
- Active members
- Expired members
- Members expiring soon (7 days)
- Urgent renewals (3 days)

---

### 🔍 Filters & Daily Operations
Members can be filtered by:
- All
- Active
- Expired
- Expiring soon

Designed to support **fast front-desk workflows**.

---

### 📤 CSV Export
Export filtered member lists to CSV including:
- Name
- Phone
- Plan
- Status
- Expiry date
- Days remaining

Compatible with Excel and Google Sheets.

---

### 🔐 Role-Based Access Control
Two roles are supported:

#### Admin
- Full access
- Payments page
- CSV exports

#### Staff
- Member management
- Renewals only
- No access to payments or exports

Access is enforced at:
- Sidebar navigation
- Route level

---

## 🧱 Tech Stack

- **React** (Hooks-based architecture)
- **TypeScript** (strict typing & safety)
- **Tailwind CSS** (UI styling)
- **React Router** (routing & route protection)
- **Context API** (global state management)
- **Vite** (development & build tool)

---

## 🗂️ Architecture Overview

### Context-Based State Management

- **MembersContext**
  - Members data
  - Membership expiry logic
  - Renewals
  - Payment records
  - Derived statuses

- **AuthContext**
  - Role-based access (Admin / Staff)
  - UI & route protection

This approach avoids prop drilling and keeps business logic centralized and scalable.

---

## 📦 Project Status

✅ Functional MVP  
✅ Production-ready frontend architecture  
✅ Portfolio-ready  
✅ Backend-ready data structures  

---

## 🔮 Future Improvements

- Backend integration (Firebase / REST API)
- Authentication (email/password, backend roles)
- M-Pesa / Stripe payments
- PDF report export
- Email / in-app notifications for expiring memberships
- Audit logs
- Multi-branch gym support

---

## 🛠️ Getting Started

### Install dependencies
```bash
npm install
