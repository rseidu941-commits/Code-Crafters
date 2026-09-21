# Code Crafters

> "Connect. Learn. Build. Together."

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![JSON Server](https://img.shields.io/badge/JSON_Server-1.0-FF6B6B)
![React Router](https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter&logoColor=white)

---

## About

**Code Crafters** is a tech events social network built for developers to discover, connect, and learn. Organizers can create and manage events, while spectators can browse, filter, and register for events that match their interests. Built as the final project for the FemCoders Barcelona bootcamp.

---

## Features

### Spectator
- **Browse & Filter Events** — Search by title, filter by category, modality, technology, and date
- **Event Detail** — Full event info with agenda, location, and views counter
- **Register for Events** — One-click registration with confirmation
- **Cancel Registration** — Withdraw from events you no longer wish to attend
- **My Registrations** — Track all your registered events in one place
- **Notifications** — Bell icon with unread count, mark as read, mark all as read

### Organizer
- **Create Events** — Define title, description, date, modality, location, category, technology, and agenda
- **Edit Events** — Update event information anytime
- **Delete Events** — Remove events you no longer need
- **Event Stats** — Monitor views, registrations, and attendance
- **Mark Attendance** — Mark participants as attended or undo
- **Ownership Protection** — Only edit your own events

### General
- **Role-Based Access** — Organizer and spectator roles with route protection
- **Responsive Design** — Works on mobile, tablet, and desktop
- **Sticky Footer** — Footer always stays at the bottom of the viewport
- **Conditional Hero** — Call-to-action buttons hide when user is logged in
- **Loading States** — Visual feedback during API calls
- **404 Page** — Not found page for undefined routes

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19 | UI framework |
| Vite | 8 | Dev server and build tool |
| Tailwind CSS | 4 | Styling with CSS-first configuration |
| JSON Server | 1.0 | Mock REST API backend |
| Axios | 1.19 | HTTP client |
| React Router | 7 | Client-side routing |
| Concurrently | 10 | Run multiple servers in parallel |

---

## Getting Started

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

This starts both servers and shows labeled output in the terminal:

```
[API] JSON Server started on PORT :3000
[WEB] VITE v8.2.2 ready in 736 ms
[WEB] Local: http://localhost:5173/
```

Open **http://localhost:5173** in your browser.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server only |
| `npm run server` | Start JSON Server on port 3000 only |
| `npm run dev:all` | Run both servers concurrently with labels |
| `npm run build` | Build for production |
| `npm run lint` | Run Oxlint |
| `npm run preview` | Preview production build |

---

## Seed Data

| Name | Email | Password | Role |
|------|-------|----------|------|
| Rukayatu Seidu | rukayatu@femcoders.com | 1234 | Organizer |

Additional users can be registered through the app during the demo.

---

## Database (db.json)

The app uses JSON Server with a flat JSON file as the database:

| Collection | Purpose |
|------------|---------|
| `users` | Registered user accounts |
| `events` | Pre-populated tech events (6 seed events) |
| `registrations` | User-to-event registrations |
| `notifications` | Registration notifications for users |

To check the database directly, open these URLs in your browser while the server is running:

- http://localhost:3000/users
- http://localhost:3000/events
- http://localhost:3000/registrations
- http://localhost:3000/notifications

---

## Project Structure

```
src/
├── api/               — API functions (login, register, CRUD, views, attendance)
├── components/        — Reusable UI components
│   ├── CommunityProof
│   ├── EventCard
│   ├── EventForm
│   ├── FeaturedPrograms
│   ├── FilterBar
│   ├── Footer
│   ├── Hero
│   ├── Navbar
│   ├── NotificationBell
│   └── StatsCard
├── config/            — Route definitions and protected routes
│   ├── routes.jsx
│   └── ProtectedRoute.jsx
├── context/           — Auth state (AuthContext)
├── pages/             — Page components
│   ├── Landing
│   ├── Events
│   ├── EventDetail
│   ├── Login
│   ├── Register
│   ├── CreateEvent
│   ├── EditEvent
│   ├── MyEvents
│   ├── EventStats
│   ├── MyRegistrations
│   └── NotFound
├── App.jsx            — Layout shell (flex column with sticky footer)
├── main.jsx           — Entry point
└── index.css          — Tailwind theme (custom colors and fonts)
```


## Developer

**Rukayatu Seidu** — Frontend Developer

Built as the final project for the FemCoders Barcelona Bootcamp.

---

## Acknowledgements

This project was built as part of the FemCoders Barcelona bootcamp. A heartfelt thank you to instructor **Maria Alexandra Galarza** for her guidance and teaching, and coordinator **Lola Martinez** for her support and leadership throughout this journey. This experience has been truly transformative.
