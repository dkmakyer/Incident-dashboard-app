# Incident Management Dashboard

A real-time incident management dashboard built with React, TypeScript, and Vite. This application allows users to track, update, and manage incidents with a simulated real-time environment.

## Application Flow

1.  **Dashboard (Incident List)**
    *   Users land on the main dashboard displaying all active and resolved incidents.
    *   **Sorting & Filtering**: Incidents can be filtered by status (Open, In Progress, Resolved) and sorted by creation date or severity.
    *   **Real-time Updates**: New incidents and status changes appear automatically via the simulation engine.

2.  **Incident Detail View**
    *   Clicking an incident navigates to the detailed view (`/incidents/:id`).
    *   **Header**: Displays the incident title, current status, and severity.
    *   **Metadata**: Shows creation time, last updated time, and service impacted.
    *   **Description**: Full incident description.

3.  **Status Management**
    *   **Transitions**: Users can change the status of an incident (e.g., "Open" -> "In Progress").
    *   **Validation**: Status changes *require* a note. A modal prompts the user for this mandatory input.
    *   **Business Logic**: Only valid transitions are allowed (e.g., cannot go from "Resolved" back to "Open" without reopening logic - *currently enforced by valid transitions constant*).

4.  **Activity Timeline**
    *   A chronological history of all events: status changes, user comments, and system automated checks.
    *   **Comments**: Users can add comments to the timeline.
    *   **System Events**: The simulation engine periodically adds "System" events (e.g., "Automated health check").

5.  **Persistence**
    *   All data (incidents, comments, history) is persisted to the browser's `localStorage`.
    *   Refreshing the page restores the exact state.

---

## Technical Implementation & Decisions

### 1. State Management
*   **Approach**: React Context API (`IncidentContext` + `IncidentProvider`).
*   **Why**: The application state (list of incidents) is global and needed by multiple pages (List and Detail). Context provides a lightweight solution without the boilerplate of Redux.
*   **Trade-off**: Context can trigger re-renders in all consumers when state changes. For a dashboard of this size (< 1000 items), this is negligible. For larger scale, we would opt for **Zustand** or **Redux Toolkit** for better selector-based performance.

### 2. Real-Time Simulation
*   **Approach**: Custom `useIncidentSimulation` hook.
*   **Why**: To demonstrate a "live" environment without needing a WebSocket backend.
*   **Mechanism**: A `setInterval` loop in the hook probabilistically triggers:
    *   New Incident creation (Low probability).
    *   System comments/checks (Medium probability).
*   **Decoupling**: The simulation logic is extracted from the `IncidentProvider` to adhere to the **Single Responsibility Principle (SRP)**. The Provider manages *state*, the Hook manages *simulation*.

### 3. Data Persistence
*   **Approach**: Custom `useLocalStorage` hook.
*   **Why**: Seamless user experience. Losing work on refresh is a poor UX.
*   **Implementation**: The `incidents` state is initialized from `localStorage` and synced on every update.

### 4. Component Architecture (SRP)
*   **Decision**: Split `IncidentTimeline` and `IncidentCommentForm`.
*   **Why**: Initially, these were one component. We refactored them because:
    *   `IncidentTimeline` should only care about *displaying* a list of entries.
    *   `IncidentCommentForm` should only care about *capturing* user input.
*   **Result**: The code is more modular. Adding a rich-text editor to the form later won't risk breaking the timeline display.

### 5. Routing
*   **Approach**: `react-router-dom`.
*   **Why**: Standard for React SPAs. Enables deep linking to specific incidents (e.g., sharing a URL to a specific incident).

---

## Alternative Approaches Considered

| Approach | Why we didn't use it | Trade-offs |
| :--- | :--- | :--- |
| **Redux / Redux Toolkit** | Overkill for this scope. Adds significant boilerplate. | **Pro**: Better dev tools & time-travel debugging. **Con**: Higher complexity & bundle size. |
| **Real Backend (Node/Express)** | The requirement was a frontend-only simulation. | **Pro**: Real multi-user collaboration. **Con**: Requires running a separate server process. |
| **Polling (for updates)** | Simulation is local, so network polling isn't needed. | **Pro**: Simple to implement against a real API. **Con**: Network overhead. |

## Project Structure

```
src/
├── context/            # Global State (IncidentProvider)
├── hooks/              # Custom Logic (useIncidents, useLocalStorage)
├── interfaces/         # TypeScript Definitions
├── pages/
│   ├── IncidentListPage/   # Dashboard View
│   └── IncidentDetailPage/ # Detail View
│       ├── components/     # Local components (Timeline, Dialog)
└── utils/              # Helper functions (Mock data gen)
```
