# 🎨 Code Crafters

> "Connect. Learn. Build. Together."

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![JSON Server](https://img.shields.io/badge/JSON_Server-1.0-FF6B6B)
![React Router](https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter&logoColor=white)

---

## 📖 About

**Code Crafters** is a tech events social network built for developers to discover, connect, and learn. Organizers can create and manage events, while spectators can browse, filter, and register for events that match their interests. Built as the final project for the FemCoders Barcelona bootcamp.

---

## ✨ Features

### Spectator
- 🔍 **Browse & Filter Events** — Search by title, filter by category, modality, technology, and date
- 📋 **Event Detail** — Full event info with agenda, location, and views counter
- 🙋 **Register for Events** — One-click registration with confirmation
- ❌ **Cancel Registration** — Withdraw from events you no longer wish to attend
- 📂 **My Registrations** — Track all your registered events in one place
- 🔔 **Notifications** — Bell icon with unread count, mark as read, mark all as read

### Organizer
- ➕ **Create Events** — Define title, description, date, modality, location, category, technology, and agenda
- ✏️ **Edit Events** — Update event information anytime
- 🗑️ **Delete Events** — Remove events you no longer need
- 📊 **Event Stats** — Monitor views, registrations, and attendance
- ✅ **Mark Attendance** — Mark participants as attended or undo
- 🔐 **Ownership Protection** — Only edit your own events

### General
- 🔐 **Role-Based Access** — Organizer and spectator roles with route protection
- 📱 **Responsive Design** — Works on mobile, tablet, and desktop
- ⚡ **Loading States** — Visual feedback during API calls

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19 | UI framework |
| Vite | 8 | Dev server & build tool |
| Tailwind CSS | 4 | Styling |
| JSON Server | 1.0 | Mock REST API backend |
| Axios | 1.19 | HTTP client |
| React Router | 7 | Client-side routing |

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

```bash
git clone <repo-url>
cd code-crafters
npm install
```

### Run the App

```bash
npm run dev:all
```

Open **http://localhost:5173** in your browser.

---

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run server` | Start JSON Server on port 3000 |
| `npm run dev:all` | Run both servers concurrently |
| `npm run build` | Build for production |
| `npm run lint` | Run Oxlint |

---

## 👤 Seed Data

| Name | Email | Password | Role |
|------|-------|----------|------|
| Rukayatu Seidu | rukayatu@femcoders.com | 1234 | Organizer |
| Abdul Hamid Umar | abdul@femcoders.com | 1234 | Organizer |
| Zulieha Tahiru | zulieha@example.com | 1234 | Spectator |
| Ramatu Abdul Rahman | ramatu@example.com | 1234 | Spectator |

---

## 📁 Project Structure

```
src/
├── api/            — API functions (login, register, CRUD, views, attendance)
├── components/     — Reusable UI components
│   ├── Navbar
│   ├── Hero
│   ├── FeaturedPrograms
│   ├── CommunityProof
│   ├── Footer
│   ├── EventCard
│   ├── FilterBar
│   ├── EventForm
│   ├── NotificationBell
│   ├── StatsCard
│   └── ProtectedRoute
├── config/         — Route definitions
├── context/        — Auth state (AuthContext)
├── pages/          — Page components
│   ├── Landing
│   ├── Events
│   ├── EventDetail
│   ├── Login
│   ├── Register
│   ├── CreateEvent
│   ├── EditEvent
│   ├── MyEvents
│   ├── EventStats
│   └── MyRegistrations
├── App.jsx         — Layout shell
├── main.jsx        — Entry point
└── index.css       — Tailwind theme
```

---

## 👩‍💻 Developer

**Rukayatu Seidu** — Frontend Developer

Built as the final project for the FemCoders Barcelona Bootcamp.

---

## 🙏 Acknowledgements

This project was built as part of the FemCoders Barcelona bootcamp. A heartfelt thank you to instructor **María Alexandra Galarza** for her guidance and teaching, and coordinator **Lola Martínez** for her support and leadership throughout this journey. This experience has been truly transformative.
