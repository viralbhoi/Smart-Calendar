# 📅 Smart React Calendar Dashboard

A beautifully designed, highly intelligent calendar application built with React. It features a custom, Apple-inspired date grid, a unified event architecture, and a responsive glassmorphism UI designed for maximum productivity.

## ✨ Key Features

- **Unified Event Engine:** Seamlessly handles both multi-day range events and single-day notes using a single, smart Zustand data structure.
- **Intelligent Visual Indicators:** Events are rendered as elegant, color-coded bars directly underneath the dates on the grid.
- **"One Modal" Design:** A single, context-aware floating pop-up handles event creation, day-agenda viewing, and event deletion.
- **Smart Analog Wall Clock:** A real-time, glassmorphic wall clock with a buttery-smooth sweeping second hand and classic counterweight design.
- **80/20 Dashboard Layout:** Desktop users get a beautifully split interface with the calendar on the left and a dedicated "Scheduled Events" sidebar on the right.
- **True Mobile Responsiveness:** On mobile screens, the app flawlessly shifts into a focused, single-column view with a sliding bottom-sheet Agenda drawer.
- **Persistent Storage:** All events and notes are automatically saved locally to your browser, surviving page refreshes instantly.

## 🛠️ Tech Stack

- **Frontend Framework:** React (Vite)
- **Styling:** Tailwind CSS (with arbitrary values and glassmorphism styling)
- **State Management:** Zustand (with `persist` middleware for Local Storage)
- **Animations:** Framer Motion (for physics-based 3D page flips and modal springs)
- **Date Manipulation:** `date-fns` (for calculating grid padding, leap years, and intervals)
- **Icons:** Lucide React

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js and npm (or pnpm/yarn) installed on your machine.

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/viralbhoi/smart-calendar.git
    ```
2. Navigate into the directory:

    ```bash
    cd smart-calendar
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

## 📱 How to Use

- Change Months: Use the floating chevron buttons at the bottom of the screen.
- Add a Multi-Day Event: Click a start date and drag to an end date. The smart modal will instantly pop up.
- Add a Single-Day Note: Double-click any individual day on the calendar grid.
- Delete an Event: Click any event in the right sidebar (or the mobile agenda drawer) to open its details, then click "Delete".
- Mobile Agenda: Tap the "List" icon at the bottom of the screen to slide up your monthly events.

## 🙏 Acknowledgments

- Designed and engineered with the assistance of Google Gemini.

## 📫 Connect with Me

- **LinkedIn:** [viralbhoi](https://www.linkedin.com/in/viralbhoi/)
- **YouTube:** [@viral_bhoi](https://www.youtube.com/@viral_bhoi)
- **LeetCode:** [viralbhoi](https://leetcode.com/u/viralbhoi/)
