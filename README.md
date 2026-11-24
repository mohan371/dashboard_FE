# CloudGuard Security Dashboard

A professional, enterprise-grade Cloud Native Application Protection Platform (CNAPP) dashboard application built with **React**, **Vite**, **Tailwind CSS**, **Zustand**, and **Lucide React**.

Built strictly according to the **Frontend Trainee Assignment** specifications with dynamically configurable widgets, categories, and client-side persistence.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Project Architecture & Structure](#project-architecture--structure)
- [Installation Instructions](#installation-instructions)
- [How to Run Locally](#how-to-run-locally)
- [Build & Deployment Instructions](#build--deployment-instructions)
- [Assignment Criteria Verification](#assignment-criteria-verification)

---

## 🛡️ Project Overview

CloudGuard is a cloud security operations dashboard designed to monitor and configure posture telemetry across multiple cloud categories:
- **CSPM Executive Dashboard** (Cloud Security Posture Management)
- **CWPP Dashboard** (Cloud Workload Protection Platform)
- **Registry Scan** (Container Registry Vulnerability Scanning)

The dashboard allows security engineers to customize their workspace dynamically: adding, removing, and creating custom widgets with instant search filtering and automatic state persistence.

---

## ✨ Key Features

1. **JSON Configuration-Driven Architecture**:
   - The entire dashboard hierarchy (categories, widgets, telemetry metrics, and visual card types) is loaded dynamically from a structured JSON dataset (`src/data/initialDashboardData.js`).

2. **Zustand State Engine & LocalStorage Persistence**:
   - Global reactive state powered by Zustand with `persist` middleware.
   - Any customizations (added widgets, deselected widgets, custom-created metrics, removals) automatically persist to `localStorage` under `cloud_security_dashboard_v1`.
   - Includes a **Factory Reset** control to return the dashboard to its initial JSON state at any time.

3. **Slide-Out Add Widget Modal / Drawer**:
   - **Category Tabs**: Switch between CSPM, CWPP, and Registry Scan tabs with real-time active widget counters.
   - **Checkbox Selection List**: Accessible, keyboard-navigable checkbox list allowing users to select and deselect available widgets.
   - **Custom Widget Creator**: Form allowing users to define custom metric names and descriptions with immediate integration.
   - **Duplicate Prevention**: Enforces name uniqueness within categories (case-insensitive) and surfaces clear alert warnings.

4. **Dynamic Visual Widget Rendering**:
   - **Donut Chart Widgets**: Pure SVG circular donut graphs displaying total metrics and color-coded status breakdowns (e.g., Connected vs. Not Connected accounts, Passed vs. Failed risk controls).
   - **Stacked Progress Bars**: Multi-segment horizontal progress bars breaking down severity levels (Critical, High, Medium, Low).
   - **Empty / Placeholder Graphs**: Illustrated visual fallbacks for categories or workloads without active graph data.
   - **Custom Metric Cards**: Structured metric cards with policy tags, indicators, and status badges.

5. **Global Search**:
   - Instant search across all categories, widget titles, and metric descriptions directly from the top navigation bar with a clear query button and matching counter banner.

6. **Responsive Layout & SaaS Styling**:
   - Modern enterprise appearance with subtle blue-grey background (`#f0f3f7`), clean white cards, soft shadows, rounded corners, and consistent vertical alignment.
   - Responsive layout adapting from 1 column on mobile to 2 columns on tablet and 3 columns on desktop (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`).

7. **Empty States**:
   - Contextual empty states rendered when all widgets in a category are removed, offering a direct "+ Add Widget" action.
   - Informative fallback card when global search finds zero matching widgets.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | React 19 | UI component architecture and reactivity |
| **Language** | JavaScript (ESModules) | Application logic and configuration |
| **Build Tool** | Vite 8 | Development server and production bundling |
| **Styling** | Tailwind CSS 3.4 | Utility-first responsive design and custom theme |
| **State Management** | Zustand 5 | Centralized reactive store with middleware |
| **Icons** | Lucide React | High-clarity enterprise SVG icons |
| **Storage** | LocalStorage API | Client-side persistence across page reloads |

---

## 📁 Project Structure

```
dashboard/
├── public/                     # Static assets
├── scripts/
│   ├── qa-audit-test.js        # Automated QA verification test suite
│   └── test-store.js           # Automated store logic tests
├── src/
│   ├── components/
│   │   ├── common/             # Reusable UI components
│   │   ├── layout/
│   │   │   ├── Navbar.jsx      # Top navigation, global search, user profile
│   │   │   └── Header.jsx      # Dashboard title, primary action bar, time range
│   │   ├── dashboard/
│   │   │   ├── CategorySection.jsx    # Responsive 3-column grid container
│   │   │   ├── WidgetCard.jsx         # Card container with remove 'X' button
│   │   │   ├── AddWidgetCard.jsx      # Dashed '+ Add Widget' grid card
│   │   │   └── EmptyCategoryState.jsx # Empty state when 0 widgets are active
│   │   ├── widgets/
│   │   │   ├── DonutChartWidget.jsx   # SVG circular donut with center total
│   │   │   ├── ProgressBarWidget.jsx  # Multi-tier horizontal progress bar
│   │   │   ├── EmptyChartWidget.jsx   # Visual placeholder for missing graphs
│   │   │   └── CustomWidgetContent.jsx# Display for custom user metrics
│   │   └── modal/
│   │       ├── AddWidgetModal.jsx     # Slide-out modal drawer container
│   │       ├── CategoryTabs.jsx       # Category tab switcher with counters
│   │       ├── WidgetCheckboxList.jsx # Accessible checkbox selection list
│   │       └── CustomWidgetForm.jsx   # Form with validation & duplicate check
│   ├── data/
│   │   └── initialDashboardData.js    # JSON configuration & available catalog
│   ├── store/
│   │   └── useDashboardStore.js       # Zustand store + LocalStorage persistence
│   ├── App.jsx                        # Main application layout and coordinator
│   ├── main.jsx                       # React DOM root entry point
│   └── index.css                      # Tailwind base, utilities, and custom scrollbar
├── .gitignore                         # Excluded directories (node_modules, dist, .env)
├── index.html                         # HTML entry template
├── package.json                       # Project metadata and dependencies
├── package-lock.json                  # Exact locked dependency tree
├── postcss.config.js                  # PostCSS configuration for Tailwind
├── tailwind.config.js                 # Tailwind color palette and shadow tokens
└── vite.config.js                     # Vite bundler configuration
```

---

## 📦 Installation Instructions

### Prerequisites
- **Node.js**: v18.0.0 or higher (v22+ recommended)
- **npm**: v9.0.0 or higher

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/mohan371/dashboard_FE.git
   cd dashboard_FE
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

---

## 🚀 How to Run Locally

Start the Vite local development server:
```bash
npm run dev
```

The application will be accessible at:
```
http://localhost:5173
```

---

## 🔨 Build & Deployment Instructions

### Build for Production
To create an optimized production build:
```bash
npm run build
```
Production assets are generated in the `dist/` directory.

### Preview Production Build
To preview the production build locally:
```bash
npm run preview
```

### Run Automated QA Tests
To execute the automated logic and compliance test suite:
```bash
node scripts/qa-audit-test.js
```

---

## 🎯 Assignment Criteria Verification

| Requirement | Implementation Details | Status |
|---|---|:---:|
| 1. Dashboard using JSON configuration | Defined in `src/data/initialDashboardData.js` | ✅ Met |
| 2. Multiple widgets per category | Each category contains 2 initial widgets and up to 4 available | ✅ Met |
| 3. Dynamic category & widget rendering | Fully dynamic loops in `App.jsx` and `CategorySection.jsx` | ✅ Met |
| 4. Add widgets to any category | Enabled via Add Widget modal and category dashed cards | ✅ Met |
| 5. Remove widget using cross (X) icon | Close button on every `WidgetCard` with hover animations | ✅ Met |
| 6. Add Widget modal with category tabs | Slide-out drawer with tab navigation in `AddWidgetModal.jsx` | ✅ Met |
| 7. Checkbox select / deselect widgets | Accessible checkbox list in `WidgetCheckboxList.jsx` | ✅ Met |
| 8. Custom widget name and text input | Interactive validation form in `CustomWidgetForm.jsx` | ✅ Met |
| 9. Global widget search | Instant search input in `Navbar.jsx` with match counters | ✅ Met |
| 10. Zustand state management | Centralized reactive store in `useDashboardStore.js` | ✅ Met |
| 11. LocalStorage persistence | Zustand `persist` middleware with automatic hydration | ✅ Met |
| 12. Prevent duplicate widgets | Case-insensitive validation in `addWidget` action | ✅ Met |
| 13. Empty states for categories | Rendered via `EmptyCategoryState.jsx` when 0 widgets are active | ✅ Met |
| 14. Modern SaaS 3-column layout | Tailwind responsive grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`) | ✅ Met |
