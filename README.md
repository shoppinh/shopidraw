# Shopidraw

A real-time collaborative whiteboard application that allows multiple users to draw, write, and annotate together in real-time.

## Tech Stack

### Frontend
- Next.js 14
- TypeScript
- TailwindCSS
- Shadcn UI
- Zustand (State Management)
- WebSocket Client

### Backend
- NestJS
- TypeScript
- PostgreSQL with TypeORM
- WebSocket Server
- JWT Authentication
- Swagger API Documentation

## Project Structure

```
shopidraw/
├── frontend/           # Next.js frontend application
├── backend/           # NestJS backend application
├── package.json      # Root package.json for workspace management
└── README.md        # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v18.x or later)
- npm (v8.x or later)
- PostgreSQL (v14.x or later)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/shopidraw.git
cd shopidraw
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env` in both frontend and backend directories
   - Update the variables according to your environment

### Development

Run both frontend and backend in development mode:
```bash
npm run dev
```

Or run them separately:
```bash
# Frontend only
npm run dev:frontend

# Backend only
npm run dev:backend
```

### Building for Production

Build both applications:
```bash
npm run build
```

Or build them separately:
```bash
# Frontend only
npm run build:frontend

# Backend only
npm run build:backend
```

### Running Tests

```bash
# Run all tests
npm test

# Run frontend tests
npm run test --workspace=frontend

# Run backend tests
npm run test --workspace=backend
```

## Features

- Real-time collaborative drawing
- Multiple drawing tools
- User presence indicators
- Room-based collaboration
- Authentication and authorization
- Persistent storage of drawings
- Responsive design

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License. 