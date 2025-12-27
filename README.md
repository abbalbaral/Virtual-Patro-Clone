# Virtual Patro Clone

A pixel-perfect, feature-rich clone of [Virtual Patro](https://virtualpatro.com/), built to demonstrate scalable Frontend Architecture using **React**, **Redux**, and **Service Layer Patterns**.



*   **Architecture:** Implemented a **Service Layer (Adapter Pattern)** to decouple UI components from API logic.
*   **State Management:** Used **Redux Toolkit** to manage the Global Nepali Date state across the Calendar, Header, and Horoscope modules.
*   **Algorithms:** Wrote custom logic for the **Nepali Calendar Generation** (35-day grid logic) and **Strict Date Validation** (BS ↔ AD conversion).
*   **Performance:** Optimized rendering for the PDF Viewer using pagination (vs. scrolling) to prevent memory leaks.

## Tech Stack
*   **Core:** React.js (Vite)
*   **Styling:** Tailwind CSS (Responsive, Mobile-First)
*   **State:** Redux Toolkit
*   **HTTP:** Axios (Centralized via `src/services/api.js`)
*   **Routing:** React Router DOM v6
*   **Assets:** React-PDF, Lucide React

## Project Structure
The folder structure follows industry standards for scalability:

```text
src/
├── components/     # Reusable UI (Header, Footer, Widgets)
├── features/       # Feature-specific logic
├── layouts/        # Layout wrappers (Navbar/Footer persistence)
├── pages/          # Full Page Views (Home, Forex, Rashifal, Panchanga)
├── services/       # API abstraction layer (Axios configuration)
├── store/          # Redux Toolkit Slices (Global Date State)
└── utils/          # Pure functions (Date Math, Time Calculation, Formatters)
