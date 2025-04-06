# Project Configuration (LTM)

*This file contains the stable, long-term context for the project.*
*It should be updated infrequently, primarily when core goals, tech, or patterns change.*

---

## Core Goal

*(Define the primary objective and purpose of this project here. E.g., "Create a web application for managing personal tasks...")*

Create a web-based collaborative whiteboard where multiple users can draw, write, and annotate in real-time.


---

## Tech Stack

*(List the primary technologies, frameworks, and languages used. E.g.,)*
*   **Frontend:** Next.js, Typescript, TailwindCSS, Shadcn/ui
*   **Backend:** NestJS, PostgreSQL
*   **Testing:** Jest, React Testing Library
*   **Linting/Formatting:** ESLint, Prettier
*   **Other technologies** WebSockets

---

## Critical Patterns & Conventions

*(Document any non-standard but crucial design patterns, architectural decisions, or coding conventions specific to this project. E.g.,)*
*   **State Management:** Zustand best-practice pattern.
*   **API Design:** GraphQL principles for standard CRUD operations (creating boards, managing users, fetching initial board state), specific endpoint naming convention `/api/v1/...`.
*   **Error Handling:** Use custom `AppError` class for backend errors.
*   **Commit Messages:** Follow Conventional Commits format.

---

## Key Constraints

*(List any major limitations or non-negotiable requirements. E.g.,)*
-- Front-end
*   "Complex state management" is key. For high-frequency real-time updates on potentially large canvases consider:
    *   Optimization: Implement techniques like state selectors (e.g., derived state in Zustand) to prevent unnecessary re-renders.
    *   Canvas Rendering: Use HTML Canvas API (possibly via libraries like Konva.js, Fabric.js, or Paper.js) or SVG. Performance optimization (debouncing/throttling updates, offscreen rendering, virtualization for large canvases) will be critical.
*   WebSocket Client: Use a robust library (like socket.io-client or native WebSockets) and manage connection state, automatic reconnection, and efficient message handling (parsing, updating state). Consider batching updates received in quick succession.
*   Optimistic Updates: Crucial for perceived performance. Update the UI immediately upon user action, then reconcile with the server state when the confirmation arrives. Handle potential conflicts.
-- Backend
*   WebSocket Scalability: This is paramount. A single server instance has limits on concurrent connections.
    *   Horizontal Scaling: Design the backend to be stateless. Use a message broker/backplane (like Redis Pub/Sub, RabbitMQ, or cloud-specific solutions like Azure SignalR Service or AWS IoT Core) to broadcast messages across multiple backend instances. Each instance only manages connections for a subset of users, but messages related to a specific canvas are broadcast to all relevant instances via the backplane.
    *   Connection Management: Efficiently track which user is connected to which canvas/room.
*   API Design:
Use WebSockets exclusively for real-time updates (drawing actions, cursor movements, presence updates, chat).
    *   Real-time Logic:
    *   Rooms/Channels: Isolate communication per canvas/board. Users should only receive updates for the board they are currently viewing.
    *   Message Efficiency: Don't broadcast the entire canvas state on every change. Broadcast small, atomic operations/events (e.g., "user X drew a line from A to B," "user Y moved object Z"). The frontend reconstructs the state.
    *   Conflict Resolution: This is a major challenge in real-time collaboration. How do you handle cases where two users modify the same object simultaneously?
        *   Last Write Wins (LWW): Simplest, but can lead to lost data.
        *   Operational Transformation (OT): Complex to implement correctly, traditional approach for text editors.
        *   Conflict-Free Replicated Data Types (CRDTs): Mathematically designed to ensure eventual consistency without complex conflict resolution logic. Increasingly popular but have their own complexities and might increase data payload size. Choose a strategy early.
-- Database (PostgreSQL):
*   Data Modeling Strategy: This heavily impacts scalability and data intensity.
    *   (Event Sourcing/Action Log): Store each user action (draw, move, delete, text edit) as an immutable event. Reconstruct the canvas state by replaying events. Excellent for history, auditing, and collaboration logic (like OT/CRDTs), but requires efficient querying/snapshotting for loading current state quickly. This is generally better for data-intensive collaborative apps.
*   Persistence Strategy: Don't write to the DB on every single mouse movement during drawing. Debounce/throttle writes. Define durability requirements – is it okay to lose the last few seconds of drawing if a server crashes, or does every action need immediate persistence (more expensive)?
*   Caching: Use an in-memory cache like Redis or Memcached heavily for:
    *   User presence status and cursor positions.
    *   Frequently accessed board metadata.
    *   Potentially caching the current compiled state of active boards (derived from the action log) to speed up initial loads.